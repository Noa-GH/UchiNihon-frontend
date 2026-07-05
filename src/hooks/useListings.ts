import { useQuery } from '@tanstack/react-query';
import { getListings, ListingsResponse } from '@/utils/api';

// Cache key factory — filter params are part of the key so each unique
// combination of filters gets its own cached result.
const listingsKey = (prefecture?: string, maxPrice?: string) =>
  ['listings', prefecture ?? 'All', maxPrice ?? ''] as const;

/**
 * useListings
 *
 * Public hook — no auth token needed.
 * Fetches Akiya property listings from GET /api/listings.
 *
 * Passing `prefecture` or `maxPrice` adds the corresponding query params
 * to the request. The hook re-fetches automatically when either value changes.
 *
 * When the backend DB has no synced data yet, the query resolves to
 * { count: 0, properties: [] } — the caller should render an empty-state UI.
 */
export function useListings(prefecture?: string, maxPrice?: string) {
  return useQuery<ListingsResponse>({
    queryKey: listingsKey(prefecture, maxPrice),
    queryFn: () =>
      getListings({
        prefecture: prefecture && prefecture !== 'All' ? prefecture : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      }),
    // Listings data is relatively stable — 2 minute freshness window.
    staleTime: 1000 * 60 * 2,
    // Keep the previous page's data visible while a filter refetch is in-flight
    // so the grid doesn't flash empty on every filter change.
    placeholderData: (prev) => prev,
  });
}
