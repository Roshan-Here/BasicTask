import { getNormalizedHostawayReviews } from "@/lib/hostaway";
import { getApprovals } from "@/lib/approvalsStore";
import { NormalizedReview } from "@/types/reviews";
import Link from "next/link";

export default async function ApprovedReviewsPage() {
  const approvals = getApprovals();
  const allReviews = (await getNormalizedHostawayReviews()).map((r) => ({
    ...r,
    approved: approvals[r.id] ?? false,
  }));

  const approvedReviews = allReviews.filter((r) => r.approved);

  if (!approvedReviews.length) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto max-w-5xl px-4 py-10">
          <h1 className="mb-2 text-2xl font-semibold text-slate-900">
            Approved guest reviews
          </h1>
          <p className="mb-6 text-sm text-slate-600">
            There are currently no reviews approved for display.
          </p>

          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Go to dashboard
          </Link>
        </section>
      </main>
    );
  }

  // Group by listingId
  const groupedByListing = approvedReviews.reduce<
    Record<string, { listingName: string; reviews: NormalizedReview[] }>
  >((acc, review) => {
    if (!acc[review.listingId]) {
      acc[review.listingId] = {
        listingName: review.listingName,
        reviews: [],
      };
    }
    acc[review.listingId].reviews.push(review);
    return acc;
  }, {});

  const groups = Object.entries(groupedByListing); 

  const total = approvedReviews.length;

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Approved guest reviews
            </h1>
            <p className="text-sm text-slate-600">
              {total} review{total > 1 ? "s" : ""} approved across{" "}
              {groups.length} propert{groups.length > 1 ? "ies" : "y"}.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Back to dashboard
          </Link>
        </header>

        <div className="space-y-8">
          {groups.map(([listingId, group]) => (
            <section key={listingId} className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {group.listingName}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {group.reviews.length} review
                    {group.reviews.length > 1 ? "s" : ""} approved
                  </p>
                </div>
                <Link
                  href={`/${listingId}`}
                  className="text-xs font-medium text-slate-700 underline"
                >
                  View property page
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {group.reviews.map((r) => (
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
                          {r.submittedDate} • {r.channel}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-900 shadow-sm">
                        {(r.overallRating ?? 0).toFixed(1)}/10
                      </span>
                    </div>

                    <p className="mb-3 text-sm text-slate-700">
                      {r.comment}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 capitalize">
                        {r.reviewType.replace("-", " ")}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5">
                        Review ID: {r.id}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
