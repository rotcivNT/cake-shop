import CheckoutStatus from "@/components/checkout/CheckoutStatus";
import "@/components/products/styles.css";

function CheckoutStatusPage() {
  return (
    <div>
      <div className="heading-wrapper relative h-[300px] py-[50px] flex justify-center items-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-[0]" />
        <p className="text-white text-[32px] font-bold relative z-[1]">
          KẾT QUẢ THANH TOÁN
        </p>
      </div>
      <CheckoutStatus />
    </div>
  );
}

export default CheckoutStatusPage;
