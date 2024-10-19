import { getUser } from "@/lib/queries";
import { SignInSignUp, SignOut } from "./auth.client";

export async function AuthServer() {
  const user = await getUser();

  // wait 5 seconds to simulate a slow request
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!user) {
    return <SignInSignUp />;
  }
  return <SignOut username={user.username} />;
}
