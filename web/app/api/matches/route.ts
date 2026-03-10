import { NextResponse } from "next/server";
import { listMatchesForUser } from "@/lib/runtime-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  return NextResponse.json({
    userId,
    items: listMatchesForUser(userId),
  });
}
