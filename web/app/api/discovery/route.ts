import { NextResponse } from "next/server";
import { cards } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    items: cards,
    count: cards.length,
  });
}
