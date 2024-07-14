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
    "87f18fe2-6457-441d-aa45-78aa7e0dc8fd",
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
