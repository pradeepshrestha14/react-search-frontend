import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import type { ProductResponse } from "../api/productApi";

export function useSearch(query: string) {
  const PAGE_SIZE = 12;

  return useInfiniteQuery<
    ProductResponse,
    Error,
    InfiniteData<ProductResponse> | undefined,
    readonly unknown[],
    number
  >({
    queryKey: ["products", query],
    queryFn: async ({ pageParam = 1, signal }) => {
      return fetchProducts({
        query,
        page: pageParam,
        limit: PAGE_SIZE,
        signal,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    staleTime: 60_000, // 1 minute
    gcTime: 5 * 60_000, // 5 minutes

    retry: 1, // retry only once (or false to disable)
    retryDelay: 2000, // wait 2 seconds before retry
  });
}
