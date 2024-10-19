"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { validatedAction } from "@/lib/middleware";
import { db } from "@/db";
import { NewUser, users } from "@/db/schema";
import { comparePasswords, hashPassword, setSession } from "@/lib/session";

const authSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  mode: z.enum(["signin", "signup"]),
});

async function signIn(input: z.infer<typeof authSchema>) {
  const { username, password } = input;
  const user = await db
    .select({
      user: users,
    })
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (user.length === 0) {
    return { error: "Invalid email or password. Please try again." };
  }

  const { user: foundUser } = user[0];

  const isPasswordValid = await comparePasswords(
    password,
    foundUser.passwordHash,
  );

  if (!isPasswordValid) {
    return { error: "Invalid email or password. Please try again." };
  }
  await setSession(foundUser);
}
async function signUp(input: z.infer<typeof authSchema>) {
  const { username, password } = input;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (existingUser.length > 0) {
    return { error: "Failed to create user. Please try again." };
  }

  const passwordHash = await hashPassword(password);

  const newUser: NewUser = {
    username,
    passwordHash,
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return { error: "Failed to create user. Please try again." };
  }
  await setSession(createdUser);
}
export const signInSignUp = validatedAction(authSchema, async (data) => {
  const { mode } = data;
  if (mode === "signin") {
    return signIn(data);
  } else {
    return signUp(data);
  }
});

export async function signOut() {
  (await cookies()).delete("session");
}
