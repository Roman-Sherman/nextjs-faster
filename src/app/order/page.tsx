import { LoginForm } from "@/components/login-form";
import { getCart } from "@/lib/cart";
import { X } from "lucide-react";
import type { CartItem } from "@/lib/cart";
import Image from "next/image";
import { db } from "@/db";
import { removeFromCart } from "@/lib/actions";
import { products } from "@/db/schema";
import { inArray } from "drizzle-orm";
import Link from "next/link";

export default async function Page() {
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

  const totalCost = cart.reduce(
    (acc, item) =>
      acc +
      item.quantity *
        (Number(dbProducts.find((p) => p.slug === item.productSlug)?.price) ??
          0),
    0,
  );
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto p-3">
        <div className="flex items-center justify-between border-b border-gray-200">
          <h1 className="font-futura text-2xl text-green-800">Order</h1>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-4">
          <div className="col-span-2">
            {cart.length > 0 && (
              <div className="pb-4">
                <p className="font-semibold text-green-700">
                  Delivers in 2-4 weeks
                </p>
                <p className="text-sm text-gray-500">Need this sooner?</p>
              </div>
            )}
            {cart.length > 0 ? (
              <div className="flex flex-col space-y-10">
                {cart.map((item) => (
                  <CartItem key={item.productSlug} item={item} />
                ))}
              </div>
            ) : (
              <p>No items in cart</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded bg-gray-100 p-4">
              <p className="font-semibold">
                Merchandise ${totalCost.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Applicable shipping and tax will be added.
              </p>
            </div>
            <p className="font-semibold text-green-800">
              Log in to place an order
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}

async function CartItem({ item }: { item: CartItem }) {
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, item.productSlug),
    with: {
      subcategory: {
        with: {
          subcollection: true,
        },
      },
    },
  });
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
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center space-x-10">
        <p>{item.quantity}</p>
        <div className="min-w-24">
          <p>${product.price} each</p>
        </div>
        <div className="min-w-24">
          <p className="font-semibold">
            ${Number(product.price) * item.quantity}
          </p>
        </div>
        <form action={removeFromCart}>
          <button type="submit">
            <input type="hidden" name="productSlug" value={product.slug} />
            <X className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
