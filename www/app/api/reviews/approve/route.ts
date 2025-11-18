import { NextRequest, NextResponse } from "next/server";
import { setApproval } from "@/lib/approvalsStore";

export async function POST(req: NextRequest) {
  const { reviewId, approved } = await req.json();
  if (!reviewId || typeof approved !== "boolean") {
    return NextResponse.json(
      { error: "reviewId and approved are required" },
      { status: 400 }
    );
  }

  setApproval(reviewId, approved);
  return NextResponse.json({ success: true });
}
