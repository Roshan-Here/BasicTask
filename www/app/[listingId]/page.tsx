"use client";

import { useReviews } from "@/hooks/useReviews";
import { useApprovalsStore } from "@/lib/approvalsStore";
import { useParams } from "next/navigation";
import { ReviewsSection } from "../Main/ReviewsSection";


export default function PropertyPage() {
  const params = useParams<{ listingId: string }>();
  const listingId = params.listingId;

  const { data: allReviews = [], isLoading } = useReviews();
  const approvals = useApprovalsStore((s) => s.approvals);

  const listingReviews = allReviews
    .filter((r) => r.listingId === listingId)
    .map((r) => ({
      ...r,
      approved: approvals[r.id] ?? false,
    }));

  const approvedReviews = listingReviews.filter((r) => r.approved);
  const listingName = listingReviews[0]?.listingName ?? listingId;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-5xl px-4 py-8">
          <p className="text-sm text-slate-600">Loading property…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold text-slate-900">
          {listingName}
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          Modern serviced apartment in the heart of the city.
        </p>

        <ReviewsSection reviews={approvedReviews} />
      </section>
    </main>
  );
}
