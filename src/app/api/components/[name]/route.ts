import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const componentsDir = join(process.cwd(), "src", "components", "ui");
    const filePath = join(componentsDir, name);

    const code = await readFile(filePath, "utf-8");

    return NextResponse.json({ code });
  } catch (error) {
    console.error("Error reading component file:", error);
    return NextResponse.json(
      { error: "Failed to load component" },
      { status: 500 }
    );
  }
}

