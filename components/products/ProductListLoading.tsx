import { ShoppingCart } from "lucide-react";

const ProductItemLoading = () => {
  return (
    <div className="bg-white border border-[#e6e6e6] rounded-[10px] overflow-hidden animate-pulse">
      <div>
        <div className="relative pt-[100%] bg-gray-200"></div>

        <div className="p-[10px] text-center">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>

      <div>
        <div className="flex items-stretch h-10">
          <div className="bg-gray-200 w-24 h-full rounded-bl-md rounded-tr-md"></div>
          <div className="bg-gray-300 w-10 h-full relative -left-1 rounded-tr-md rounded-br-md flex items-center justify-center">
            <ShoppingCart size={18} color="#999" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductListLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <ProductItemLoading key={index + new Date().getTime()} />
        ))}
    </div>
  );
}
