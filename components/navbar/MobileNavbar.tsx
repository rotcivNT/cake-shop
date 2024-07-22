import Image from "next/image";
import Link from "next/link";
import logo from "@/components/images/logo.png";
import { X } from "lucide-react";
import Search from "../header/Search";
import { getAllCategory } from "@/services/categoryService";
import { CategoryProps } from "@/types/category";
import { cn } from "@/lib/utils";
import UserButtonMobile from "./UserButtonMobile";

export default async function MobileNavbar() {
  const data = await getAllCategory();
  let rootCategory: CategoryProps[] = data.data.filter(
    (item: CategoryProps) => item.parent === null
  );
  rootCategory = [...rootCategory].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA - dateB;
  });
  return (
    <nav className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[70%] h-dvh bg-white z-[99] space-y-4">
      <div className="flex justify-between px-4 items-center">
        <Link href="/">
          <Image src={logo} alt="LOGO" />
        </Link>
        {/* id: mobileNav -> MobileMenuTrigger component */}
        <label htmlFor="mobileNav">
          <X />
        </label>
      </div>
      <hr />
      <div className="px-3">
        <Search inputStyle="border border-[#e6e6e6] focus:border-[#cdcdcd]" />
      </div>

      <ul
        className={cn(
          "*:text-[13px] *:font-[600] *:border-b *:border-[#ddd] [&_li_a]:py-2  *:cursor-pointer px-3 space-y-2"
        )}
      >
        <li className="">
          <label htmlFor="mobileNav">
            <Link className="block" href="/">
              TRANG CHỦ
            </Link>
          </label>
        </li>
        {rootCategory.map((item) => (
          <li key={item.id} className="uppercase">
            <label htmlFor="mobileNav">
              <Link className="block" href={`/collections/${item.name}`}>
                {item.name}
              </Link>
            </label>
          </li>
        ))}
        <li className="">
          <label htmlFor="mobileNav">
            <Link className="block" href="#">
              TIN TỨC
            </Link>
          </label>
        </li>
        <li className="">
          <label htmlFor="mobileNav">
            <Link className="block" href="#">
              KHUYẾN MẠI
            </Link>
          </label>
        </li>
        <li className="border-none">
          <label htmlFor="mobileNav">
            <UserButtonMobile />
          </label>
        </li>
      </ul>
    </nav>
  );
}
