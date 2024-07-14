"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="w-full px-5">
      <ul
        className={cn(
          "*:text-[13px] *:font-[600] flex items-center gap-5 *:border-b-[3px] *:border-transparent *:cursor-pointer",
          "*:text-white"
        )}
      >
        <li className="!border-[#C0C906]">
          <Link href="/">TRANG CHỦ</Link>
        </li>
        <li className="hover:border-[#C0C906]">
          <Link href="#">BÁNH SINH NHẬT</Link>
        </li>
        <li className="hover:border-[#C0C906]">
          <Link href="#">BÁNH MỲ & BÁNH MẶN</Link>
        </li>
        <li className="hover:border-[#C0C906]">
          <Link href="#">COOKIES & MINICAKE</Link>
        </li>
        <li className="hover:border-[#C0C906]">
          <Link href="#">TIN TỨC</Link>
        </li>
        <li className="hover:border-[#C0C906]">
          <Link href="#">KHUYẾN MẠI</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
