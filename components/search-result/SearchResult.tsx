"use client";

import { getAllProduct } from "@/services/productServices";
import { CakeProduct } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import ProductListLoading from "../products/ProductListLoading";
import ProductList from "../products/ProductList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
export default function SearchResult() {
  const [products, setProducts] = useState<CakeProduct[]>([]);
  const searchParams = useSearchParams();
  const [isLastPage, setIsLastPage] = useState(false);
  const page = searchParams.get("page") || 0;
  const q = searchParams.get("q") || "";
  const {
    data: res,
    isLoading,
    error,
  } = useSWR(`?q=${q}&page=${+page}&size=12`, getAllProduct);
  const { data: nextPage } = useSWR(
    `?q=${q}&page=${+page + 1}&size=12`,
    getAllProduct
  );
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    if (nextPage && nextPage.code === 1 && nextPage.data.length === 0) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [nextPage]);
  useEffect(() => {
    if (res?.data) {
      const listP = res.data.map((item: any) => item.product);
      setProducts(listP);
    }
  }, [res]);

  return (
    <div>
      {isLoading ? (
        <ProductListLoading />
      ) : (
        products &&
        products.length > 0 && (
          <ProductList itemPerRow={4} products={products} />
        )
      )}
      <Pagination className="py-10">
        <PaginationContent className="gap-3">
          {+page !== 0 && (
            <PaginationItem>
              <Button className="p-0 size-10 bg-white transition-all duration-200 hover:bg-[#3d1a1a] [&_svg]:hover:text-white">
                <Link
                  className="block"
                  href={"?" + createQueryString("page", `${+page - 1}`)}
                >
                  <ChevronsLeft className="text-[#333] transition-[inherit]" />
                </Link>
              </Button>
            </PaginationItem>
          )}
          <PaginationItem className="font-bold text-white rounded-[10px] size-10 flex justify-center items-center bg-[#3d1a1a]">
            {+page + 1}
          </PaginationItem>
          {!isLastPage && (
            <PaginationItem>
              <Button className="p-0 size-10 bg-white transition-all duration-200 hover:bg-[#3d1a1a] [&_svg]:hover:text-white">
                <Link
                  className="block"
                  href={"?" + createQueryString("page", `${+page + 1}`)}
                >
                  <ChevronsRight className="text-[#333] transition-[inherit]" />
                </Link>
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
