"use client";

import { useMemo } from "react";
import { ReviewsFilters } from "@/types/filters";
import { NormalizedReview } from "@/types/reviews";
import { useReviewsFilters } from "../func/ReviewsFilterContext";
import { useReviews } from "@/hooks/useReviews";
import { useApproveReview } from "@/hooks/useApproveReview";
import { SummaryCards } from "./SummaryCards";
import { FiltersBar } from "./FiltersBar";
import { ReviewsTable } from "./ReviewsTable";

export default function DashboardPage() {
  const {
    filters,
    setListingId,
    setChannel,
    setMinRating,
    setSortBy,
    toggleApprovedOnly,
  } = useReviewsFilters();

  const { data: allReviews = [], isLoading, isError, error } = useReviews();
  const approveMutation = useApproveReview();

  const filteredReviews = useMemo(() => {
    let result: NormalizedReview[] = allReviews;

    // basic filters
    if (filters.listingId !== "all") {
      result = result.filter((r) => r.listingId === filters.listingId);
    }
    if (filters.channel !== "all") {
      result = result.filter((r) => r.channel === filters.channel);
    }
    if (filters.minRating > 0) {
      result = result.filter(
        (r) => (r.overallRating ?? 0) >= filters.minRating
      );
    }
    if (filters.showApprovedOnly) {
      result = result.filter((r) => r.approved);
    }

    result = result.slice().sort((a, b) => {
      switch (filters.sortBy) {
        case "date_desc":
          return b.submittedAt.localeCompare(a.submittedAt);
        case "date_asc":
          return a.submittedAt.localeCompare(b.submittedAt);
        case "rating_desc":
          return (b.overallRating ?? 0) - (a.overallRating ?? 0);
        case "rating_asc":
          return (a.overallRating ?? 0) - (b.overallRating ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [allReviews, filters]);

  const handleFiltersChange = (next: ReviewsFilters) => {
    setListingId(next.listingId);
    setChannel(next.channel);
    setMinRating(next.minRating);
    if (next.sortBy) setSortBy(next.sortBy);
    if (next.showApprovedOnly !== filters.showApprovedOnly) {
      toggleApprovedOnly();
    }
  };

  const handleToggleApproved = (reviewId: string, approved: boolean) => {
    approveMutation.mutate({ reviewId, approved });
  };

  if (isLoading) {
    return (
      <div className="mt-8 text-sm text-slate-600">Loading reviews…</div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Failed to load reviews: {error.message}
      </div>
    );
  }

  return (
    <>
      <SummaryCards reviews={filteredReviews} />

      <FiltersBar
        filters={filters}
        onChange={handleFiltersChange}
        reviews={allReviews} // for options
      />

      <ReviewsTable
        reviews={filteredReviews}
        onToggleApproved={handleToggleApproved}
      />
    </>
  );
}
