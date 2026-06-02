import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import path from "path";
import fs from "fs/promises";

export async function POST(req) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean and generate a unique filename
    const ext = path.extname(file.name) || ".png";
    const nameWithoutExt = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${nameWithoutExt}_${Date.now()}${ext}`;
    const uploadPath = path.join(process.cwd(), "public", "assets", filename);

    // Ensure public/assets directory exists
    await fs.mkdir(path.dirname(uploadPath), { recursive: true });

    // Save the file
    await fs.writeFile(uploadPath, buffer);

    return NextResponse.json({ filename });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
