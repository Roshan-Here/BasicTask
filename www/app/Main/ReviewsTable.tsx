"use client";

import { NormalizedReview } from "@/types/reviews";
import Link from "next/link";

interface ReviewsTableProps {
  reviews: NormalizedReview[];
  onToggleApproved: (id: string, approved: boolean) => void;
}

export function ReviewsTable({ reviews, onToggleApproved }: ReviewsTableProps) {
  if (!reviews.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
        No reviews match the current filters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Channel</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3 text-center">Approved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((r) => (
              
              <tr key={r.id} className="hover:bg-slate-50/70">
                <td className="px-4 py-3 align-top">
                  <Link
                    href={`/${r.listingId}`}
                    className="group inline-flex max-w-[200px] flex-col"
                  >
                    <span className="truncate font-medium text-slate-900 group-hover:underline">
                      {r.listingName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      View property page
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="max-w-[180px] truncate font-medium text-slate-900">
                    {r.listingName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    #{r.listingId}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="text-sm text-slate-900">
                    {r.guestName ?? "—"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {r.reviewType.replace("-", " ")}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <RatingPill rating={r.overallRating} />
                </td>
                <td className="px-4 py-3 align-top">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    {r.channel}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-xs text-slate-600">
                  {r.submittedDate}
                </td>
                <td className="px-4 py-3 align-top">
                  <p className="max-w-xs truncate text-sm text-slate-700">
                    {r.comment}
                  </p>
                </td>
                <td className="px-4 py-3 align-top text-center">
                  <ApprovalToggle
                    approved={r.approved}
                    onChange={(val) => onToggleApproved(r.id, val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="max-w-[220px] truncate text-sm font-medium text-slate-900">
                  {r.listingName}
                </p>
                <p className="text-[11px] text-slate-500">
                  {r.submittedDate} • {r.channel}
                </p>
              </div>
              <RatingPill rating={r.overallRating} />
            </div>

            <p className="mb-2 line-clamp-3 text-sm text-slate-700">
              {r.comment}
            </p>

            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-600">
                {r.guestName && (
                  <span className="font-medium text-slate-800">
                    {r.guestName}
                  </span>
                )}
                {r.guestName && " • "}
                <span className="capitalize">
                  {r.reviewType.replace("-", " ")}
                </span>
              </div>
              <ApprovalToggle
                approved={r.approved}
                onChange={(val) => onToggleApproved(r.id, val)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RatingPill({ rating }: { rating: number | null }) {
  if (rating == null) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
        N/A
      </span>
    );
  }

  const color =
    rating >= 9
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : rating >= 7
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${color}`}
    >
      {rating.toFixed(1)} / 10
    </span>
  );
}

interface ApprovalToggleProps {
  approved: boolean;
  onChange: (approved: boolean) => void;
}

function ApprovalToggle({ approved, onChange }: ApprovalToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!approved)}
      className={`w-full flex  justify-center text-center items-center gap-1 rounded-[5px] border px-2 py-1 text-[11px] font-medium transition ${
        approved
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-slate-300 bg-white text-slate-600"
      }`}
    >
      <span
        className={`h-3 w-3 rounded-full ${
          approved ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />
      {approved ? "Approved" : "Not approved"}
    </button>
  );
}
