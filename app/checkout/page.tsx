import Checkout from "@/components/checkout/Checkout";
import "@/components/products/styles.css";

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
