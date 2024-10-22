import { CakeProduct } from "@/types/product";
import CheckoutProduct from "./CheckoutProduct";
import { CartProductProps } from "../cart/Cart";

interface IProps {
  products: CartProductProps[];
}

function CheckoutProductList({ products }: IProps) {
  return (
    <div className="space-y-3">
      {products.map((item) => (
        <CheckoutProduct
          product={item}
          key={item.product.id + item.selectedPrice}
        />
      ))}
    </div>
  );
}

export default CheckoutProductList;
