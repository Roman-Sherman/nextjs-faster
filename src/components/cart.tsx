"use client";

import useSWR from "swr";
import { cartCookieSchema, cartSchema } from "@/lib/utils";

export function Cart() {
  const { data, isLoading, error } = useSWR("/api/cart", (...args) =>
    fetch(...args)
      .then((res) => res.json())
      .then((data) => cartSchema.parse(data)),
  );
  console.log(error);
  if (isLoading || !data || data.cart.length == 0) {
    return null;
  }
  return (
    <div className="absolute -right-3 -top-1 rounded-full bg-yellow-300 px-1 text-xs text-green-800">
      {data.cart.length}
    </div>
  );
}
