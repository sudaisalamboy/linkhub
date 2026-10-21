import { NextRequest, NextResponse } from "next/server";
import { addLink, removeLink, getProfile } from "@/lib/store";

// POST /api/links — add a new link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.url) {
      return NextResponse.json(
        { error: "title and url are required" },
        { status: 400 }
      );
    }
    // Validate URL format
    try {
      new URL(body.url);
    } catch {
      // Allow relative URLs and mailto: links
      if (!body.url.startsWith("#") && !body.url.startsWith("mailto:")) {
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        );
      }
    }
    const link = addLink(body.title, body.url, body.icon || "🔗");
    return NextResponse.json(link, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// DELETE /api/links?id=xxx — remove a link
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Link id is required" },
      { status: 400 }
    );
  }
  const existingLinks = getProfile().links;
  if (!existingLinks.find((l) => l.id === id)) {
    return NextResponse.json(
      { error: "Link not found" },
      { status: 404 }
    );
  }
  removeLink(id);
  return NextResponse.json({ success: true, message: "Link deleted" });
}

// GET /api/links — list all links
export async function GET() {
  return NextResponse.json(getProfile().links);
}
