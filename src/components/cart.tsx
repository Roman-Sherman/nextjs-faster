import { getCart } from "@/lib/cart";

export async function Cart() {
  const cart = await getCart();
  if (cart.length == 0) {
    return null;
  }
  return (
    <div className="absolute -right-3 -top-1 rounded-full bg-yellow-300 px-1 text-xs text-green-800">
      {cart.length}
    </div>
  );
}
