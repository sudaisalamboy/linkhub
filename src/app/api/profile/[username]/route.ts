import { NextRequest, NextResponse } from "next/server";
import { getProfileByUsername, incrementView } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const profile = getProfileByUsername(username);
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  incrementView(username);
  return NextResponse.json(profile);
}
