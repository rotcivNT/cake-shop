import { CakeProduct } from "./product";

export interface CategoryProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  products: CakeProduct[];
}
