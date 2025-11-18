import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import { NormalizedReview } from "@/types/reviews";

export interface ReviewsResponse {
  reviews: NormalizedReview[];
}

export const reviewsService = {
  async listAll(): Promise<NormalizedReview[]> {
    const data = await apiClient.get<ReviewsResponse>(ENDPOINTS.hostawayReviews);
    return data.reviews;
  },

  async approve(reviewId: string, approved: boolean): Promise<void> {
    await apiClient.post(ENDPOINTS.approveReview, { reviewId, approved });
  },
};
