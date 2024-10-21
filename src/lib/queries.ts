import { cookies } from "next/headers";
import { verifyToken } from "./session";
import {
  categories,
  products,
  subcategories,
  subcollections,
  users,
} from "@/db/schema";
import { db } from "@/db";
import { eq, and, count } from "drizzle-orm";
import { unstable_cache } from "./unstable-cache";

export async function getUser() {
  const sessionCookie = (await cookies()).get("session");
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== "number"
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export const getProductsForSubcategory = unstable_cache(
  (subcategorySlug: string) =>
    db.query.products.findMany({
      where: (products, { eq, and }) =>
        and(eq(products.subcategory_slug, subcategorySlug)),
      orderBy: (products, { asc }) => asc(products.slug),
    }),
  ["subcategory-products"],
  {
    revalidate: 600,
  },
);

export const getCollections = unstable_cache(
  () =>
    db.query.collections.findMany({
      with: {
        categories: true,
      },
      orderBy: (collections, { asc }) => asc(collections.name),
    }),
  ["collections"],
  {
    revalidate: 600,
  },
);

export const getProductDetails = unstable_cache(
  (productSlug: string) =>
    db.query.products.findFirst({
      where: (products, { eq }) => eq(products.slug, productSlug),
    }),
  ["product"],
  {
    revalidate: 600,
  },
);

export const getSubcategory = unstable_cache(
  (subcategorySlug: string) =>
    db.query.subcategories.findFirst({
      where: (subcategories, { eq }) => eq(subcategories.slug, subcategorySlug),
    }),
  ["subcategory"],
  {
    revalidate: 600,
  },
);

export const getCategory = unstable_cache(
  (categorySlug: string) =>
    db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.slug, categorySlug),
      with: {
        subcollections: {
          with: {
            subcategories: true,
          },
        },
      },
    }),
  ["category"],
  {
    revalidate: 600,
  },
);

export const getCollectionDetails = unstable_cache(
  async (collectionName: string) =>
    db.query.collections.findMany({
      with: {
        categories: true,
      },
      where: (collections, { eq }) => eq(collections.name, collectionName),
      orderBy: (collections, { asc }) => asc(collections.name),
    }),
  ["collection"],
  {
    revalidate: 600,
  },
);

export const getProductCount = unstable_cache(
  () => db.select({ count: count() }).from(products),
  ["total-product-count"],
  {
    revalidate: 600,
  },
);

// could be optimized by storing category slug on the products table
export const getCategoryProductCount = unstable_cache(
  (categorySlug: string) =>
    db
      .select({ count: count() })
      .from(categories)
      .leftJoin(
        subcollections,
        eq(categories.slug, subcollections.category_slug),
      )
      .leftJoin(
        subcategories,
        eq(subcollections.id, subcategories.subcollection_id),
      )
      .leftJoin(products, eq(subcategories.slug, products.subcategory_slug))
      .where(eq(categories.slug, categorySlug)),
  ["category-product-count"],
  {
    revalidate: 600,
  },
);

export const getSubcategoryProductCount = unstable_cache(
  (subcategorySlug: string) =>
    db
      .select({ count: count() })
      .from(products)
      .where(eq(products.subcategory_slug, subcategorySlug)),
  ["subcategory-product-count"],
  {
    revalidate: 600,
  },
);
