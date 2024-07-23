import { cn } from "@/lib/utils";
import { updateShoppingCart } from "@/services/shoppingService";
import { CakeProduct } from "@/types/product";
import { createMixedString } from "@/utils/createMixString";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

interface IProps {
  product: CakeProduct;
}

export default function ProductQuickview({ product }: IProps) {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const auth = useAuth();
  const [isPending, startTransition] = useTransition();

  const mixId = useMemo(() => {
    if (product) return createMixedString(product.name);
    return "";
  }, [product]);
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
          toast("Thông báo", {
            description: "Đã thêm sản phẩm vào giỏ hàng",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="p-[30px] flex items-start w-full max-w-[1200px] mx-auto">
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
            <span className="text-sm text-[#3d1a1a] font-bold">Kích thước</span>
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
              {/* <li className="px-3 py-1 rounded-[10px] border border-[#ddd]">
                19cm
              </li>
              <li className="px-3 py-1 rounded-[10px] border border-[#ddd]">
                19cm
              </li>
              <li className="px-3 py-1 rounded-[10px] border border-red-500">
                19cm
              </li> */}
            </ul>
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
          <div className="mt-5">
            <button
              onClick={onAddToCart}
              className="py-[10px] transition-all duration-200 px-4 rounded-[10px] text-white bg-[#3d1a1a] font-bold text-sm mr-3 hover:bg-[#c0c906]"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "THÊM VÀO GIỎ HÀNG"
              )}
            </button>
            <Link
              href={`/products/${product.id}`}
              className="inline-block py-[10px] px-4 rounded-[10px] text-white bg-[#c0c906] font-bold text-sm"
            >
              XEM CHI TIẾT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
