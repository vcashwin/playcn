"use client";

import {
  SandboxProvider,
  SandboxLayout,
  SandboxCodeEditor,
  SandboxPreview,
} from "@/components/kibo-ui/sandbox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ComponentViewerProps = {
  componentName: string;
  componentCode: string;
  exampleCode: string;
  dependencies: Record<string, string>;
};

export function ComponentViewer({
  componentName,
  componentCode,
  exampleCode,
  dependencies,
}: ComponentViewerProps) {
  const [files, setFiles] = useState<Record<string, { code: string }>>({});

  useEffect(() => {
    // Transform component code to use relative imports instead of path aliases
    const transformedComponentCode = componentCode
      .replace(/@\/lib\/utils/g, "./utils")
      .replace(/@\/components\/ui\//g, "./");

    // Transform example code to use relative imports
    const transformedExampleCode = exampleCode
      .replace(/@\/lib\/utils/g, "./utils")
      .replace(/@\/components\/ui\//g, "./");

    // Setup files for the sandbox
    const setupFiles: Record<string, { code: string }> = {
      "/App.tsx": {
        code: transformedExampleCode,
      },
      [`/${componentName}.tsx`]: {
        code: transformedComponentCode,
      },
      "/utils.ts": {
        code: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
      "/styles.css": {
        code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`,
      },
      "/index.tsx": {
        code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
      },
    };

    setFiles(setupFiles);
  }, [componentName, componentCode, exampleCode]);

  if (Object.keys(files).length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading component...</p>
      </div>
    );
  }

  return (
    <SandboxProvider
      template="react-ts"
      files={files}
      customSetup={{
        dependencies: dependencies,
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
    >
      <div className="h-screen flex">
        <div className="flex-1 border-r">
          <div className="h-full flex flex-col">
            <div className="bg-secondary px-4 py-2 border-b">
              <h3 className="text-sm font-medium">Code</h3>
            </div>
            <div className="flex-1 overflow-hidden">
              <SandboxLayout>
                <SandboxCodeEditor showTabs showLineNumbers showInlineErrors />
              </SandboxLayout>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="h-full flex flex-col">
            <div className="bg-secondary px-4 py-2 border-b">
              <h3 className="text-sm font-medium">Preview</h3>
            </div>
            <div className="flex-1 overflow-hidden">
              <SandboxLayout>
                <SandboxPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton
                />
              </SandboxLayout>
            </div>
          </div>
        </div>
      </div>
    </SandboxProvider>
  );
}
