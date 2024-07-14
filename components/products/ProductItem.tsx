import { cn } from "@/lib/utils";
import { CakeProduct } from "@/types/product";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  product: CakeProduct;
}

function ProductItem({ product }: IProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#e6e6e6] rounded-[10px] overflow-hidden [&_div:first-child]:hover:scale-[1.05]",
        "[&_span:first-child]:hover:text-[#C0C906]"
      )}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative pt-[100%] cursor-pointer transition-all duration-300">
          <Image
            src={product.thumbnail}
            alt="cake"
            fill
            className="scale-100"
          />
        </div>

        <p className="p-[10px] text-center cursor-pointer ">
          <span className="font-bold line-clamp-1 text-[#333] transition-all duration-300">
            {product.name}
          </span>
          <span className="text-sm">{product.id}</span>
        </p>
      </Link>

      <div>
        <span></span>
        <div className="flex items-stretch h-10">
          <p className="text-white font-bold bg-[#c0c906] px-[10px] leading-10 rounded-bl-md rounded-tr-md z-[1] relative">
            {formatNumberToVND(product.productVariants[0].price)}
          </p>
          <button className="bg-[#3d1a1a] px-3 relative -left-1 z-0 rounded-tr-md rounded-br-md">
            <ShoppingCart size={18} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
