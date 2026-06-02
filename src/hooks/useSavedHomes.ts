import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSavedProperties, saveProperty, unsaveProperty } from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import { AkiyaListing, SavedProperty } from '@/types';

// A stable cache key for the saved-homes list.
// Passing this to invalidateQueries() after any mutation tells React Query
// to refetch the list automatically — no manual state updates needed.
const SAVED_HOMES_KEY = ['saved-homes'] as const;

// ─── Fetch all saved homes ───────────────────────────────────────────────────
export function useSavedHomes() {
  const { token, isLoggedIn } = useAuth();
  return useQuery<SavedProperty[]>({
    queryKey: SAVED_HOMES_KEY,
    queryFn: () => getSavedProperties(token),
    // enabled: false means the query will not run at all.
    // Without this guard, React Query would fire a request with an empty
    // token for every logged-out page load and get back a 401 error.
    enabled: isLoggedIn,
  });
}

// ─── Save a property ─────────────────────────────────────────────────────────
export function useSaveProperty() {
  const { token } = useAuth();
  const qc = useQueryClient();
  return useMutation<SavedProperty, Error, AkiyaListing>({
    mutationFn: (listing) => saveProperty(token, listing),
    onSuccess: () => {
      // Mark the saved-homes cache as stale so it refetches the updated list.
      qc.invalidateQueries({ queryKey: SAVED_HOMES_KEY });
    },
  });
}

// ─── Remove a saved property ─────────────────────────────────────────────────
export function useUnsaveProperty() {
  const { token } = useAuth();
  const qc = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (propertyDbId) => unsaveProperty(token, propertyDbId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SAVED_HOMES_KEY });
    },
  });
}
