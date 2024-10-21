import { cookies } from "next/headers";
import { verifyToken } from "./session";
import { products, users } from "@/db/schema";
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


export const getProductsForSubcategory =  unstable_cache(
  (subcategory) =>
    db.query.products.findMany({
      where: (products, { eq, and }) =>
        and(eq(products.subcategory_slug, subcategory)),
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
  (product) =>
    db.query.products.findFirst({
      where: (products, { eq }) => eq(products.slug, product),
    }),
  ["product"],
  {
    revalidate: 600,
  },
);

export const getSubcategory = unstable_cache(
  (subcategory) =>
    db.query.subcategories.findFirst({
      where: (subcategories, { eq }) =>
        eq(subcategories.slug, subcategory),
    }),
  ["subcategory"],
  {
    revalidate: 600,
  },
)

export const getCategory = unstable_cache(
  (category) => db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.slug, category),
    with: {
      subcollections: {
        with: {
          subcategories: true,
        },
      },
    }
  }),
  ["category"],
  {
    revalidate: 600,
  },
);


export const getCollectionDetails = unstable_cache(
  async (cn) =>
    db.query.collections.findMany({
      with: {
        categories: true,
      },
      where: (collections, { eq }) =>
        eq(collections.name, decodeURIComponent(cn)),
      orderBy: (collections, { asc }) => asc(collections.name),
    }),
  ["collection"],
  {
    revalidate: 600,
  },
);

export const  getProductCount = unstable_cache(
  () => db.select({ count: count() }).from(products),
  ["total-product-count"],
  {
    revalidate: 600,
  },
);