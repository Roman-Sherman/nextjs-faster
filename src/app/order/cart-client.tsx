"use client";

import { LoginForm } from "@/components/login-form";
import { getCart } from "@/lib/cart";
import type { CartItem } from "@/lib/utils";
import Image from "next/image";
import { db } from "@/db";
import { products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import Link from "next/link";
import { Metadata } from "next";
import { RemoveFromCartForm } from "@/components/remove-from-cart-form";
import useSWR from "swr";

export function CartClient() {
  const { data, isLoading, error } = useSWR("/api/cart", (...args) =>
    fetch(...args).then((res) => res.json()),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalCost = data.cart?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );
  return (
    <>
      {data.cart.length > 0 && (
        <div className="pb-4">
          <p className="font-semibold text-green-700">Delivers in 2-4 weeks</p>
          <p className="text-sm text-gray-500">Need this sooner?</p>
        </div>
      )}
      {data.cart.length > 0 ? (
        <div className="flex flex-col space-y-10">
          {data.cart.map((product) => (
            <CartItem key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p>No items in cart</p>
      )}
    </>
  );
}

function CartItem({ product }: { product: any }) {
  if (!product) {
    return null;
  }
  return (
    <div className="flex flex-row items-center justify-between space-x-4 border-t border-gray-200 pt-4">
      <Link
        href={`/products/${product.subcategory.subcollection.category_slug}/${product.subcategory.slug}/${product.slug}`}
      >
        <div className="flex flex-row space-x-4">
          <div className="flex h-24 w-24 items-center justify-center bg-gray-100">
            <Image
              src={product.image_url ?? "/placeholder.svg"}
              alt="Product"
              width={80}
              height={80}
              quality={65}
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center space-x-10">
        <p>{product.quantity}</p>
        <div className="min-w-24">
          <p>${product.price} each</p>
        </div>
        <div className="min-w-24">
          <p className="font-semibold">
            ${Number(product.price) * product.quantity}
          </p>
        </div>
        <RemoveFromCartForm productSlug={product.slug} />
      </div>
    </div>
  );
}
