"use client";
import { CategoryProps } from "@/types/category";
import ProductList from "../products/ProductList";
import useSWR from "swr";
import { getAllProductByCateId } from "@/services/categoryService";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

function HomeProduct2() {
  const [productData, setProductData] = useState<CategoryProps>(
    {} as CategoryProps
  );
  const { data, isLoading, error } = useSWR(
    "3b8be056-0895-4172-911a-79900b88f9b1",
    getAllProductByCateId
  );

  useEffect(() => {
    if (!isLoading && !error && data && data.code === 1) {
      setProductData(data.data);
    }
  }, [data, error, isLoading]);

  return (
    <div className="mt-10">
      <h3 className="text-[32px] text-[#c0c906] font-bold text-center">
        GATEAUX KEM TƯƠI
      </h3>
      <ProductList products={productData.products} />
    </div>
  );
}

export default HomeProduct2;
