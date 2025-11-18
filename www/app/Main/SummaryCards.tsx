"use client";

import { NormalizedReview } from "@/types/reviews";

interface SummaryCardsProps {
  reviews: NormalizedReview[];
}

export function SummaryCards({ reviews }: SummaryCardsProps) {
  const totalReviews = reviews.length;

  const avgRating =
    totalReviews === 0
      ? null
      : Number(
          (
            reviews.reduce((sum, r) => sum + (r.overallRating ?? 0), 0) /
            totalReviews
          ).toFixed(2)
        );

  const approvedCount = reviews.filter((r) => r.approved).length;

  const listingsMap = reviews.reduce<Record<string, { name: string; count: number; sum: number }>>(
    (acc, r) => {
      if (!acc[r.listingId]) {
        acc[r.listingId] = {
          name: r.listingName,
          count: 0,
          sum: 0,
        };
      }
      acc[r.listingId].count += 1;
      acc[r.listingId].sum += r.overallRating ?? 0;
      return acc;
    },
    {}
  );

  const topListing =
    Object.values(listingsMap)
      .map((l) => ({
        ...l,
        avg: l.count ? l.sum / l.count : 0,
      }))
      .sort((a, b) => b.avg - a.avg)[0] ?? null;

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        label="Total Reviews"
        value={totalReviews.toString()}
        helper="Across all properties"
      />
      <Card
        label="Avg Rating"
        value={avgRating !== null ? avgRating.toString() : "-"}
        helper="Based on all reviews"
      />
      <Card
        label="Approved for Website"
        value={approvedCount.toString()}
        helper="Displayed on property pages"
      />
      <Card
        label="Top Property"
        value={topListing ? topListing.name : "–"}
        helper={
          topListing
            ? `Avg ${topListing.avg.toFixed(2)} / 10`
            : "No reviews yet"
        }
      />
    </div>
  );
}

interface CardProps {
  label: string;
  value: string;
  helper?: string;
}

function Card({ label, value, helper }: CardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {helper && (
        <p className="mt-1 text-xs text-slate-500 line-clamp-1">{helper}</p>
      )}
    </div>
  );
}
