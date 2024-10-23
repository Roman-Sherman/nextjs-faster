"use client";
import { Link } from "@/components/ui/link";
import Image from "next/image";
import { removeFromCart } from "@/lib/actions";
import { X } from "lucide-react";
import { useCart } from "../../components/ui/cart-context";
import { CartItem as CartItemType } from "../../lib/cart";
import { revalidatePath } from "next/cache";

export function CartItems() {
  const { cart } = useCart();
  return (
    <>
      {cart.length > 0 && (
        <div className="pb-4">
          <p className="font-semibold text-green-700">Delivers in 2-4 weeks</p>
          <p className="text-sm text-gray-500">Need this sooner?</p>
        </div>
      )}
      {cart.length > 0 ? (
        <div className="flex flex-col space-y-10">
          {cart.map((item) => (
            <CartItem key={item.product.slug} item={item} />
          ))}
        </div>
      ) : (
        <p>No items in cart</p>
      )}
    </>
  );
}

function CartItem({ item }: { item: CartItemType }) {
  const { removeFromCart: optimisticRemoveFromCart } = useCart();
  // limit to 2 decimal places
  const cost = (Number(item.product.price) * item.quantity).toFixed(2);
  return (
    <div className="flex flex-row items-center justify-between border-t border-gray-200 pt-4">
      <Link
        prefetch={true}
        href={`/products/${item.categorySlug}/${item.product.subcategory_slug}/${item.product.slug}`}
      >
        <div className="flex flex-row space-x-2">
          <div className="flex h-24 w-24 items-center justify-center bg-gray-100">
            <Image
              loading="eager"
              decoding="sync"
              src={item.product.image_url ?? "/placeholder.svg"}
              alt="Product"
              width={256}
              height={256}
              quality={80}
            />
          </div>
          <div className="max-w-[100px] flex-grow sm:max-w-full">
            <h2 className="font-semibold">{item.product.name}</h2>
            <p className="text-sm md:text-base">{item.product.description}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center md:space-x-10">
        <div className="flex flex-col-reverse md:flex-row md:gap-4">
          <p>{item.quantity}</p>
          <div className="flex md:block">
            <div className="min-w-8 text-sm md:min-w-24 md:text-base">
              <p>${Number(item.product.price).toFixed(2)} each</p>
            </div>
          </div>
          <div className="min-w-24">
            <p className="font-semibold">${cost}</p>
          </div>
        </div>
        <form
          action={async () => {
            optimisticRemoveFromCart(item.product.slug);
            try {
              await removeFromCart(item.product.slug);
            } catch (error) {
              // TODO: investigate better way of revalidating
              revalidatePath("/order");
            }
          }}
        >
          <button type="submit">
            <input type="hidden" name="productSlug" value={item.product.slug} />
            <X className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function TotalCost() {
  const { cart } = useCart();
  const totalCost = cart.reduce(
    (acc, item) => acc + item.quantity * Number(item.product.price),
    0,
  );

  return <span> ${totalCost.toFixed(2)}</span>;
}
