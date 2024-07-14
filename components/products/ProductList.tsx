import { cn } from "@/lib/utils";
import ProductItem from "./ProductItem";
import { CakeProduct } from "@/types/product";

interface IProps {
  products: CakeProduct[];
}

function ProductList({ products }: IProps) {
  return (
    <div className={cn("flex px-[30px] flex-wrap")}>
      {products &&
        products.map((product) => (
          <div className="basis-1/4 p-3" key={product.id}>
            <ProductItem product={product} />
          </div>
        ))}
    </div>
  );
}

export default ProductList;
