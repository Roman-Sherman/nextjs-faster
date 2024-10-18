import { put } from "@vercel/blob";
import { db } from "../src/db";
import { Effect } from "effect";
import {
  products as products_table,
  categories as categories_table,
  subcategories as subcategories_table,
} from "../src/db/schema";
import { eq } from "drizzle-orm";

const generateImage = (prompt: string) =>
  Effect.gen(function* () {
    const res = yield* Effect.tryPromise(() =>
      fetch("https://api.getimg.ai/v1/stable-diffusion/text-to-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GETIMG_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          negative_prompt: "blurry",
          width: 512,
          height: 512,
          response_format: "url",
        }),
      }),
    );
    const json = yield* Effect.tryPromise(() => res.json());
    console.log(json);
    return json;
  });
const uploadImage = (imageUrl: string, path: string) =>
  Effect.gen(function* () {
    const res = yield* Effect.tryPromise(() => fetch(imageUrl));
    const blob = yield* Effect.tryPromise(() => res.blob());
    return yield* Effect.tryPromise(() =>
      put(path, blob, { access: "public" }),
    );
  });

const main = Effect.gen(function* () {
  const products = yield* Effect.tryPromise(() =>
    db.query.products.findMany({
      where: (products, { isNull }) => isNull(products.image_url),
    }),
  );
  console.log(`found ${products.length} products`);

  yield* Effect.all(
    products.map((product) =>
      Effect.gen(function* () {
        console.log(`generating image for ${product.name}`);
        const imageRes = yield* generateImage(`
            Generate a product photo for this product:
            Product Name: ${product.name}
            Product Description: ${product.description}`);
        const imageUrl = imageRes.url;
        if (!imageUrl) {
          return yield* Effect.fail("no image");
        }
        console.log(`uploading image for ${product.name} - ${imageUrl}`);
        const { url } = yield* uploadImage(
          imageUrl,
          `products/${product.slug}`,
        );
        console.log(`uploaded image for ${product.name}`);
        yield* Effect.tryPromise(() =>
          db
            .update(products_table)
            .set({ image_url: url })
            .where(eq(products_table.slug, product.slug)),
        );
      }),
    ),
    { concurrency: 10 },
  );

  const categories = yield* Effect.tryPromise(() =>
    db.query.categories.findMany({
      where: (categories, { isNull }) => isNull(categories.image_url),
    }),
  );

  console.log(`found ${categories.length} categories`);

  yield* Effect.all(
    categories.map((category) =>
      Effect.gen(function* () {
        console.log(`generating image for ${category.name}`);
        const imageRes = yield* generateImage(`
            Generate a product photo for this product category:
            Category Name: ${category.name}`);
        const imageUrl = imageRes.url;
        if (!imageUrl) {
          return yield* Effect.fail("no image");
        }
        console.log(`uploading image for ${category.name} - ${imageUrl}`);
        const { url } = yield* uploadImage(
          imageUrl,
          `categories/${category.slug}`,
        );
        console.log(`uploaded image for ${category.name}`);
        yield* Effect.tryPromise(() =>
          db
            .update(categories_table)
            .set({ image_url: url })
            .where(eq(categories_table.slug, category.slug)),
        );
      }),
    ),
    { concurrency: 10 },
  );

  const subcategories = yield* Effect.tryPromise(() =>
    db.query.subcategories.findMany({
      where: (subcategories, { isNull }) => isNull(subcategories.image_url),
    }),
  );

  console.log(`found ${subcategories.length} subcategories`);

  yield* Effect.all(
    subcategories.map((category) =>
      Effect.gen(function* () {
        console.log(`generating image for ${category.name}`);
        const imageRes = yield* generateImage(`
            Generate a product photo for this product category:
            Category Name: ${category.name}`);
        const imageUrl = imageRes.url;
        if (!imageUrl) {
          return yield* Effect.fail("no image");
        }
        console.log(`uploading image for ${category.name} - ${imageUrl}`);
        const { url } = yield* uploadImage(
          imageUrl,
          `subcategories/${category.slug}`,
        );
        console.log(`uploaded image for ${category.name}`);
        yield* Effect.tryPromise(() =>
          db
            .update(subcategories_table)
            .set({ image_url: url })
            .where(eq(subcategories_table.slug, category.slug)),
        );
      }),
    ),
    { concurrency: 10 },
  );
});

const exit = await Effect.runPromiseExit(main);
console.log(exit.toString());
