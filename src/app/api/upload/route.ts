import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface CloudinaryResult {
  secure_url: string;
  // Opcionalmente, puedes añadir otras propiedades que Cloudinary devuelve
  public_id?: string;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subida
    const result = await new Promise<CloudinaryResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "cars" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryResult);
        }
      );
      stream.end(buffer);
    });
    console.log(result);
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error uploading image" }, { status: 500 });
  }
}
