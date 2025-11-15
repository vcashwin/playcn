import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { componentExamples } from "@/lib/component-registry";

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const componentsDir = join(process.cwd(), "src", "components", "ui");
    const loadedComponents = new Set<string>();

    // Load the main component and all its dependencies
    const files = await loadComponentWithDependencies(
      name,
      componentsDir,
      loadedComponents
    );

    // Get the example code for this component
    const componentKey = name.replace(/\.tsx?$/, "");
    const exampleCode = componentExamples[componentKey];

    if (exampleCode) {
      // Extract dependencies from the example code
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
          Object.assign(files, dependencyFiles);
        }
      }
    }

    console.log(`Final files for ${name}:`, Object.keys(files));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading component file:", error);
    return NextResponse.json(
      { error: "Failed to load component" },
      { status: 500 }
    );
  }
}
