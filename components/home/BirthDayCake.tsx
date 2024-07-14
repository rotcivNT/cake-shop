"use client";
import { getAllProductByCateId } from "@/services/categoryService";
import ProductList from "../products/ProductList";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { CategoryProps } from "@/types/category";

function BirthDayCake() {
  const [productData, setProductData] = useState<CategoryProps>(
    {} as CategoryProps
  );
  const { data, isLoading, error } = useSWR(
    "625c1bdf-abf1-47c6-aafb-4d573c5cd681",
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
        BÁNH SINH NHẬT 2024
      </h3>
      <ProductList products={productData.products} />
    </div>
  );
}

export default BirthDayCake;
