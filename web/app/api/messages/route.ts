import { NextResponse } from "next/server";
import { createMessage, listMessages } from "@/lib/runtime-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json({ error: "matchId is required" }, { status: 400 });
  }

  return NextResponse.json({
    matchId,
    items: listMessages(matchId),
  });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    matchId?: string;
    senderId?: string;
    body?: string;
  };

  if (!payload.matchId || !payload.senderId || !payload.body) {
    return NextResponse.json({ error: "matchId, senderId and body are required" }, { status: 400 });
  }

  const message = createMessage(payload.matchId, payload.senderId, payload.body);
  return NextResponse.json({ ok: true, message }, { status: 201 });
}
