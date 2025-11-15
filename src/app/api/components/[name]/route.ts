import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

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
    // Match patterns like: from "@/components/ui/separator"
    const importRegex = /from\s+["']@\/components\/ui\/([^"']+)["']/g;
    const matches = [...code.matchAll(importRegex)];

    // Load each dependency recursively
    for (const match of matches) {
      const dependencyName = match[1];
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

    // Load the main component and all its dependencies
    const files = await loadComponentWithDependencies(name, componentsDir);

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading component file:", error);
    return NextResponse.json(
      { error: "Failed to load component" },
      { status: 500 }
    );
  }
}
