import logo from "@/components/images/logo.png";
import { Building2, PhoneCall, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../navbar/Navbar";
import AccountButton from "./AccountButton";
import MobileMenuTrigger from "./MobileMenuTrigger";
import Search from "./Search";
import CartMobileButton from "./CartMobileButton";

function Header() {
  return (
    <header className="sm:h-[150px] pb-5 sm:pb-0 bg-[rgba(91,50,54,0.9)]">
      <div className="w-[1200px] max-w-full h-full mx-auto items-center px-4 flex-wrap block sm:flex">
        <div className="flex-[1.5] flex gap-3 items-center">
          <Link href="/">
            <Image src={logo} alt="LOGO" />
          </Link>

          <Search />
        </div>
        <div className="flex justify-between items-center">
          <MobileMenuTrigger />
          <CartMobileButton />
        </div>
        <div className="flex-[3] items-center gap-3 justify-end hidden sm:flex">
          <a className="inline-flex gap-3 items-center" href="tel:0704462651">
            <p className="size-9 flex justify-center items-center bg-[#fff] rounded-full">
              <PhoneCall color="#3D1A1A" size={16} />
            </p>
            <span className="text-sm text-white">0704 462 651</span>
          </a>

          <a className="inline-flex gap-3 items-center" href="#">
            <p className="size-9 flex justify-center items-center bg-[#fff] rounded-full">
              <Building2 color="#3D1A1A" size={16} />
            </p>
            <span className="text-sm text-white">Hệ thống 15 cửa hàng</span>
          </a>

          <AccountButton />

          <Link className="inline-flex gap-3 items-center" href="/cart">
            <p className="size-9 flex justify-center items-center bg-[#fff] rounded-full">
              <ShoppingBasket color="#3D1A1A" size={16} />
            </p>
            <span className="text-sm text-white">Giỏ hàng</span>
          </Link>
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
