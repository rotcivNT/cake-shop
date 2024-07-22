import { getAllCategory } from "@/services/categoryService";
import { CategoryProps } from "@/types/category";
import NavbarList from "./NavbarList";

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
    <nav className="w-full px-5 hidden sm:block">
      <NavbarList rootCategory={rootCategory} />
    </nav>
  );
}

export default Navbar;
