"use client";

import { NormalizedReview } from "@/types/reviews";
import { ReviewsFilters, SortBy } from "@/types/filters";
import { ChangeEvent } from "react";

interface FiltersBarProps {
  filters: ReviewsFilters;
  onChange: (next: ReviewsFilters) => void;
  reviews: NormalizedReview[];
}

export function FiltersBar({ filters, onChange, reviews }: FiltersBarProps) {
  const listingOptions = Array.from(
    new Map(
      reviews.map((r) => [r.listingId, r.listingName])
    ).entries()
  );

  const channelOptions = Array.from(
    new Set(reviews.map((r) => r.channel).filter(Boolean))
  );

  const handleSelectChange =
    (field: keyof ReviewsFilters) =>
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange({ ...filters, [field]: e.target.value });
    };

  const handleMinRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange({ ...filters, minRating: value });
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, sortBy: e.target.value as SortBy });
  };

  const handleToggleApproved = () => {
    onChange({ ...filters, showApprovedOnly: !filters.showApprovedOnly });
  };

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-end md:justify-between">
      {/* Left: Selects */}
      <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3">
        {/* Listing filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">
            Property
          </label>
          <select
            value={filters.listingId}
            onChange={handleSelectChange("listingId")}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="all">All properties</option>
            {listingOptions.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Channel filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">Channel</label>
          <select
            value={filters.channel}
            onChange={handleSelectChange("channel")}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="all">All channels</option>
            {channelOptions.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">
            Sort by
          </label>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="rating_desc">Highest rating</option>
            <option value="rating_asc">Lowest rating</option>
          </select>
        </div>

        {/* Min rating (on small we show here, on larger it's okay too) */}
        <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <label className="flex items-center justify-between text-xs font-medium text-slate-600">
            <span>Min rating</span>
            <span className="text-[11px] text-slate-500">
              {filters.minRating}+
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={filters.minRating}
            onChange={handleMinRatingChange}
            className="w-full accent-slate-900"
          />
        </div>
      </div>

      {/* Right: toggles */}
      <div className="flex items-center justify-between gap-3 md:flex-col md:items-end">
        <button
          type="button"
          onClick={handleToggleApproved}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
            filters.showApprovedOnly
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-slate-300 bg-white text-slate-700"
          } transition`}
        >
          <span
            className={`flex h-3 w-3 items-center justify-center rounded-full ${
              filters.showApprovedOnly ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Approved only
        </button>
      </div>
    </div>
  );
}
