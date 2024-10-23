"use client";

import { revalidatePath } from "next/cache";
import { addToCart } from "../lib/actions";
import { useCart } from "./ui/cart-context";

export function AddToCartForm({ productSlug }: { productSlug: string }) {
  const { addToCart: optimisticAddToCart } = useCart();
  return (
    <form
      className="flex flex-col gap-2"
      action={async (data) => {
        optimisticAddToCart(productSlug);
        try {
          await addToCart(data);
        } catch (error) {
          // TODO: investigate better way of revalidating
          revalidatePath("/");
        }
      }}
    >
      <input type="hidden" name="productSlug" value={productSlug} />
      <button
        type="submit"
        className="max-w-[150px] rounded-[2px] bg-green-800 px-5 py-1 text-sm font-semibold text-white"
      >
        Add to cart
      </button>
      {/* {isPending && <p>Adding to cart...</p>}
      {!isPending && message && <p>{message}</p>} */}
    </form>
  );
}
