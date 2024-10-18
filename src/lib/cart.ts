import { cookies } from "next/headers";
import { type CartItem, cartCookieSchema } from "@/lib/utils";

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

  console.log(cart.value);

  return cartCookieSchema.parse(JSON.parse(cart.value));
}
