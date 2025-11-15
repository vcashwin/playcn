"use client";

import {
  SandboxProvider,
  SandboxLayout,
  SandboxCodeEditor,
  SandboxPreview,
} from "@/components/kibo-ui/sandbox";
import { useEffect, useState } from "react";

type ComponentViewerProps = {
  componentName: string;
  componentCode: string;
  componentFiles: Record<string, string>;
  exampleCode: string;
  dependencies: Record<string, string>;
};

export function ComponentViewer({
  componentName,
  componentCode,
  componentFiles,
  exampleCode,
  dependencies,
}: ComponentViewerProps) {
  const [files, setFiles] = useState<
    Record<string, { code: string; readOnly?: boolean }>
  >({});

  useEffect(() => {
    // Transform component code to use relative imports instead of path aliases
    const transformedComponentCode = componentCode
      .replace(/@\/lib\/utils/g, "./utils")
      .replace(/@\/components\/ui\//g, "./");

    // Transform example code to use relative imports
    const transformedExampleCode = exampleCode
      .replace(/@\/lib\/utils/g, "./utils")
      .replace(/@\/components\/ui\//g, "./");

    const setupFiles: Record<string, { code: string; readOnly?: boolean }> = {
      "/App.tsx": {
        code: transformedExampleCode,
        readOnly: false, // Editable
      },
      [`/${componentName}.tsx`]: {
        code: transformedComponentCode,
        readOnly: false, // Editable
      },
      "/index.tsx": {
        code: `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./input.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);`,
        readOnly: true, // Read-only
      },

      "/utils.ts": {
        code: `
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
        readOnly: true, // Read-only
      },

      "/postcss.config.js": {
        code: `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`,
        readOnly: true, // Read-only
      },

      "/input.css": {
        code: `
:root {
  --background: rgb(250, 245, 250);
  --foreground: rgb(80, 24, 84);
  --card: rgb(250, 245, 250);
  --card-foreground: rgb(80, 24, 84);
  --popover: rgb(255, 255, 255);
  --popover-foreground: rgb(80, 24, 84);
  --primary: rgb(168, 67, 112);
  --primary-foreground: rgb(255, 255, 255);
  --secondary: rgb(241, 196, 230);
  --secondary-foreground: rgb(119, 52, 124);
  --muted: rgb(246, 229, 243);
  --muted-foreground: rgb(131, 69, 136);
  --accent: rgb(241, 196, 230);
  --accent-foreground: rgb(119, 52, 124);
  --destructive: rgb(171, 67, 71);
  --destructive-foreground: rgb(255, 255, 255);
  --border: rgb(239, 189, 235);
  --input: rgb(231, 193, 220);
  --ring: rgb(219, 39, 119);
  --chart-1: rgb(217, 38, 162);
  --chart-2: rgb(108, 18, 185);
  --chart-3: rgb(39, 71, 84);
  --chart-4: rgb(232, 196, 104);
  --chart-5: rgb(244, 164, 98);
  --sidebar: rgb(243, 228, 246);
  --sidebar-foreground: rgb(172, 22, 104);
  --sidebar-primary: rgb(69, 69, 84);
  --sidebar-primary-foreground: rgb(250, 241, 247);
  --sidebar-accent: rgb(248, 248, 247);
  --sidebar-accent-foreground: rgb(69, 69, 84);
  --sidebar-border: rgb(236, 234, 233);
  --sidebar-ring: rgb(219, 39, 119);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.5rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: rgb(34, 29, 39);
  --foreground: rgb(210, 196, 222);
  --card: rgb(44, 38, 50);
  --card-foreground: rgb(219, 197, 210);
  --popover: rgb(16, 10, 14);
  --popover-foreground: rgb(248, 241, 245);
  --primary: rgb(163, 0, 76);
  --primary-foreground: rgb(239, 192, 216);
  --secondary: rgb(54, 45, 61);
  --secondary-foreground: rgb(212, 199, 225);
  --muted: rgb(40, 34, 45);
  --muted-foreground: rgb(194, 182, 207);
  --accent: rgb(70, 55, 83);
  --accent-foreground: rgb(248, 241, 245);
  --destructive: rgb(48, 16, 21);
  --destructive-foreground: rgb(255, 255, 255);
  --border: rgb(59, 50, 55);
  --input: rgb(62, 52, 60);
  --ring: rgb(219, 39, 119);
  --chart-1: rgb(168, 67, 112);
  --chart-2: rgb(147, 77, 203);
  --chart-3: rgb(232, 140, 48);
  --chart-4: rgb(175, 87, 219);
  --chart-5: rgb(226, 54, 112);
  --sidebar: rgb(24, 17, 23);
  --sidebar-foreground: rgb(224, 202, 214);
  --sidebar-primary: rgb(29, 78, 216);
  --sidebar-primary-foreground: rgb(255, 255, 255);
  --sidebar-accent: rgb(38, 25, 34);
  --sidebar-accent-foreground: rgb(244, 244, 245);
  --sidebar-border: rgb(0, 0, 0);
  --sidebar-ring: rgb(219, 39, 119);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.5rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}
        `,
      },

      "/styles.css": {
        code: `
@tailwind base;
@tailwind components;
@tailwind utilities;
      `,
        readOnly: false,
      },

      "/tailwind.config.js": {
        code: `
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

        `,
        readOnly: true, // Read-only
      },

      "/index.html": {
        code: `
<!DOCTYPE html>
  <html lang="en">
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
  `,
        readOnly: true, // Read-only
      },

      "/package.json": {
        code: JSON.stringify(
          {
            scripts: {
              dev: "vite",
              build:
                "npx tailwindcss -i ./index.css -o ./output.css && tsc && vite build",
              preview: "vite preview",
            },
            dependencies: {
              react: "^19.0.0",
              "react-dom": "^19.0.0",
              tailwindcss: "^3.4.17",
              ...dependencies,
            },
            devDependencies: {
              "@types/react": "^19.0.8",
              "@types/react-dom": "^19.0.3",
              "@vitejs/plugin-react": "^3.1.0",
              typescript: "~4.9.3",
              vite: "4.2.0",
              tailwindcss: "3.4.17",
              autoprefixer: "^10.4.22",
              postcss: "^8.5.6",
              "postcss-import": "^16.1.0",
              "postcss-nested": "^7.0.2",
              "esbuild-wasm": "^0.17.12",
            },
          },
          null,
          2
        ),
        readOnly: true, // Read-only
      },
    };

    // Add all dependency files from componentFiles
    for (const [fileName, code] of Object.entries(componentFiles)) {
      // Skip the main component as it's already added
      if (fileName === componentName) continue;

      // Transform the dependency code to use relative imports
      const transformedCode = code
        .replace(/@\/lib\/utils/g, "./utils")
        .replace(/@\/components\/ui\//g, "./");

      setupFiles[`/${fileName}.tsx`] = {
        code: transformedCode,
        readOnly: false, // Component files are editable
      };
    }

    setFiles(setupFiles);
  }, [componentName, componentCode, componentFiles, exampleCode]);

  if (Object.keys(files).length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading component...</p>
      </div>
    );
  }

  return (
    <SandboxProvider template="vite-react-ts" files={files}>
      <div className="h-screen grid grid-cols-2">
        <div className="col-span-1 border-r overflow-y-scroll">
          <div className="h-full flex flex-col">
            <div className="bg-secondary px-4 py-2 border-b">
              <h3 className="text-sm font-medium">Code</h3>
            </div>
            <div className="flex-1">
              <SandboxLayout>
                <SandboxCodeEditor
                  showTabs
                  showLineNumbers
                  showInlineErrors
                  className="h-full! pb-8 "
                />
              </SandboxLayout>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-full flex flex-col">
            <div className="bg-secondary px-4 py-2 border-b">
              <h3 className="text-sm font-medium">Preview</h3>
            </div>
            <div className="flex-1">
              <SandboxLayout>
                <SandboxPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton
                  className="h-full! p-8"
                />
              </SandboxLayout>
            </div>
          </div>
        </div>
      </div>
    </SandboxProvider>
  );
}
