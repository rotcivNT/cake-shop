import { cn } from "@/lib/utils";
import { getAllCategory } from "@/services/categoryService";
import { CategoryProps } from "@/types/category";
import Link from "next/link";

async function Navbar() {
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
        {rootCategory.map((item) => (
          <li key={item.id} className="hover:border-[#C0C906] uppercase">
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
    </nav>
  );
}

export default Navbar;
