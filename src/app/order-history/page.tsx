import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order | NextMaster",
};

export default function Page() {
  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <h1 className="font-futura text-2xl text-green-800">ORDER HISTORY</h1>
        <p className="font-semibold text-green-800">
          Log in to view order history
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
