import { getAllChildByParentId } from "@/services/categoryService";
import { CategoryProps } from "@/types/category";
import Link from "next/link";

interface IProps {
  categoryId: string;
  categoryName: string;
  rootCategoryName: string;
}

export default async function Menubar({
  categoryId,
  categoryName,
  rootCategoryName,
}: IProps) {
  const res = await getAllChildByParentId(categoryId);
  const sortedCategory: CategoryProps[] = [...res.data].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA - dateB;
  });

  return (
    <div className="border border-[#e6e6e6] rounded-[10px] overflow-hidden bg-white mt-3">
      <p className="bg-[#3d1a1a] text-white p-4 border-b border-[#e6e6e6] text-center font-bold">
        DANH MỤC MENU
      </p>
      <ul className="px-4 py-2">
        {sortedCategory.map((item) => (
          <li key={item.id}>
            <Link
              className="border-b border-transparent hover:border-[#3d1a1a] transition-all duration-200 py-2 text-[#333] font-bold text-sm block"
              href={`/collections/${rootCategoryName}/${item.name}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
