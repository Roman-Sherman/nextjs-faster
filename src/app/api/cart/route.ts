import { db } from "@/db";
import { getCart } from "@/lib/cart";
import { products } from "@/db/schema";
import { inArray } from "drizzle-orm";

export const GET = async (req: Request) => {
  const cart = await getCart();
  const dbProducts = await db
    .select()
    .from(products)
    .where(
      inArray(
        products.slug,
        cart.map((item) => item.productSlug),
      ),
    );
  return new Response(
    JSON.stringify({
      cart: cart.flatMap((item) => {
        const product = dbProducts.find((p) => p.slug === item.productSlug);
        if (!product) {
          return [];
        } else {
          return [
            {
              ...product,
              quantity: item.quantity,
            },
          ];
        }
      }),
    }),
  );
};
