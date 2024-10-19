import { getUser } from "@/lib/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History",
};

export default async function Page() {
  const user = await getUser();
  return (
    <main className="min-h-screen p-4">
      <h1 className="w-full border-b-2 border-green-800 text-left font-futura text-2xl text-green-800">
        Order History
      </h1>
      <div className="mx-auto flex max-w-md flex-col gap-4 text-black">
        {user ? (
          <p className="font-semibold text-black">You have no orders yet.</p>
        ) : (
          <p className="font-semibold text-black">
            Log in to view order history
          </p>
        )}
      </div>
    </main>
  );
}
