import { CartProductProps } from "@/components/cart/Cart";
import { CategoryProps } from "@/types/category";
import { CakeProduct } from "@/types/product";
import { create, createStore } from "zustand";

interface CakeStoreState {
  products: CakeProduct[];
  setProducts: (products: CakeProduct[]) => void;
  cartProducts: CartProductProps[];
  setCartProducts: (products: CartProductProps[]) => void;
}

export const useCakeStore = create<CakeStoreState>()(
  (set): CakeStoreState => ({
    products: [],
    setProducts: (products: CakeProduct[]) => set({ products }),
    cartProducts: [],
    setCartProducts: (cartProducts: CartProductProps[]) =>
      set({ cartProducts }),
  })
);
