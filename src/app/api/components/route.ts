import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const componentsDir = join(process.cwd(), "src", "components", "ui");
    const files = await readdir(componentsDir);

    const components = files
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

    return NextResponse.json({ components });
  } catch (error) {
    console.error("Error reading components directory:", error);
    return NextResponse.json(
      { error: "Failed to load components" },
      { status: 500 }
    );
  }
}

