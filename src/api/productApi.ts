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
  skip: number;
  limit: number;
}

/**
 * Fetch products from dummyjson API using axios.
 * Supports skip/limit pagination and optional AbortSignal.
 */
export async function fetchProducts({
  query,
  limit = 12,
  skip = 0,
  signal,
}: {
  query: string;
  limit?: number;
  skip?: number;
  signal?: AbortSignal;
}): Promise<ProductResponse> {
  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
    query
  )}&limit=${limit}&skip=${skip}`;

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
