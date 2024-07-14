import Image from "next/image";
import { CartProductProps } from "../cart/Cart";
import { formatNumberToVND } from "@/utils/formatNumberToVND";

interface IProps {
  product: CartProductProps;
}

function CheckoutProduct({ product }: IProps) {
  return (
    <div className="flex items-center clear-start gap-4">
      <div className="relative size-[65px] rounded-[8px] overflow-hidden">
        <Image
          fill
          src={product.product.thumbnail}
          alt={product.product.name}
        />
      </div>
      <p className="flex flex-col gap-1 flex-1">
        <span className="text-sm font-[600] text-[#4b4b4b]">
          {product.product.name}
        </span>
        <span className="text-xs font-[500] text-[#969696]">
          {
            product.product.productVariants[product.selectedPrice].variant
              .variantValue
          }{" "}
          - Số lượng: {product.quantity}
        </span>
      </p>
      <p>
        {formatNumberToVND(
          product.product.productVariants[product.selectedPrice].price *
            product.quantity
        )}
      </p>
    </div>
  );
}

export default CheckoutProduct;
