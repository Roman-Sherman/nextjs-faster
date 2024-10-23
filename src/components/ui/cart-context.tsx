"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  use,
  useEffect,
} from "react";
import { CartItem } from "@/lib/cart";
import { useOptimistic } from "react";
import { Product } from "../../db/schema";
import { validateCart } from "../../lib/actions";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, categorySlug: string) => void;
  removeFromCart: (productSlug: string) => void;
};

const reducer = (
  state: CartItem[],
  action:
    | {
        type: "ADD";
        categorySlug: string;
        product: Product;
      }
    | {
        type: "REMOVE";
        productSlug: string;
      },
) => {
  switch (action.type) {
    case "ADD":
      const item = state.find(
        (item) => item.product.slug === action.product.slug,
      );
      if (item) {
        return state.map((item) => {
          if (item.product.slug === action.product.slug) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        return [
          ...state,
          {
            product: action.product,
            categorySlug: action.categorySlug,
            quantity: 1,
          },
        ];
      }
    case "REMOVE":
      return state.filter((item) => item.product.slug !== action.productSlug);
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({
  children,
  getCart,
}: {
  children: ReactNode;
  getCart: Promise<CartItem[]>;
}) => {
  const initialCart = use(getCart);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    reducer,
  );

  // swr - revalidate any stale data after initial render
  useEffect(() => {
    const revalidate = async () => {
      await validateCart(initialCart);
    };
    revalidate();
  }, []);

  const addToCart = async (product: Product, categorySlug: string) => {
    updateOptimisticCart({ type: "ADD", product, categorySlug });
  };

  const removeFromCart = async (productSlug: string) => {
    updateOptimisticCart({ type: "REMOVE", productSlug });
  };

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      addToCart,
      removeFromCart,
    }),
    [optimisticCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
