import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { componentExamples } from "@/lib/component-registry";

type ComponentData = {
  name: string;
  fileName: string;
  files: Record<string, string>;
  exampleCode: string;
};

/**
 * Extracts @/components/ui/ imports from a code string
 */
function extractUIImports(code: string): string[] {
  const importRegex = /from\s+["']@\/components\/ui\/([^"']+)["']/g;
  const matches = [...code.matchAll(importRegex)];
  return matches.map((match) => match[1]);
}

/**
 * Recursively loads component dependencies by parsing imports
 */
async function loadComponentWithDependencies(
  componentFileName: string,
  componentsDir: string,
  loadedComponents = new Set<string>()
): Promise<Record<string, string>> {
  // Prevent circular dependencies and duplicates
  if (loadedComponents.has(componentFileName)) {
    return {};
  }

  loadedComponents.add(componentFileName);

  const files: Record<string, string> = {};
  const filePath = join(componentsDir, componentFileName);

  try {
    const code = await readFile(filePath, "utf-8");

    // Extract component name without extension for the key
    const componentKey = componentFileName.replace(/\.tsx?$/, "");
    files[componentKey] = code;

    // Parse imports to find dependencies on @/components/ui/
    const dependencies = extractUIImports(code);

    // Load each dependency recursively
    for (const dependencyName of dependencies) {
      const dependencyFileName = `${dependencyName}.tsx`;

      const dependencyFiles = await loadComponentWithDependencies(
        dependencyFileName,
        componentsDir,
        loadedComponents
      );

      // Merge dependency files
      Object.assign(files, dependencyFiles);
    }

    return files;
  } catch (error) {
    console.error(`Error loading component ${componentFileName}:`, error);
    return files;
  }
}

export async function GET() {
  try {
    const componentsDir = join(process.cwd(), "src", "components", "ui");
    const files = await readdir(componentsDir);

    // Get list of components
    const componentsList = files
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => ({
        fileName: file,
        name: file
          .replace(".tsx", "")
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Load all components with their dependencies
    const components: ComponentData[] = [];

    for (const component of componentsList) {
      const loadedComponents = new Set<string>();
      const componentFiles = await loadComponentWithDependencies(
        component.fileName,
        componentsDir,
        loadedComponents
      );

      const componentKey = component.fileName.replace(".tsx", "");
      const exampleCode = componentExamples[componentKey] || "";

      // Extract dependencies from the example code
      if (exampleCode) {
        const exampleDependencies = extractUIImports(exampleCode);

        // Load any dependencies from the example code that weren't already loaded
        for (const dependencyName of exampleDependencies) {
          const dependencyFileName = `${dependencyName}.tsx`;

          // Only load if not already loaded
          if (!loadedComponents.has(dependencyFileName)) {
            const dependencyFiles = await loadComponentWithDependencies(
              dependencyFileName,
              componentsDir,
              loadedComponents
            );

            // Merge dependency files
            Object.assign(componentFiles, dependencyFiles);
          }
        }
      }

      components.push({
        name: component.name,
        fileName: component.fileName,
        files: componentFiles,
        exampleCode,
      });
    }

    return NextResponse.json({ components });
  } catch (error) {
    console.error("Error loading all components:", error);
    return NextResponse.json(
      { error: "Failed to load components" },
      { status: 500 }
    );
  }
}
