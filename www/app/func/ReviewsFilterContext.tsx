"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { ReviewsFilters, SortBy } from "@/types/filters";

const initialFilters: ReviewsFilters = {
  listingId: "all",
  channel: "all",
  minRating: 0,
  showApprovedOnly: false,
  sortBy: "date_desc",
};

type Action =
  | { type: "SET_LISTING"; listingId: string }
  | { type: "SET_CHANNEL"; channel: string }
  | { type: "SET_MIN_RATING"; minRating: number }
  | { type: "TOGGLE_APPROVED_ONLY" }
  | { type: "SET_SORT"; sortBy: SortBy }
  | { type: "RESET" };

function reducer(state: ReviewsFilters, action: Action): ReviewsFilters {
  switch (action.type) {
    case "SET_LISTING":
      return { ...state, listingId: action.listingId };
    case "SET_CHANNEL":
      return { ...state, channel: action.channel };
    case "SET_MIN_RATING":
      return { ...state, minRating: action.minRating };
    case "TOGGLE_APPROVED_ONLY":
      return { ...state, showApprovedOnly: !state.showApprovedOnly };
    case "SET_SORT":
      return { ...state, sortBy: action.sortBy };
    case "RESET":
      return initialFilters;
    default:
      return state;
  }
}

interface ReviewsFilterContextValue {
  filters: ReviewsFilters;
  setListingId: (listingId: string) => void;
  setChannel: (channel: string) => void;
  setMinRating: (minRating: number) => void;
  toggleApprovedOnly: () => void;
  setSortBy: (sortBy: SortBy) => void;
  reset: () => void;
}

const ReviewsFilterContext = createContext<ReviewsFilterContextValue | null>(
  null
);

export function ReviewsFilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialFilters);

  const value: ReviewsFilterContextValue = {
    filters: state,
    setListingId: (listingId) =>
      dispatch({ type: "SET_LISTING", listingId }),
    setChannel: (channel) =>
      dispatch({ type: "SET_CHANNEL", channel }),
    setMinRating: (minRating) =>
      dispatch({ type: "SET_MIN_RATING", minRating }),
    toggleApprovedOnly: () => dispatch({ type: "TOGGLE_APPROVED_ONLY" }),
    setSortBy: (sortBy) => dispatch({ type: "SET_SORT", sortBy }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return (
    <ReviewsFilterContext.Provider value={value}>
      {children}
    </ReviewsFilterContext.Provider>
  );
}

export function useReviewsFilters() {
  const ctx = useContext(ReviewsFilterContext);
  if (!ctx) {
    throw new Error(
      "useReviewsFilters must be used within ReviewsFilterProvider"
    );
  }
  return ctx;
}
