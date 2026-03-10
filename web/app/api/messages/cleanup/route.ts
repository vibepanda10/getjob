import { NextResponse } from "next/server";
import { cleanupMessages } from "@/lib/runtime-store";

export async function POST() {
  const result = cleanupMessages(60);

  return NextResponse.json({
    ok: true,
    policy: "Delete messages older than 60 days",
    ...result,
  });
}
