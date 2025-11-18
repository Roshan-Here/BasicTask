export type ReviewSource = "hostaway" | "google";

export interface NormalizedReview {
  id: string;
  source: ReviewSource;
  listingId: string;
  listingName: string;
  guestName?: string;
  hostName?: string;
  reviewType: "guest-to-host" | "host-to-guest";
  status: "published" | "pending" | "hidden";
  overallRating: number | null;
  categories: {
    cleanliness?: number;
    communication?: number;
    respectHouseRules?: number;
    [key: string]: number | undefined;
  };
  channel: string;
  submittedAt: string;
  submittedDate: string;
  comment: string;
  approved: boolean;
}
