import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import type { ProductResponse } from "../api/productApi";

export function useSearch(query: string) {
  return useInfiniteQuery<
    ProductResponse,
    Error,
    InfiniteData<ProductResponse> | undefined,
    readonly unknown[],
    number
  >({
    queryKey: ["products", query],
    queryFn: async ({ pageParam = 0, signal }) => {
      // fetchProducts should accept skip, limit, query, and signal
      return fetchProducts({ query, skip: pageParam, limit: 12, signal });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.products.length;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: 60_000, // 1 minute
    gcTime: 5 * 60_000, // 5 minutes
  });
}
