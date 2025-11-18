import mockData from "@/data/hostaway-mock.json";
import { NormalizedReview } from "@/types/reviews";

const ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID!;
const API_KEY = process.env.HOSTAWAY_API_KEY!;
const BASE_URL = process.env.HOSTAWAY_BASE_URL;

type HostawayReview = {
  id: number;
  type: "host-to-guest" | "guest-to-host";
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory?: { category: string; rating: number }[];
  submittedAt: string; 
  guestName?: string;
  listingName: string;
  listingMapId?: string | number; 
  channel?: string;
};

function parseDateToISO(dateStr: string): string {
  return new Date(dateStr.replace(" ", "T") + "Z").toISOString();
}

function getDateOnly(iso: string): string {
  return iso.split("T")[0];
}

function normalizeHostawayReview(r: HostawayReview): NormalizedReview {
  const categories: NormalizedReview["categories"] = {};
  (r.reviewCategory ?? []).forEach((c) => {
    const key = c.category
      .toLowerCase()
      .replace(/[\s]/g, "_")
      .replace(/respect_house_rules/, "respectHouseRules");
    categories[key] = c.rating;
  });

  const isoDate = parseDateToISO(r.submittedAt);

  let overallRating = r.rating;
  if (overallRating == null && r.reviewCategory?.length) {
    const sum = r.reviewCategory.reduce((acc, c) => acc + c.rating, 0);
    overallRating = sum / r.reviewCategory.length;
  }

  return {
    id: String(r.id),
    source: "hostaway",
    listingId: r.listingMapId ? String(r.listingMapId) : r.listingName, 
    listingName: r.listingName,
    guestName: r.guestName,
    reviewType: r.type,
    status: r.status as any,
    overallRating,
    categories,
    channel: r.channel ?? "direct",
    submittedAt: isoDate,
    submittedDate: getDateOnly(isoDate),
    comment: r.publicReview,
    approved: false, 
  };
}

export async function fetchHostawayRawReviews(): Promise<HostawayReview[]> {
  try {
    const url = `${BASE_URL}/reviews?accountId=${ACCOUNT_ID}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      // @ts-ignore
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Hostaway error: ${res.statusText}`);

    const json = await res.json();
    if (!json.result || json.result.length === 0) {
      // empty → fallback to mock
      return mockData.result as HostawayReview[];
    }
    return json.result as HostawayReview[];
  } catch (err) {
    console.error("Failed to fetch Hostaway reviews, using mock:", err);
    return mockData.result as HostawayReview[];
  }
}

export async function getNormalizedHostawayReviews(): Promise<NormalizedReview[]> {
  const raw = await fetchHostawayRawReviews();
  return raw.map(normalizeHostawayReview);
}
