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

// Cache for dynamically loaded prettier modules
let prettierCache: {
  prettier: typeof import("prettier/standalone") | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: any[] | null;
} = {
  prettier: null,
  plugins: null,
};

async function loadPrettier() {
  if (prettierCache.prettier && prettierCache.plugins) {
    return prettierCache;
  }

  const [prettier, babel, estree, typescript, css] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/babel"),
    import("prettier/plugins/estree"),
    import("prettier/plugins/typescript"),
    import("prettier/plugins/postcss"),
  ]);

  prettierCache = {
    prettier: prettier,
    plugins: [babel.default, estree.default, typescript.default, css.default],
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
