// React Query client config
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 minutes — data is fresh, no background refetch
      staleTime: 1000 * 60 * 5,
      // 10 minutes — unused cache kept before garbage collection
      gcTime: 1000 * 60 * 10,
      // retry failed requests once before showing an error
      retry: 1,
      // do not refetch every time the user alt-tabs back
      refetchOnWindowFocus: false,
    },
  },
});
