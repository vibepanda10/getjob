import { NextResponse } from "next/server";
import { upsertSwipe } from "@/lib/runtime-store";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    fromUserId?: string;
    toUserId?: string;
    action?: "INTERESTED" | "PASS";
  };

  if (!payload.fromUserId || !payload.toUserId || !payload.action) {
    return NextResponse.json({ error: "fromUserId, toUserId and action are required" }, { status: 400 });
  }

  if (!["INTERESTED", "PASS"].includes(payload.action)) {
    return NextResponse.json({ error: "action must be INTERESTED or PASS" }, { status: 400 });
  }

  const result = upsertSwipe(payload.fromUserId, payload.toUserId, payload.action);

  return NextResponse.json({
    ok: true,
    matched: result.matched,
    match: result.match,
  });
}
