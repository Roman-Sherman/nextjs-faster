import { cookies } from "next/headers";
import { z } from "zod";

const cartSchema = z.array(
  z.object({
    id: z.string(),
    quantity: z.number(),
  }),
);

type CartItem = {
  id: string;
  quantity: number;
};

export async function updateCart(newItems: CartItem[]) {
  (await cookies()).set("cart", JSON.stringify(newItems), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getCart() {
  const cart = (await cookies()).get("cart");

  if (!cart) {
    return [];
  }

  return cartSchema.parse(JSON.parse(cart.value));
}
