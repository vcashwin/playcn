import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { componentExamples } from "@/lib/component-registry";

type ComponentData = {
  name: string;
  fileName: string;
  code: string;
  exampleCode: string;
};

export async function GET() {
  try {
    const componentsDir = join(process.cwd(), "src", "components", "ui");
    const files = await readdir(componentsDir);

    const components: ComponentData[] = [];

    for (const file of files) {
      if (!file.endsWith(".tsx")) continue;

      const componentKey = file.replace(".tsx", "");
      const filePath = join(componentsDir, file);
      const code = await readFile(filePath, "utf-8");
      const exampleCode = componentExamples[componentKey] || "";

      components.push({
        name: file
          .replace(".tsx", "")
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        fileName: file,
        code,
        exampleCode,
      });
    }

    components.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ components });
  } catch (error) {
    console.error("Error loading all components:", error);
    return NextResponse.json(
      { error: "Failed to load components" },
      { status: 500 }
    );
  }
}
