import { getUser } from "@/lib/queries";
import dynamic from "next/dynamic";

const SignInSignUp = dynamic(
  () => import("./auth.client").then((mod) => mod.SignInSignUp),
  {
    loading: () => <p>Loading sign in options...</p>,
  },
);

const SignOut = dynamic(
  () => import("./auth.client").then((mod) => mod.SignOut),
  {
    loading: () => <p>Loading sign out...</p>,
  },
);

const LoginForm = dynamic(
  () => import("./auth.client").then((mod) => mod.LoginForm),
  {
    loading: () => <p>Loading login form...</p>,
  },
);

export async function AuthServer() {
  const user = await getUser();

  if (!user) {
    return <SignInSignUp />;
  }
  return <SignOut username={user.username} />;
}

export async function PlaceOrderAuth() {
  const user = await getUser();

  if (user) {
    return null;
  }
  return (
    <>
      <p className="font-semibold text-green-800">Log in to place an order</p>
      <LoginForm />
    </>
  );
}
