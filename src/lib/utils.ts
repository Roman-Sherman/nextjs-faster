import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cartCookieSchema = z.array(
  z.object({
    productSlug: z.string(),
    quantity: z.number(),
  }),
);

export const cartSchema = z.object({
  cart: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      price: z.string(),
      slug: z.string(),
      quantity: z.number(),
    }),
  ),
});

export type CartItem = z.infer<typeof cartCookieSchema>[number];
