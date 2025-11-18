import { NextRequest, NextResponse } from "next/server";
import { getNormalizedHostawayReviews } from "@/lib/hostaway";
import { getApprovals } from "@/lib/approvalsStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  const channel = searchParams.get("channel");
  const since = searchParams.get("since"); 
  const until = searchParams.get("until");
  const minRating = searchParams.get("minRating");

  const approvals = getApprovals();
  let reviews = await getNormalizedHostawayReviews();

  reviews = reviews.map((r) => ({
    ...r,
    approved: approvals[r.id] ?? false,
  }));

  if (listingId) reviews = reviews.filter((r) => r.listingId === listingId);
  if (channel) reviews = reviews.filter((r) => r.channel === channel);
  if (since) reviews = reviews.filter((r) => r.submittedDate >= since);
  if (until) reviews = reviews.filter((r) => r.submittedDate <= until);
  if (minRating) {
    const min = Number(minRating);
    reviews = reviews.filter(
      (r) => r.overallRating != null && r.overallRating >= min
    );
  }

  return NextResponse.json({ reviews });
}
