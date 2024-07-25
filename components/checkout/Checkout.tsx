/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCakeStore } from "@/store/cakeStore";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { useLayoutEffect, useMemo } from "react";
import CheckoutInfoWrapper from "./CheckoutInfoWrapper";
import CheckoutProductList from "./CheckoutProductList";
import { useRouter } from "next/navigation";

function Checkout() {
  const { products } = useCakeStore((state) => ({
    products: state.cartProducts,
  }));
  const router = useRouter();
  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => {
      return (
        acc +
        item.product.productVariants[item.selectedPrice].price * item.quantity
      );
    }, 0);
  }, [products]);

  useLayoutEffect(() => {
    if (products.length === 0) {
      router.push("/cart");
    }
  }, []);

  return (
    <div className="w-[1200px] px-8 max-w-full mx-auto">
      {/* Checkout info + product */}
      <div className="mt-10">
        <div className="px-8">
          <CheckoutProductList products={products} />
        </div>
        <hr className="my-5 w-[calc(100%-64px)] mx-auto" />
        <p className="flex justify-between items-center px-8">
          Tổng tiền: <span>{formatNumberToVND(totalPrice)}</span>
        </p>
        <hr className="my-5 w-[calc(100%-64px)] mx-auto" />

        <div>
          <CheckoutInfoWrapper products={products} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
