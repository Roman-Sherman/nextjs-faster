import { getCart } from "@/lib/cart";

export async function Cart() {
  const cart = await getCart();
  if (cart.length == 0) {
    return null;
  }
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="text-accent1 bg-accent2 absolute -right-3 -top-1 rounded-full px-1 text-xs">
      {totalQuantity}
    </div>
  );
}
