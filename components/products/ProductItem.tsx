/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "@/lib/utils";
import { CakeProduct } from "@/types/product";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ProductQuickview from "./ProductQuickview";
import { createMixedString } from "@/utils/createMixString";
import { useMemo } from "react";

interface IProps {
  product: CakeProduct;
}

function ProductItem({ product }: IProps) {
  const mixId = useMemo(() => {
    return createMixedString(product.name);
  }, []);

  return (
    <Dialog>
      <div
        className={cn(
          "bg-white border border-[#e6e6e6] rounded-[10px] overflow-hidden [&_div:first-child]:hover:scale-[1.05]",
          "[&_span:first-child]:hover:text-[#C0C906]",
          product.stop &&
            "relative opacity-70 pointer-events-none !cursor-not-allowed"
        )}
      >
        <Link
          href={product.stop ? "#" : `/products/${product.id}`}
          onClick={(e) => product.stop && e.preventDefault()}
        >
          <div
            className={cn(
              "relative pt-[100%] transition-all cursor-pointer duration-300",
              {
                "cursor-not-allowed": product.stop,
              }
            )}
          >
            <Image
              src={product.thumbnail}
              alt="cake"
              fill
              className="scale-100"
            />
          </div>

          <p
            className={cn("p-[10px] text-center cursor-pointer ", {
              "cursor-not-allowed": product.stop,
            })}
          >
            <span className="font-bold line-clamp-1 text-[#333] transition-all duration-300">
              {product.name}
            </span>
            <span className="text-sm font-bold">
              {product.stop ? "TẠM NGƯNG" : mixId}
            </span>
          </p>
        </Link>

        <div>
          {/* Using empty span for css */}
          <span />
          <div className="flex items-stretch h-10">
            <p className="text-white font-bold bg-[#c0c906] px-[10px] leading-10 rounded-bl-md rounded-tr-md z-[1] relative">
              {formatNumberToVND(product.productVariants[0].price)}
            </p>
            <DialogTrigger asChild>
              <button
                className={cn(
                  "bg-[#3d1a1a] px-3 relative -left-1 z-0 rounded-tr-md rounded-br-md",
                  product.stop && "opacity-50 cursor-not-allowed"
                )}
                disabled={product.stop}
              >
                <ShoppingCart size={18} color="#fff" />
              </button>
            </DialogTrigger>
            <DialogContent className="w-[80%] max-w-[100%]">
              <DialogTitle>
                <span className="font-bold line-clamp-1 text-[#333] transition-all duration-300">
                  {product.name}
                </span>
              </DialogTitle>
              <ProductQuickview product={product} />
            </DialogContent>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductItem;
