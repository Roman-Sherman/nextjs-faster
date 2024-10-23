"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  use,
} from "react";
import { CartItem } from "@/lib/cart";
import { useOptimistic } from "react";

type CartContextType = {
  cart: CartItem[];
  addToCart: (productSlug: string) => void;
  removeFromCart: (productSlug: string) => void;
};

const reducer = (
  state: CartItem[],
  action: {
    type: "ADD" | "REMOVE";
    productSlug: string;
  },
) => {
  switch (action.type) {
    case "ADD":
      const item = state.find(
        (item) => item.productSlug === action.productSlug,
      );
      if (item) {
        return state.map((item) => {
          if (item.productSlug === action.productSlug) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        return [...state, { productSlug: action.productSlug, quantity: 1 }];
      }
    case "REMOVE":
      return state.filter((item) => item.productSlug !== action.productSlug);
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

  const addToCart = async (productSlug: string) => {
    updateOptimisticCart({ type: "ADD", productSlug });
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
