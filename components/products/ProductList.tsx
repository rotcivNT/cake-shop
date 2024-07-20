import { CakeProduct } from "@/types/product";
import ProductItem from "./ProductItem";

interface IProps {
  products: CakeProduct[];
  itemPerRow?: number;
}

function ProductList({ products, itemPerRow = 4 }: IProps) {
  let percent = 100 / itemPerRow;
  if (!Number.isInteger(percent)) {
    percent = +percent.toFixed(4);
  }

  return (
    <div
      className={`grid grid-cols-[repeat(auto-fill,minmax(min(220px,100%),${percent}%))] justify-center`}
    >
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
