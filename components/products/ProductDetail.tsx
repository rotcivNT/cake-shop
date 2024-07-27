/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { cn } from "@/lib/utils";
import { getProductById } from "@/services/productServices";
import {
  getShoppingCart,
  updateShoppingCart,
} from "@/services/shoppingService";
import { CakeProduct } from "@/types/product";
import { createMixedString } from "@/utils/createMixString";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import ProductDetailLoading from "./ProductDetailLoading";
import "./styles.css";
import { Loader2 } from "lucide-react";
import { useSWRConfig } from "swr";
import Link from "next/link";

function ProductDetail() {
  const productId = usePathname().split("/products/")[1];
  const { data, isLoading, error } = useSWR(productId, getProductById);
  const [isPending, startTransition] = useTransition();
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const product: CakeProduct = useMemo(() => {
    if (!isLoading && !error && data) return data;
  }, [data, error, isLoading]);
  const { mutate } = useSWRConfig();
  const mixId = useMemo(() => {
    if (product) return createMixedString(product.name);
    return "";
  }, [product]);
  const isHasSize = useMemo(() => {
    return (
      product &&
      product.productVariants.length > 0 &&
      product.productVariants[0].variant.variantValue != "0"
    );
  }, [product]);

  const auth = useAuth();
  const onAddToCart = () => {
    startTransition(async () => {
      if (!auth.isSignedIn) {
        const storeData = {
          product,
          selectedPrice,
          quantity,
        };
        const productsStorage: any[] = JSON.parse(
          localStorage.getItem("products") || "[]"
        );
        const existedProductIndex = productsStorage.findIndex(
          (item) =>
            item.product.id === storeData.product.id &&
            item.selectedPrice === storeData.selectedPrice
        );
        if (existedProductIndex !== -1) {
          productsStorage[existedProductIndex].quantity += storeData.quantity;
        } else {
          productsStorage.push(storeData);
        }
        localStorage.setItem("products", JSON.stringify(productsStorage));
        toast("Thông báo", {
          description: "Đã thêm sản phẩm vào giỏ hàng",
        });
        return;
      }

      if (auth.isSignedIn) {
        const payload = {
          type: "add",
          shoppingSession: {
            userId: auth.userId,
          },
          cartItems: [
            {
              productId: product.id,
              quantity,
              variantId: product.productVariants[selectedPrice].variant.id,
            },
          ],
        };

        const res = await updateShoppingCart(payload);
        if (res?.code === 1) {
          mutate(`get-cart/${auth.userId}`, async () => {
            const newData = await getShoppingCart(`get-cart/${auth.userId}`);
            return newData;
          });
          toast("Thông báo", {
            description: "Đã thêm sản phẩm vào giỏ hàng",
          });
        }
      }
    });
  };

  if (isLoading) return <ProductDetailLoading />;
  return (
    <>
      <div className="heading-wrapper relative h-[300px] py-[50px] flex justify-center items-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-[0]" />
        <p className="text-white text-[32px] font-bold relative z-[1]">
          {product.name}
        </p>
      </div>
      <div className="p-[30px] flex items-start max-w-[1200px] mx-auto">
        <div className="basis-1/3 w-[33.333333%] border border-[#ddd] bg-white rounded-[10px] p-3">
          <div className="size-full pt-[100%] relative">
            <Image
              fill
              src={product.thumbnail}
              alt=""
              className="rounded-[10px]"
            />
          </div>
        </div>
        <div className="basis-2/3 p-7 ml-7 rounded-[10px] border border-[#ddd] bg-white">
          <p className="flex flex-col text-[#3d1a1a]">
            <span className="text-[18px] font-bold">{product.name}</span>
            <span className="text-sm">Mã sản phẩm: {mixId}</span>
          </p>
          <hr className="my-6" />
          <p className="text-[#3d1a1a]">
            Giá{" "}
            <span className="text-[18px] font-bold">
              {formatNumberToVND(product.productVariants[selectedPrice].price)}
            </span>
          </p>
          {/* Size */}
          <div className="my-5">
            {isHasSize && (
              <>
                <span className="text-sm text-[#3d1a1a] font-bold">
                  Kích thước
                </span>
                <ul className="flex items-center gap-3 mt-2 *:cursor-pointer">
                  {product.productVariants.map((item, index) => (
                    <li
                      key={item.variant.id}
                      onClick={() => setSelectedPrice(index)}
                      className={cn(
                        "px-3 py-1 rounded-[10px] border",
                        `${
                          selectedPrice === index
                            ? " border-red-500"
                            : " border-[#ddd]"
                        }`
                      )}
                    >
                      {item.variant.variantValue}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {/* Quantity */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#3d1a1a] font-bold">Số lượng</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((pre) => (pre > 1 ? pre - 1 : pre))}
                className="w-9 py-1 rounded-tl-md rounded-bl-md border border-[#ddd]"
              >
                -
              </button>
              <input
                className="py-1 border-t border-b border-[#ddd] w-9 text-center"
                value={quantity}
                type="number"
                pattern="[0-9]*"
                readOnly
              />

              <button
                onClick={() => setQuantity((pre) => pre + 1)}
                className="w-9 py-1 rounded-tr-md rounded-br-md border border-[#ddd]"
              >
                +
              </button>
            </div>
          </div>
          {/* Button */}
          <div className="mt-5 flex items-center">
            <button
              onClick={onAddToCart}
              className="py-[10px] justify-center flex h-10 min-w-[200px] transition-all duration-200 px-4 rounded-[10px] text-white bg-[#3d1a1a] font-bold text-sm mr-3 hover:bg-[#c0c906]"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "THÊM VÀO GIỎ HÀNG"
              )}
            </button>
            <Link
              href="/cart"
              className="py-[10px] px-4 rounded-[10px] text-white bg-[#c0c906] font-bold text-sm"
            >
              MUA NGAY
            </Link>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-[30px] max-w-[1200px] mx-auto">
        <p className="py-3 px-9 bg-[#3d1a1a] text-[#c0c906] rounded-tl-[10px] rounded-tr-[10px] inline-block">
          MÔ TẢ CHUNG
        </p>
        <p className="text-[#333] border border-[#ddd] rounded-[10px] rounded-tl-none bg-white pl-3 py-3">
          Thành phần chính: - Gato - Kem phomai vị coffee - Cacao. Bánh làm từ 3
          lớp gato TRẮNG xen giữa 3 lớp kem TƯƠI PHOMAI, VỊ COFFEE. Bên ngoài
          phủ 1 lớp bột cacao VÀ DECOR HOA QUẢ.{" "}
        </p>
      </div>

      {/* Related Product */}
      <div className="mb-[30px]">
        <h3 className="text-[32px] text-[#c0c906] font-bold text-center">
          CÓ THỂ BẠN THÍCH
        </h3>
        <p className="text-[18px] text-[#3d1a1a] text-center font-bold">
          SẢN PHẨM CÙNG LOẠI
        </p>
        {/* <ProductList /> */}
      </div>
    </>
  );
}

export default ProductDetail;
