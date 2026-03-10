import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "get-that-job-web",
    timestamp: new Date().toISOString(),
  });
}
