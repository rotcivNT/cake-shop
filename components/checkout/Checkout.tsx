"use client";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useEffect, useMemo, useState } from "react";
import { CartProductProps } from "../cart/Cart";
import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import { getShoppingCart } from "@/services/shoppingService";
import { CakeProduct } from "@/types/product";
import CheckoutProductList from "./CheckoutProductList";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import CheckoutInfo from "./CheckoutInfo";
import CheckoutInfoWrapper from "./CheckoutInfoWrapper";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useCakeStore } from "@/store/cakeStore";

function Checkout() {
  const { products, setProducts } = useCakeStore((state) => ({
    products: state.cartProducts,
    setProducts: state.setCartProducts,
  }));
  const auth = useAuth();
  const { data, isLoading, error } = useSWR(auth.userId, getShoppingCart);
  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => {
      return (
        acc +
        item.product.productVariants[item.selectedPrice].price * item.quantity
      );
    }, 0);
  }, [products]);

  return (
    <div className="w-[1200px] px-8 max-w-full mx-auto">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
