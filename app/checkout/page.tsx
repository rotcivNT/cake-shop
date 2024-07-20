import Checkout from "@/components/checkout/Checkout";
import "@/components/products/styles.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh toán",
  description:
    "Hoàn tất đơn hàng của bạn với các phương thức thanh toán an toàn và tiện lợi.",
  keywords:
    "thanh toán, giỏ hàng, đặt hàng, phương thức thanh toán, thanh toán an toàn, giao dịch trực tuyến",
};
function CheckoutPage() {
  return (
    <div>
      <div className="heading-wrapper relative h-[300px] py-[50px] flex justify-center items-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-[0]" />
        <p className="text-white text-[32px] font-bold relative z-[1]">
          CHECK OUT
        </p>
      </div>
      <Checkout />
    </div>
  );
}

export default CheckoutPage;
