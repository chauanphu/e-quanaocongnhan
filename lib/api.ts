import { Product } from "@prisma/client";

// Retrieve all products from /api/san-pham?type=sanpham&_limit=10&_page=1
export const getAllProducts = async (type: string, _limit: number, _page: number): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/san-pham?type=${type}&_limit=${_limit}&_page=${_page}`);
  const data = await res.json();
  return data;
};