"use client";

import {
  SandboxProvider,
  SandboxLayout,
  SandboxCodeEditor,
  SandboxPreview,
  SandboxConsole,
} from "@/components/kibo-ui/sandbox";
import { ComponentData, useComponents } from "@/hooks/use-components";
import { useActiveComponent } from "@/stores/use-active-component";
import {
  useSandpack,
  useSandpackNavigation,
} from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { ALL_DEPENDENCIES } from "@/lib/component-registry";
import { ThemeCommandPalette } from "./theme-command-palette";
import { TextLoop } from "@/components/text-loop";
import { Spinner } from "@/components/ui/spinner";

function transformAbsoluteToRelativeImports(code: string): string {
  return code
    .replace(/@\/lib\/utils/g, "./utils")
    .replace(/@\/components\/ui\//g, "./");
}

const INDEX_TSX = `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "./sonner"
import "./styles.css";
import "./theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="w-full h-full p-12">
    <App />
    <Toaster />
  </div>);
`;

const UTILS_TS = `
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

const POSTCSS_CONFIG_JS = `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

const THEME_CSS = `:root {
  --background: rgb(252, 252, 252);
  --foreground: rgb(0, 0, 0);
  --card: rgb(255, 255, 255);
  --card-foreground: rgb(0, 0, 0);
  --popover: rgb(252, 252, 252);
  --popover-foreground: rgb(0, 0, 0);
  --primary: rgb(0, 0, 0);
  --primary-foreground: rgb(255, 255, 255);
  --secondary: rgb(235, 235, 235);
  --secondary-foreground: rgb(0, 0, 0);
  --muted: rgb(245, 245, 245);
  --muted-foreground: rgb(82, 82, 82);
  --accent: rgb(235, 235, 235);
  --accent-foreground: rgb(0, 0, 0);
  --destructive: rgb(229, 75, 79);
  --destructive-foreground: rgb(255, 255, 255);
  --border: rgb(228, 228, 228);
  --input: rgb(235, 235, 235);
  --ring: rgb(0, 0, 0);
  --chart-1: rgb(255, 174, 4);
  --chart-2: rgb(45, 98, 239);
  --chart-3: rgb(164, 164, 164);
  --chart-4: rgb(228, 228, 228);
  --chart-5: rgb(116, 116, 116);
  --sidebar: rgb(252, 252, 252);
  --sidebar-foreground: rgb(0, 0, 0);
  --sidebar-primary: rgb(0, 0, 0);
  --sidebar-primary-foreground: rgb(255, 255, 255);
  --sidebar-accent: rgb(235, 235, 235);
  --sidebar-accent-foreground: rgb(0, 0, 0);
  --sidebar-border: rgb(235, 235, 235);
  --sidebar-ring: rgb(0, 0, 0);
  --radius: 0.5rem;
  --shadow-x: 0px;
  --shadow-y: 1px;
  --shadow-blur: 2px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.18;
  --shadow-color: hsl(0 0% 0%);
  --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
  --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
  --shadow-sm: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
  --shadow: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
  --shadow-md: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 2px 4px -1px hsl(0 0% 0% / 0.18);
  --shadow-lg: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 4px 6px -1px hsl(0 0% 0% / 0.18);
  --shadow-xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 8px 10px -1px hsl(0 0% 0% / 0.18);
  --shadow-2xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.45);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: rgb(0, 0, 0);
  --foreground: rgb(255, 255, 255);
  --card: rgb(9, 9, 9);
  --card-foreground: rgb(255, 255, 255);
  --popover: rgb(18, 18, 18);
  --popover-foreground: rgb(255, 255, 255);
  --primary: rgb(255, 255, 255);
  --primary-foreground: rgb(0, 0, 0);
  --secondary: rgb(34, 34, 34);
  --secondary-foreground: rgb(255, 255, 255);
  --muted: rgb(29, 29, 29);
  --muted-foreground: rgb(164, 164, 164);
  --accent: rgb(51, 51, 51);
  --accent-foreground: rgb(255, 255, 255);
  --destructive: rgb(255, 91, 91);
  --destructive-foreground: rgb(0, 0, 0);
  --border: rgb(36, 36, 36);
  --input: rgb(51, 51, 51);
  --ring: rgb(164, 164, 164);
  --chart-1: rgb(255, 174, 4);
  --chart-2: rgb(38, 113, 244);
  --chart-3: rgb(116, 116, 116);
  --chart-4: rgb(82, 82, 82);
  --chart-5: rgb(228, 228, 228);
  --sidebar: rgb(18, 18, 18);
  --sidebar-foreground: rgb(255, 255, 255);
  --sidebar-primary: rgb(255, 255, 255);
  --sidebar-primary-foreground: rgb(0, 0, 0);
  --sidebar-accent: rgb(51, 51, 51);
  --sidebar-accent-foreground: rgb(255, 255, 255);
  --sidebar-border: rgb(51, 51, 51);
  --sidebar-ring: rgb(164, 164, 164);
  --radius: 0.5rem;
  --shadow-x: 0px;
  --shadow-y: 1px;
  --shadow-blur: 2px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.18;
  --shadow-color: hsl(0 0% 0%);
  --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
  --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
  --shadow-sm: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
  --shadow: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
  --shadow-md: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 2px 4px -1px hsl(0 0% 0% / 0.18);
  --shadow-lg: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 4px 6px -1px hsl(0 0% 0% / 0.18);
  --shadow-xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 8px 10px -1px hsl(0 0% 0% / 0.18);
  --shadow-2xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.45);
}`;

const STYLES_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

:root {
  --spacing: 0.25rem;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --code-editor-background: #ffffff;
  height: 100%;
  background-color: var(--background);
}

.dark, [data-theme='dark'] {
  --code-editor-background: #151515;
}`;

const TAILWIND_CONFIG_JS = `
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
};
`;

const getViteConfigTS = (
  dependencies: Record<string, string>
) => `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [${Object.keys(dependencies)
      .map((dep) => `"${dep}"`)
      .join(",")}]
  },
})
`;

const getIndexHTML = (isDark: boolean) => `
<!DOCTYPE html>
  <html lang="en"${isDark ? ' class="dark"' : ""}>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/index.tsx"></script>
    </body>
  </html>
  `;

const getPackageJSON = (dependencies: Record<string, string>) =>
  JSON.stringify(
    {
      type: "module",
      scripts: {
        dev: "vite",
        build:
          "npx tailwindcss -i ./index.css -o ./output.css && tsc && vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^19.0.0",
        "react-dom": "^19.0.0",
        tailwindcss: "3.4.1",
        jiti: "^2.4.2",
        ...dependencies,
      },
      devDependencies: {
        "@types/react": "^19.0.8",
        "@types/react-dom": "^19.0.3",
        "@vitejs/plugin-react": "^3.1.0",
        typescript: "~4.9.3",
        vite: "4.2.0",
        tailwindcss: "3.4.1",
        jiti: "^2.4.2",
        autoprefixer: "^10.4.22",
        postcss: "^8.5.6",
        "postcss-import": "^16.1.0",
        "postcss-nested": "^7.0.2",
        "esbuild-wasm": "^0.17.12",
      },
    },
    null,
    2
  );

const INITIAL_FILES: Record<string, { code: string; readOnly?: boolean }> = {
  "/theme.css": {
    code: THEME_CSS,
    readOnly: false,
  },
  "/index.tsx": {
    code: INDEX_TSX,
    readOnly: false,
  },
  "/utils.ts": {
    code: UTILS_TS,
    readOnly: true,
  },
  "/postcss.config.js": {
    code: POSTCSS_CONFIG_JS,
    readOnly: true,
  },
  "/styles.css": {
    code: STYLES_CSS,
    readOnly: false,
  },
  "/tailwind.config.js": {
    code: TAILWIND_CONFIG_JS,
    readOnly: false,
  },
  "/vite.config.ts": {
    code: getViteConfigTS(ALL_DEPENDENCIES),
    readOnly: false,
  },
};

const LOADING_MESSAGES = [
  "Setting up your environment...",
  "Installing dependencies...",
  "Compiling TypeScript...",
  "Building components...",
  "Bundling assets...",
  "Almost there...",
];

function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center opacity-60">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-6" />
        <TextLoop className="font-mono text-sm text-muted-foreground">
          {LOADING_MESSAGES.map((message, index) => (
            <span key={index}>{message}</span>
          ))}
        </TextLoop>
      </div>
    </div>
  );
}

export function ComponentViewer() {
  const { activeComponentName } = useActiveComponent();
  const { data: allComponents = [] } = useComponents();
  const { resolvedTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const activeComponent = useMemo(() => {
    return allComponents.find(
      (c) => c.fileName === activeComponentName
    ) as ComponentData;
  }, [allComponents, activeComponentName]);

  const files = useMemo(() => {
    if (!activeComponent) return {};

    const { fileName, exampleCode, files: componentFiles } = activeComponent;
    const componentName = fileName.replace(".tsx", "");
    const componentCode = componentFiles[componentName] || "";

    const transformedExampleCode =
      transformAbsoluteToRelativeImports(exampleCode);
    const transformedComponentCode =
      transformAbsoluteToRelativeImports(componentCode);

    // Find and extract sonner component
    const sonnerComponent = allComponents.find(
      (c) => c.fileName === "sonner.tsx"
    );
    const sonnerCode = sonnerComponent?.files["sonner"] || "";
    const transformedSonnerCode =
      transformAbsoluteToRelativeImports(sonnerCode);

    const setupFiles: Record<string, { code: string; readOnly?: boolean }> = {
      "/App.tsx": {
        code: transformedExampleCode,
        readOnly: false,
      },
      [`/${componentName}.tsx`]: {
        code: transformedComponentCode,
        readOnly: false,
      },
      ...INITIAL_FILES,
      "/index.html": {
        code: getIndexHTML(resolvedTheme === "dark"),
        readOnly: false,
      },
      "/package.json": {
        code: getPackageJSON(ALL_DEPENDENCIES),
        readOnly: true,
      },
      "/sonner.tsx": {
        code: transformedSonnerCode,
        readOnly: true,
      },
    };

    for (const [fileName, code] of Object.entries(componentFiles)) {
      if (fileName === componentName) continue;

      const transformedCode = transformAbsoluteToRelativeImports(code);

      setupFiles[`/${fileName}.tsx`] = {
        code: transformedCode,
        readOnly: false,
      };
    }

    return setupFiles;
  }, []);

  if (Object.keys(files).length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading component...</p>
      </div>
    );
  }

  return (
    <SandboxProvider
      template="vite-react-ts"
      files={files}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      options={{
        initMode: "immediate",
      }}
    >
      <UpdateFiles
        activeComponent={activeComponent}
        setIsLoading={setIsLoading}
      />
      <ThemeCommandPalette />
      <div className="h-screen grid grid-cols-2">
        <div className="col-span-1 border-r overflow-y-scroll">
          <div className="h-full flex flex-col">
            <div className="bg-secondary px-4 py-2 border-b">
              <h3 className="text-sm font-medium text-foreground">Code</h3>
            </div>
            <div className="flex-1">
              <SandboxLayout>
                <SandboxCodeEditor
                  showTabs
                  showLineNumbers
                  showInlineErrors
                  className="h-full! pb-8"
                />
              </SandboxLayout>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-full flex flex-col">
            <div className="bg-secondary px-4 py-2 border-b">
              <h3 className="text-sm font-medium text-foreground">Preview</h3>
            </div>
            <div className="flex-1 relative">
              <SandboxLayout>
                <SandboxPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton
                  className="h-full!"
                />
              </SandboxLayout>
              <LoadingOverlay isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </SandboxProvider>
  );
}

function UpdateFiles({
  activeComponent,
  setIsLoading,
}: {
  activeComponent?: ComponentData;
  setIsLoading: (loading: boolean) => void;
}) {
  const { resolvedTheme } = useTheme();
  const { sandpack, listen } = useSandpack();
  const { refresh } = useSandpackNavigation();

  useEffect(() => {
    const unsubscribe = listen((message) => {
      console.log(message);
      if (message.type === "done" && message.compilatonError === false) {
        // DOM has rendered successfully, trigger your refresh here
        setTimeout(() => {
          refresh();
          setIsLoading(false);
        }, 4000);
      }
    });

    return unsubscribe;
  }, [listen, setIsLoading]);

  useEffect(() => {
    if (!activeComponent) return;

    const { fileName, exampleCode, files: componentFiles } = activeComponent;
    const componentName = fileName.replace(".tsx", "");
    const componentCode = componentFiles[componentName] || "";

    const transformedExampleCode =
      transformAbsoluteToRelativeImports(exampleCode);
    const transformedComponentCode =
      transformAbsoluteToRelativeImports(componentCode);

    // Close all files except the first one in the array (App.tsx) to maintain the desired order of visible files
    for (const file of sandpack.visibleFiles) {
      if (file !== sandpack.visibleFiles[0]) {
        sandpack.closeFile(file);
      }
    }

    // Update App.tsx and add new component files
    if (!sandpack.files[`/${componentName}.tsx`]) {
      sandpack.updateFile(`/${componentName}.tsx`, transformedComponentCode);
    }

    sandpack.openFile(`/${componentName}.tsx`);

    // Add other component files
    for (const [fileName, code] of Object.entries(componentFiles)) {
      if (fileName === componentName) continue;

      if (!sandpack.files[`/${fileName}.tsx`]) {
        const transformedCode = transformAbsoluteToRelativeImports(code);
        sandpack.updateFile(`/${fileName}.tsx`, transformedCode);
      }

      sandpack.openFile(`/${fileName}.tsx`);
    }

    // open inital files too
    for (const file of Object.keys(INITIAL_FILES)) {
      sandpack.openFile(file);
    }

    sandpack.updateFile("/App.tsx", transformedExampleCode, true);
    sandpack.setActiveFile(`/App.tsx`);

    setTimeout(() => {
      refresh();
    }, 300);
  }, [activeComponent]);

  useEffect(() => {
    sandpack.updateFile("/index.html", getIndexHTML(resolvedTheme === "dark"));
  }, [resolvedTheme]);

  return null;
}
