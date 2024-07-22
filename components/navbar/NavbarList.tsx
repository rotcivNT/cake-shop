"use client";
import { cn } from "@/lib/utils";
import { CategoryProps } from "@/types/category";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface IProps {
  rootCategory: CategoryProps[];
}

export default function NavbarList({ rootCategory }: IProps) {
  const { cname } = useParams();

  return (
    <ul
      className={cn(
        "*:text-[13px] *:font-[600] flex items-center gap-5 *:border-b-[3px] *:border-transparent *:cursor-pointer",
        "*:text-white"
      )}
    >
      <li className={!cname ? "!border-[#C0C906]" : ""}>
        <Link href="/">TRANG CHỦ</Link>
      </li>
      {rootCategory.map((item) => (
        <li
          key={item.id}
          className={
            cname &&
            decodeURIComponent(cname[0])
              .toLowerCase()
              .includes(item.name.toLowerCase())
              ? "!border-[#C0C906] uppercase"
              : "hover:border-[#C0C906] uppercase"
          }
        >
          <Link href={`/collections/${item.name}`}>{item.name}</Link>
        </li>
      ))}
      <li className="hover:border-[#C0C906]">
        <Link href="#">TIN TỨC</Link>
      </li>
      <li className="hover:border-[#C0C906]">
        <Link href="#">KHUYẾN MẠI</Link>
      </li>
    </ul>
  );
}
