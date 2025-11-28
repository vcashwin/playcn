"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { useCallback, useEffect, useRef } from "react";

function getParserForFile(filePath: string): string | null {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
    return "typescript";
  }
  if (filePath.endsWith(".jsx") || filePath.endsWith(".js")) {
    return "babel";
  }
  if (filePath.endsWith(".css")) {
    return "css";
  }
  if (filePath.endsWith(".json")) {
    return "json";
  }
  return null;
}

// Cache for dynamically loaded prettier modules from CDN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prettierCache: { prettier: any; plugins: any[] } | null = null;

// Dynamic import function that bypasses bundler for CDN URLs
async function importFromCDN(url: string): Promise<unknown> {
  // Use Function constructor to create a dynamic import that bundlers won't process
  const dynamicImport = new Function("url", "return import(url)");
  return dynamicImport(url);
}

async function loadPrettier() {
  if (prettierCache) {
    return prettierCache;
  }

  // Load prettier and plugins from esm.sh CDN to avoid bundler issues
  const [prettier, babel, estree, typescript, postcss] = await Promise.all([
    importFromCDN("https://esm.sh/prettier@3.3.3/standalone"),
    importFromCDN("https://esm.sh/prettier@3.3.3/plugins/babel"),
    importFromCDN("https://esm.sh/prettier@3.3.3/plugins/estree"),
    importFromCDN("https://esm.sh/prettier@3.3.3/plugins/typescript"),
    importFromCDN("https://esm.sh/prettier@3.3.3/plugins/postcss"),
  ]);

  prettierCache = {
    prettier,
    plugins: [babel, estree, typescript, postcss],
  };

  return prettierCache;
}

export function CodeFormatter() {
  const { sandpack } = useSandpack();
  const isFormattingRef = useRef(false);
  const sandpackRef = useRef(sandpack);

  // Keep sandpack ref updated without causing re-renders
  sandpackRef.current = sandpack;

  const formatCode = useCallback(async () => {
    if (isFormattingRef.current) return;

    const currentSandpack = sandpackRef.current;
    const activeFile = currentSandpack.activeFile;
    const code = currentSandpack.files[activeFile]?.code;

    if (!code) return;

    const parser = getParserForFile(activeFile);
    if (!parser) return;

    isFormattingRef.current = true;

    try {
      const { prettier, plugins } = await loadPrettier();
      if (!prettier || !plugins) return;

      const formatted = await prettier.format(code, {
        parser,
        plugins,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "es5",
        printWidth: 80,
      });

      // Only update if the formatted code is different
      if (formatted !== code) {
        currentSandpack.updateFile(activeFile, formatted);
      }
    } catch (error) {
      // Silently fail if formatting fails (e.g., syntax errors)
      console.warn("Failed to format code:", error);
    } finally {
      isFormattingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        formatCode();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [formatCode]);

  return null;
}
