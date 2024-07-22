import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function CartMobileButton() {
  return (
    <Link className="inline-flex gap-3 items-center sm:hidden" href="/cart">
      <p className="size-9 flex justify-center items-center bg-[#fff] rounded-full">
        <ShoppingBasket color="#3D1A1A" size={16} />
      </p>
    </Link>
  );
}
