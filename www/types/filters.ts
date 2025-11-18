export type SortBy = "date_desc" | "date_asc" | "rating_desc" | "rating_asc";

export interface ReviewsFilters {
  listingId: string; 
  channel: string;   
  minRating: number;
  showApprovedOnly: boolean;
  sortBy: SortBy;
}
