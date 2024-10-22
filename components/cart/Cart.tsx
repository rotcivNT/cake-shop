/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  getShoppingCart,
  updateShoppingCart,
} from "@/services/shoppingService";
import { useCakeStore } from "@/store/cakeStore";
import { CakeProduct } from "@/types/product";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import useSWR from "swr";
import { Button } from "../ui/button";
import { CartItemLoading } from "./CartItemLoading";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface CartProductProps {
  selectedPrice: number;
  quantity: number;
  product: CakeProduct;
}

function Cart() {
  const { products, setProducts } = useCakeStore((state) => ({
    products: state.cartProducts,
    setProducts: state.setCartProducts,
  }));
  const auth = useAuth();
  const [description, setDescription] = useState("");
  const { data, isLoading } = useSWR(
    `${auth.isSignedIn ? `get-cart/${auth.userId}` : null}`,
    getShoppingCart
  );
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!auth.isSignedIn) {
      const cart = localStorage.getItem("products");
      if (cart) {
        setProducts(JSON.parse(cart));
      }
      return;
    }

    if (data) {
      setDescription(data?.shoppingSession?.description || "");
      const convertData: CartProductProps[] = [];
      data.cartItems.forEach((cartItem: any) => {
        const product: CakeProduct = JSON.parse(cartItem.productJson);
        const selectedPrice = product?.productVariants.findIndex(
          (item) => item.variant.id === cartItem.variantId
        );
        convertData.push({
          product,
          selectedPrice,
          quantity: cartItem.quantity,
        });
      });
      setProducts(convertData);
    } else {
      setProducts([]);
    }
  }, [data, isLoading]);
  const onUpdateQuantity = (
    productId: string,
    selectedPrice: number,
    isIncrease: boolean
  ) => {
    const newProducts = products.map((item, index) => {
      if (
        item.product.id === productId &&
        item.selectedPrice === selectedPrice
      ) {
        const newQuantity = isIncrease ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setProducts(newProducts);
  };

  const onDeleteItem = (productId: string, selectedPrice: number) => {
    const newProducts = products.map((item, index) => {
      if (
        item.product.id === productId &&
        item.selectedPrice === selectedPrice
      ) {
        return {
          ...item,
          quantity: 0,
        };
      }
      return item;
    });
    setProducts(newProducts);
  };

  const deleteAllCart = () => {
    const newProducts = products.map((item, index) => {
      return {
        ...item,
        quantity: 0,
      };
    });
    setProducts(newProducts);
  };

  const updateCart = async () => {
    startTransition(async () => {
      if (products.length === 0) return;
      if (auth.isSignedIn) {
        const payload: any = {
          shoppingSession: {
            description,
            userId: auth.userId,
          },
          type: "update",
          cartItems: [],
        };
        products.forEach((item) => {
          payload.cartItems.push({
            productId: item.product.id,
            quantity: item.quantity,
            variantId:
              item.product.productVariants[item.selectedPrice].variant.id,
          });
        });

        const res = await updateShoppingCart(payload);
        if (res?.code === 1) {
          toast("Thông báo", {
            description: "Cập nhật giỏ hàng thành công !",
          });
        }
      } else {
        localStorage.setItem("products", JSON.stringify(products));
      }
    });
  };

  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => {
      return (
        acc +
        item.product.productVariants[item.selectedPrice].price * item.quantity
      );
    }, 0);
  }, [products]);
  return (
    <div className="p-[30px] mx-auto w-[1200px] max-w-full">
      <h3 className="text-[24px] font-bold text-[#333]">GIỎ HÀNG</h3>
      <hr />
      {isLoading ? (
        <>
          <CartItemLoading />
          <CartItemLoading />
          <CartItemLoading />
        </>
      ) : products.length > 0 ? (
        <div>
          <div className="hidden sm:flex items-center py-5">
            <p className="flex-1 text-center">Thông tin chi tiết sản phẩm</p>
            <div className="flex-1 flex justify-between">
              <p>Đơn giá</p>
              <p>Số lượng</p>
              <p>Tổng giá</p>
            </div>
          </div>
          <hr />
          {/* Cart item */}
          <div>
            {products.map(
              (item) =>
                item.quantity > 0 && (
                  <div key={item.product.id + item.selectedPrice}>
                    <div className="flex mt-5">
                      <div className="flex-1 flex items-center gap-5">
                        <Link href="#" className="size-[160px] block relative">
                          <Image src={item.product.thumbnail} alt="" fill />
                        </Link>
                        <p className="flex flex-col gap-5">
                          <Link
                            href=""
                            className="text-[#3d3d1a] text-[20px] font-bold hover:text-[#733131]"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-[#666] flex flex-col gap-1">
                            {
                              item.product.productVariants[item.selectedPrice]
                                .variant.variantValue
                            }
                            <span
                              onClick={() =>
                                onDeleteItem(
                                  item.product.id,
                                  item.selectedPrice
                                )
                              }
                              className="hover:underline cursor-pointer"
                            >
                              Xóa
                            </span>
                          </span>
                        </p>
                      </div>
                      <div className="flex-1 flex-col gap-3 sm:gap-0 sm:flex-row flex justify-center sm:justify-between items-center">
                        <p className="text-[22px] text-[#333] font-bold">
                          {formatNumberToVND(
                            item.product.productVariants[item.selectedPrice]
                              .price
                          )}
                        </p>
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm hidden sm:inline-block text-[#3d1a1a] font-bold">
                            Số lượng
                          </span>
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.selectedPrice,
                                  false
                                )
                              }
                              className="w-9 py-1 rounded-tl-md rounded-bl-md border border-[#ddd]"
                            >
                              -
                            </button>
                            <input
                              className="py-1 border-t border-b border-[#ddd] w-9 px-[1px] text-center bg-transparent"
                              value={item.quantity}
                              type="number"
                              pattern="[0-9]*"
                              readOnly
                            />

                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.selectedPrice,
                                  true
                                )
                              }
                              className="w-9 py-1 rounded-tr-md rounded-br-md border border-[#ddd]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p className="text-[22px] text-[#333] font-bold sm:basis-[200px] text-right">
                          {formatNumberToVND(
                            item.product.productVariants[item.selectedPrice]
                              .price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>

                    <hr className="mt-5" />
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <p className="text-center py-10">
          Không có sản phẩm nào trong giỏ hàng
        </p>
      )}
      <hr />

      {/* Button */}
      {products.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 py-[30px]">
          <div className="flex-[2.5] pr-10">
            <p className="font-bold text-[#333] mb-1">Ghi chú giao hàng:</p>
            <textarea
              className="block w-full outline-none border border-[#ddd] p-2"
              rows={4}
              name=""
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <span className="text-[22px] text-[#333] font-bold">
              <span className="text-sm font-normal">Tổng tiền</span>{" "}
              {formatNumberToVND(totalPrice)}
            </span>
            <span className=" text-[#333] italic">Vận chuyển</span>
            <div className="mt-5 flex items-center gap-3 *:rounded-[4px]">
              <Button
                onClick={updateCart}
                className="min-w-[100px]"
                variant="primary"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Cập nhật"}
              </Button>
              <Button onClick={deleteAllCart} variant="primary">
                Xóa giỏ hàng
              </Button>
              <Button variant="primary">
                <Link
                  href={{
                    pathname: "/checkout",
                    query: `description=${description}`,
                  }}
                >
                  Thanh toán
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
