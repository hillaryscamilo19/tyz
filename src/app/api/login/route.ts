import { dbConnect } from "@/lib/mongodb";
import Attachment from "@/app/pages/models/Attachment";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const attachments = await Attachment.find();
  return NextResponse.json(attachments);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newAttachment = await Attachment.create(data);
  return NextResponse.json(newAttachment);
}
