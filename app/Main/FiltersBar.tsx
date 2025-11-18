"use client";

import { NormalizedReview } from "@/types/reviews";
import { ReviewsFilters, SortBy } from "@/types/filters";
import { ChangeEvent, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const DEFAULT_FILTERS: ReviewsFilters = {
  listingId: "all",
  channel: "all",
  minRating: 0,
  showApprovedOnly: false,
  sortBy: "date_desc",
};

interface FiltersBarProps {
  filters: ReviewsFilters;
  onChange: (next: ReviewsFilters) => void;
  reviews: NormalizedReview[];
}

export function FiltersBar({ filters, onChange, reviews }: FiltersBarProps) {
  const [isListingOpen, setIsListingOpen] = useState(false);
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const listingOptions = Array.from(
    new Map(reviews.map((r) => [r.listingId, r.listingName])).entries()
  );

  const channelOptions = Array.from(
    new Set(reviews.map((r) => r.channel).filter(Boolean))
  );

  const handleSelectChange =
    (field: keyof ReviewsFilters) =>
    (value: string) => {
      onChange({ ...filters, [field]: value });
    };

  const handleMinRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange({ ...filters, minRating: value });
  };

  const handleSortChange = (value: SortBy) => {
    onChange({ ...filters, sortBy: value });
  };

  const handleToggleApproved = () => {
    onChange({ ...filters, showApprovedOnly: !filters.showApprovedOnly });
  };

  const handleReset = () => {
    onChange(DEFAULT_FILTERS);
  };

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-end md:justify-between">
      {/* Left: Selects */}
      <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3">
        {/* Listing filter */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-medium text-slate-600">
            Property
          </Label>
          <Select
            value={filters.listingId}
            onValueChange={handleSelectChange("listingId")}
            onOpenChange={setIsListingOpen}
          >
            <SelectTrigger className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All properties</SelectItem>
              {listingOptions.map(([id, name]) => (
                <SelectItem key={id} value={String(id)}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Channel filter */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-medium text-slate-600">
            Channel
          </Label>
          <Select
            value={filters.channel}
            onValueChange={handleSelectChange("channel")}
            onOpenChange={setIsChannelOpen}
          >
            <SelectTrigger className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All channels</SelectItem>
              {channelOptions.map((ch) => (
                <SelectItem key={ch} value={String(ch)}>
                  {ch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort by */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-medium text-slate-600">
            Sort by
          </Label>
          <Select
            value={filters.sortBy}
            onValueChange={(val) => handleSortChange(val as SortBy)}
            onOpenChange={setIsSortOpen}
          >
            <SelectTrigger className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">Newest first</SelectItem>
              <SelectItem value="date_asc">Oldest first</SelectItem>
              <SelectItem value="rating_desc">Highest rating</SelectItem>
              <SelectItem value="rating_asc">Lowest rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Min rating */}
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

      {/* Right: toggles + reset */}
      <div className="flex items-center justify-between gap-3  md:items-end">
        <button
          type="button"
          onClick={handleToggleApproved}
          className={`inline-flex items-center  whitespace-nowrap gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${
            filters.showApprovedOnly
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-slate-300 bg-white text-slate-700"
          } transition`}
        >
          <span
            className={`flex h-3 w-3 items-center justify-center rounded-full ${
              filters.showApprovedOnly ? "bg-emerald-500" : "bg-slate-300"
            }`}
          ></span>
          Approved only
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center whitespace-nowrap rounded-lg bg-blue-200 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-blue-500 hover:text-white"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
