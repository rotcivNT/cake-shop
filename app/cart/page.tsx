import Cart from "@/components/cart/Cart";
import "@/components/products/styles.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng của bạn",
  description:
    "Xem xét và quản lý các mặt hàng trong giỏ hàng của bạn. Thanh toán an toàn, cập nhật dễ dàng và có sẵn các ưu đãi độc quyền.",
  keywords:
    "giỏ hàng, thanh toán, cửa hàng trực tuyến, thương mại điện tử, thanh toán an toàn",
};

function CartPage() {
  return (
    <div>
      <div className="heading-wrapper relative h-[300px] py-[50px] flex justify-center items-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-[0]" />
        <p className="text-white text-[32px] font-bold relative z-[1]">
          YOUR SHOPPING CART
        </p>
      </div>
      <Cart />
    </div>
  );
}

export default CartPage;
