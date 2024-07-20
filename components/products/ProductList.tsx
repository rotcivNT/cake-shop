import { CakeProduct } from "@/types/product";
import ProductItem from "./ProductItem";

interface IProps {
  products: CakeProduct[];
  itemPerRow?: number;
}

function ProductList({ products, itemPerRow = 4 }: IProps) {
  const colStyle =
    itemPerRow === 3
      ? "grid-cols-[repeat(auto-fill,minmax(min(220px,100%),33.33333%))]"
      : "grid-cols-[repeat(auto-fill,minmax(min(220px,100%),25%))]";
  return (
    <div className={`grid ${colStyle} justify-center`}>
      {products &&
        products.map((product) => (
          <div className="p-3" key={product.id}>
            <ProductItem product={product} />
          </div>
        ))}
    </div>
  );
}

export default ProductList;
