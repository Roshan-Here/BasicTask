import { getNormalizedHostawayReviews } from "@/lib/hostaway";
import { getApprovals } from "@/lib/approvalsStore";
import DashboardPage from "./Main/DashboardPage";
import { ReviewsFilterProvider } from "./func/ReviewsFilterContext";

export default async function Dashboard() {
  const approvals = getApprovals();
  const reviews = (await getNormalizedHostawayReviews()).map((r) => ({
    ...r,
    approved: approvals[r.id] ?? false,
  }));

  // console.log(reviews)

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Flex Living – Reviews Dashboard
      </h1>

      <ReviewsFilterProvider>
        <DashboardPage />
      </ReviewsFilterProvider>
    </main>
  );

}
