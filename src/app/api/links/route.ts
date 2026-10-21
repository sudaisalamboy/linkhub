import { NextRequest, NextResponse } from "next/server";
import { addLink, removeLink, getProfile } from "@/lib/store";

// POST /api/links — add a new link
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.title || !body.url) {
    return NextResponse.json({ error: "title and url required" }, { status: 400 });
  }
  const link = addLink(body.title, body.url, body.icon);
  return NextResponse.json(link, { status: 201 });
}

// DELETE /api/links?id=xxx — remove a link
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  removeLink(id);
  return NextResponse.json({ success: true });
}

// GET /api/links — list all links
export async function GET() {
  return NextResponse.json(getProfile().links);
}
