// lib/api/endpoints.ts
export const ENDPOINTS = {
  hostawayReviews: "/api/reviews/hostaway",
  approveReview: "/api/reviews/approve",
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
