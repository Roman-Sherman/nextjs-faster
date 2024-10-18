"use client";
import { removeFromCart } from "@/lib/actions";
import { useSWRConfig } from "swr";
import { X } from "lucide-react";
import { useActionState, useEffect } from "react";

export function RemoveFromCartForm({ productSlug }: { productSlug: string }) {
  const [message, formAction, isPending] = useActionState(removeFromCart, null);
  console.log({ message, formAction, isPending });
  const { mutate } = useSWRConfig();
  useEffect(() => {
    mutate("/api/cart");
  }, [message]);
  return (
    <form action={formAction}>
      <button type="submit">
        <input type="hidden" name="productSlug" value={productSlug} />
        <X className="h-6 w-6" />
      </button>
    </form>
  );
}
