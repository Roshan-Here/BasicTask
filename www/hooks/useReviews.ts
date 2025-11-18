"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewsService } from "@/lib/api/reviews.service";
import { NormalizedReview } from "@/types/reviews";

const REVIEWS_KEY = "reviews";

export function useReviews() {
  return useQuery<NormalizedReview[], Error>({
    queryKey: [REVIEWS_KEY],
    queryFn: () => reviewsService.listAll(),
  });
}
