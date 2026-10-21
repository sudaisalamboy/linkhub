import { NextResponse } from "next/server";
import { getStats } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getStats());
}
