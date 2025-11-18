// app/dashboard/DashboardPage.tsx
"use client";

import { useState, useMemo } from "react";
import { NormalizedReview } from "@/types/reviews";
import { SummaryCards } from "./SummaryCards";
import { FiltersBar } from "./FiltersBar";
import { ReviewsTable } from "./ReviewsTable";
import { ReviewsFilters } from "@/types/filters";

interface Props {
  initialReviews: NormalizedReview[];
}

export default function DashboardPage({ initialReviews }: Props) {
  const [filters, setFilters] = useState<ReviewsFilters>({
    listingId: "all",
    channel: "all",
    minRating: 0,
    showApprovedOnly: false,
    sortBy: "date_desc", 
  });


  const [reviews, setReviews] = useState(initialReviews);

const filteredReviews = useMemo(() => {
  let result = reviews.filter((r) => {
    if (filters.listingId !== "all" && r.listingId !== filters.listingId)
      return false;
    if (filters.channel !== "all" && r.channel !== filters.channel)
      return false;
    if (filters.minRating > 0 && (r.overallRating ?? 0) < filters.minRating)
      return false;
    if (filters.showApprovedOnly && !r.approved) return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (filters.sortBy) {
      case "date_desc":
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();

      case "date_asc":
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();

      case "rating_desc":
        return (b.overallRating ?? 0) - (a.overallRating ?? 0);

      case "rating_asc":
        return (a.overallRating ?? 0) - (b.overallRating ?? 0);

      default: {
        const _exhaustiveCheck: never = filters.sortBy;
        return 0;
      }
    }
  });

  return result;
}, [reviews, filters]);


  const handleToggleApproved = async (id: string, approved: boolean) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved } : r))
    );
    await fetch("/api/reviews/approve", {
      method: "POST",
      body: JSON.stringify({ reviewId: id, approved }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">
        Flex Living – Reviews Dashboard
      </h1>

      <SummaryCards reviews={filteredReviews} />

      <FiltersBar filters={filters} onChange={setFilters} reviews={reviews} />

      <ReviewsTable
        reviews={filteredReviews}
        onToggleApproved={handleToggleApproved}
      />
    </div>
  );
}
