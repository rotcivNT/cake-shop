import React from "react";
import Menubar from "./Menubar";
import { getCategoryByName } from "@/services/categoryService";
import ProductListWrapper from "./ProductListWrapper";

interface IProps {
  categoryName: string;
  categoryId: string;
  rootCategoryName: string;
}
export default async function Collection({
  categoryName,
  categoryId,
  rootCategoryName,
}: IProps) {
  const displayCategory = await getCategoryByName(categoryName);
  return (
    <div className="py-10">
      <h3 className="uppercase text-center mb-10 text-[#333] text-[24px] font-bold">
        {decodeURIComponent(categoryName)}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-[20px] sm:gap-[30px] w-[1200px] mx-auto max-w-full px-3 sm:px-[30px]">
        <div className="">
          <Menubar
            categoryId={categoryId}
            categoryName={categoryName}
            rootCategoryName={rootCategoryName}
          />
        </div>

        {/* Product list */}
        <div className="col-span-3">
          <ProductListWrapper categoryId={displayCategory.data?.id as string} />
        </div>
      </div>
    </div>
  );
}
