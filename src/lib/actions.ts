"use server";

import { Product } from "../db/schema";
import { getCart, updateCart } from "./cart";

export async function addToCart(product: Product, categorySlug: string) {
  const prevCart = await getCart();
  const productSlug = product.slug;
  const itemAlreadyExists = prevCart.find(
    (item) => item.product.slug === productSlug,
  );
  if (itemAlreadyExists) {
    const newQuantity = itemAlreadyExists.quantity + 1;
    const newCart = prevCart.map((item) => {
      if (item.product.slug === productSlug) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    await updateCart(newCart);
  } else {
    const newCart = [
      ...prevCart,
      {
        product,
        categorySlug,
        quantity: 1,
      },
    ];
    await updateCart(newCart);
  }

  return "Item added to cart";
}

export async function removeFromCart(productSlug: string) {
  const prevCart = await getCart();
  const itemAlreadyExists = prevCart.find(
    (item) => item.product.slug === productSlug,
  );
  if (!itemAlreadyExists) {
    return;
  }
  const newCart = prevCart.filter((item) => item.product.slug !== productSlug);
  await updateCart(newCart);
}
