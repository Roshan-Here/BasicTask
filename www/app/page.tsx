import { getNormalizedHostawayReviews } from "@/lib/hostaway";
import { getApprovals } from "@/lib/approvalsStore";
import DashboardPage from "./Main/DashboardPage";
import { ReviewsFilterProvider } from "./func/ReviewsFilterContext";
import Link from "next/link";

export default async function Dashboard() {
  const approvals = getApprovals();
  const reviews = (await getNormalizedHostawayReviews()).map((r) => ({
    ...r,
    approved: approvals[r.id] ?? false,
  }));

  // console.log(reviews)

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-semibold text-slate-900">
          Flex Living – Reviews Dashboard
        </h1>

        <Link
          href="/approvedreviews"
          className="inline-flex items-center rounded-lg border border-green-300 bg-gray-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          View public-approved reviews
        </Link>
      </div>
      <ReviewsFilterProvider>
        <DashboardPage />
      </ReviewsFilterProvider>
    </main>
  );
}
