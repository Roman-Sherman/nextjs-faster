"use client";
import { useActionState, useEffect } from "react";
import { addToCart } from "@/lib/actions";
import { useSWRConfig } from "swr";

export function AddToCartForm({ productSlug }: { productSlug: string }) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    mutate("/api/cart");
  }, [message]);
  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <input type="hidden" name="productSlug" value={productSlug} />
      <button
        type="submit"
        className="max-w-[150px] rounded-[2px] bg-green-800 px-5 py-1 text-sm font-semibold text-white"
      >
        Add to cart
      </button>
      {isPending && <p>Adding to cart...</p>}
      {!isPending && message && <p>{message}</p>}
    </form>
  );
}
