import { LoginForm } from "@/components/login-form";
import { getCart } from "@/lib/cart";
import { X } from "lucide-react";
import type { CartItem } from "@/lib/cart";
import Image from "next/image";
import { db } from "@/db";

export default async function Page() {
  const cart = await getCart();
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
              <div className="flex items-start space-x-4 border-t border-gray-200 pt-4">
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
                Merchandise $
                {/* {cart.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0,
                )} */}
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
  });
  if (!product) {
    return null;
  }
  return (
    <div className="flex flex-row items-center space-x-4 border-t border-gray-200 pt-4">
      <div className="flex h-24 w-24 items-center justify-center bg-gray-100">
        <Image src="/placeholder.svg" alt="Product" width={80} height={80} />
      </div>
      <div className="flex-grow">
        <h2 className="font-semibold">{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <input type="number" defaultValue={3} className="w-16" />
        <div className="text-right">
          <p>${product.price} each</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">
            ${Number(product.price) * item.quantity}
          </p>
          <X className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
