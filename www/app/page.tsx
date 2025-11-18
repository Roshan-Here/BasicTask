import { getNormalizedHostawayReviews } from "@/lib/hostaway";
import { getApprovals } from "@/lib/approvalsStore";
import DashboardPage from "./Main/DashboardPage";

export default async function Dashboard() {
  const approvals = getApprovals();
  const reviews = (await getNormalizedHostawayReviews()).map((r) => ({
    ...r,
    approved: approvals[r.id] ?? false,
  }));

  // console.log(reviews)



  return <DashboardPage initialReviews={reviews} />;
}
