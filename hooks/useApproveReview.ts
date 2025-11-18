"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsService } from "@/lib/api/reviews.service";
import { NormalizedReview } from "@/types/reviews";

const REVIEWS_KEY = "reviews";

interface ApproveVariables {
  reviewId: string;
  approved: boolean;
}

export function useApproveReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, approved }: ApproveVariables) =>
      reviewsService.approve(reviewId, approved),

    onMutate: async ({ reviewId, approved }) => {
      await queryClient.cancelQueries({ queryKey: [REVIEWS_KEY] });

      const prevData = queryClient.getQueryData<NormalizedReview[]>([
        REVIEWS_KEY,
      ]);

      if (prevData) {
        queryClient.setQueryData<NormalizedReview[]>(
          [REVIEWS_KEY],
          prevData.map((r) =>
            r.id === reviewId ? { ...r, approved } : r
          )
        );
      }

      return { prevData };
    },

    onError: (_error, _vars, context) => {
      if (!context?.prevData) return;
      queryClient.setQueryData<NormalizedReview[]>(
        [REVIEWS_KEY],
        context.prevData
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEWS_KEY] });
    },
  });
}
