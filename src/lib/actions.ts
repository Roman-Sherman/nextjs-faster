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
import { kv } from "@vercel/kv";
import { z } from "zod";

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

const searchResultSchema = z.array(
  z.object({
    href: z.string(),
    name: z.string(),
    slug: z.string(),
    image_url: z.string().nullable(),
    description: z.string(),
    price: z.string(),
    subcategory_slug: z.string(),
  }),
);

export async function searchProducts(searchTerm: string) {
  const kvKey = `search:${searchTerm}`;

  const rawCachedResults = await kv.get(kvKey);
  const parsedCachedResults = searchResultSchema.safeParse(rawCachedResults);
  if (parsedCachedResults.success) {
    return parsedCachedResults.data;
  }

  // cache miss, run the search

  let results;

  if (searchTerm.length <= 2) {
    // If the search term is short (e.g., "W"), use ILIKE for prefix matching
    results = await db
      .select()
      .from(products)
      .where(sql`${products.name} ILIKE ${searchTerm + "%"}`) // Prefix match
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
  } else {
    // For longer search terms, use full-text search with tsquery
    const formattedSearchTerm = searchTerm
      .split(" ")
      .filter((term) => term.trim() !== "") // Filter out empty terms
      .map((term) => `${term}:*`)
      .join(" & ");

    results = await db
      .select()
      .from(products)
      .where(
        sql`to_tsvector('english', ${products.name}) @@ to_tsquery('english', ${formattedSearchTerm})`,
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
  }

  const searchResults = results.map((item) => {
    const href = `/products/${item.categories.slug}/${item.subcategories.slug}/${item.products.slug}`;
    return {
      ...item.products,
      href,
    };
  });

  await kv.set(kvKey, searchResults, { ex: 60 * 60 }); // 1 hour

  return searchResults;
}
