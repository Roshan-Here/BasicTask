"use client";

import { NormalizedReview } from "@/types/reviews";
import { Star } from "lucide-react";

interface ReviewsSectionProps {
  reviews: NormalizedReview[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews.length) {
    return (
      <section className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Guest reviews
        </h2>
        <p className="text-sm text-slate-500">
          There are no approved guest reviews for this property yet.
        </p>
      </section>
    );
  }

  const total = reviews.length;
  const avgRating = Number(
    (
      reviews.reduce((acc, r) => acc + (r.overallRating ?? 0), 0) / total
    ).toFixed(1)
  );

  // you can slice if you only want to show first N
  const displayedReviews = reviews;

  return (
    <section className="mt-10 border-t border-slate-200 pt-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Guest reviews
          </h2>
          <p className="text-sm text-slate-500">
            {total} review{total > 1 ? "s" : ""} from recent guests.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
          <span className="inline-flex items-center justify-center rounded-full bg-white/10 p-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </span>
          <span className="font-semibold">{avgRating.toFixed(1)}</span>
          <span className="text-xs text-slate-200">/ 10 average score</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {displayedReviews.map((r) => (
          <article
            key={r.id}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50/60 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {r.guestName || "Guest"}
                </p>
                <p className="text-xs text-slate-500">
                  Stayed on {r.submittedDate}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-900 shadow-sm">
                {(r.overallRating ?? 0).toFixed(1)}/10
              </span>
            </div>

            <p className="mb-3 text-sm text-slate-700">{r.comment}</p>

            <div className="mt-auto flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5">
                {r.channel}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 capitalize">
                {r.reviewType.replace("-", " ")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
