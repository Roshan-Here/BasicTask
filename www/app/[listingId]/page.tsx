// app/[listingId]/page.tsx
import { getNormalizedHostawayReviews } from "@/lib/hostaway";
import { getApprovals } from "@/lib/approvalsStore";
import { notFound } from "next/navigation";
import { ReviewsSection } from "../Main/ReviewsSection";

interface Props {
  params: Promise<{ listingId: string }>;
}

export default async function PropertyPage({ params }: Props) {
  // ⬅️ THIS is the important change
  const { listingId } = await params;

  const approvals = getApprovals();
  const allReviews = (await getNormalizedHostawayReviews()).map((r) => ({
    ...r,
    approved: approvals[r.id] ?? false,
  }));

  // All reviews for this listing (approved + not approved)
  const listingReviews = allReviews.filter((r) => r.listingId === listingId);

  if (!listingReviews.length) {
    // no reviews at all for this listing id
    notFound();
  }

  // Only approved reviews are shown on the public page
  const approvedReviews = listingReviews.filter((r) => r.approved);

  const listingName = listingReviews[0]?.listingName ?? listingId;

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-semibold text-slate-900">
          {listingName}
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          Modern serviced apartment in the heart of the city.
        </p>

        {/* TODO: gallery, amenities, etc. */}

        <ReviewsSection reviews={approvedReviews} />
      </section>
    </main>
  );
}
