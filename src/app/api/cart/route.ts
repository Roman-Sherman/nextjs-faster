import { db } from "@/db";
import { getCart } from "@/lib/cart";

export const GET = async (req: Request) => {
  const cart = await getCart();

  const products = await db.query.products.findMany({
    where: (products, { inArray }) =>
      inArray(
        products.slug,
        cart.map((item) => item.productSlug),
      ),
    with: {
      subcategory: {
        with: {
          subcollection: true,
        },
      },
    },
  });

  const withQuantity = products.map((product) => ({
    ...product,
    quantity:
      cart.find((item) => item.productSlug === product.slug)?.quantity ?? 0,
  }));

  return new Response(
    JSON.stringify({
      cart: withQuantity,
    }),
  );
};
