import Cart from "@/components/cart/Cart";
import "@/components/products/styles.css";
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
