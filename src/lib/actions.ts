"use server";
import { sql } from "drizzle-orm";
import { db } from "../db";
import {
  categories,
  products,
  subcategories,
  subcollection,
} from "../db/schema";
import { getCart, updateCart } from "./cart";

export async function addToCart(prevState: unknown, formData: FormData) {
  const prevCart = await getCart();
  const productSlug = formData.get("productSlug");
  if (typeof productSlug !== "string") {
    return;
  }
  const itemAlreadyExists = prevCart.find(
    (item) => item.productSlug === productSlug,
  );
  if (itemAlreadyExists) {
    const newQuantity = itemAlreadyExists.quantity + 1;
    const newCart = prevCart.map((item) => {
      if (item.productSlug === productSlug) {
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
        productSlug,
        quantity: 1,
      },
    ];
    await updateCart(newCart);
  }

  return "Item added to cart";
}

export async function removeFromCart(formData: FormData) {
  const prevCart = await getCart();
  const productSlug = formData.get("productSlug");
  if (typeof productSlug !== "string") {
    return;
  }
  const itemAlreadyExists = prevCart.find(
    (item) => item.productSlug === productSlug,
  );
  if (!itemAlreadyExists) {
    return;
  }
  const newCart = prevCart.filter((item) => item.productSlug !== productSlug);
  await updateCart(newCart);
}

export async function searchProducts(searchTerm: string) {
  const results = await db
    .select()
    .from(products)
    .where(
      sql`to_tsvector('english', ${products.name}) @@ plainto_tsquery('english', ${searchTerm})`,
    )
    .limit(5)
    .innerJoin(
      subcategories,
      sql`${products.subcategory_slug} = ${subcategories.slug}`,
    )
    .innerJoin(
      subcollection,
      sql`${subcategories.subcollection_id} = ${subcollection.id}`,
    )
    .innerJoin(
      categories,
      sql`${subcollection.category_slug} = ${categories.slug}`,
    );

  return results.map((item) => {
    const href = `/products/${item.categories.slug}/${item.subcategories.slug}/${item.products.slug}`;
    return {
      ...item.products,
      href,
    };
  });
}
