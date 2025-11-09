import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  brand: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Fetch products from backend API using page-based pagination.
 */
export async function fetchProducts({
  query,
  limit = 12,
  page = 1,
  signal,
}: {
  query: string;
  limit?: number;
  page?: number;
  signal?: AbortSignal;
}): Promise<ProductResponse> {
  const url = `https://prod-node-search-backend.onrender.com/api/search?q=${encodeURIComponent(
    query
  )}&limit=${limit}&page=${page}`;

  try {
    const response = await axios.get<ProductResponse>(url, { signal });
    return response.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("Request canceled");
    }
    throw new Error(error.message || "Error fetching products");
  }
}
