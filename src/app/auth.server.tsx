import { getUser } from "@/lib/queries";
import { SignInSignUp, SignOut } from "./auth.client";

export async function AuthServer() {
  const user = await getUser();
  if (!user) {
    return <SignInSignUp />;
  }
  return <SignOut username={user.username} />;
}
