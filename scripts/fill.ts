import slugify from "slugify";
import { products, subcategories } from "../src/db/schema";
import { db } from "../src/db";
import { eq, isNull } from "drizzle-orm";

const readline = require("readline");
const fs = require("fs");

const getEmptySubcategories = async () => {
  const subcategoriesWithoutProducts = await db
    .select()
    .from(subcategories)
    .leftJoin(products, eq(products.subcategory_slug, subcategories.slug))
    .where(isNull(products.subcategory_slug));

  return subcategoriesWithoutProducts.map((s) => s.subcategories.slug);
};

function getRandomObjects(arr: any[], count: number) {
  const result = [];
  const takenIndices = new Set();
  const arrLength = arr.length;

  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * arrLength);

    if (!takenIndices.has(randomIndex)) {
      result.push(arr[randomIndex]);
      takenIndices.add(randomIndex);
    }
  }

  return result;
}

const getBody = async () => {
  const fileStream = fs.createReadStream("scripts/out.jsonl");
  const rl = readline.createInterface({
    input: fileStream,
  });

  const body = [] as any[];
  rl.on("line", (line: string) => {
    try {
      const parsedLine = JSON.parse(line);
      const subcategory_slug = parsedLine.custom_id;
      const response = JSON.parse(
        parsedLine.response.body.choices[0].message.content,
      );

      const products = response.products;

      const productsToAdd = products.map(
        (product: { name: string; description: string }) => {
          const price = parseFloat((Math.random() * 20 + 5).toFixed(1));
          return {
            slug: slugify(product.name, { lower: true }),
            name: product.name,
            description: product.description ?? "",
            price,
            subcategory_slug,
          };
        },
      );
      body.push(...productsToAdd);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      fs.appendFile("scripts/errors.txt", line + "\n", (err: any) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  });

  rl.on("close", async () => {
    console.log(body.length);
    for (let i = 0; i < body.length; i += 10000) {
      const chunk = body.slice(i, i + 10000);
      await db.insert(products).values(chunk).onConflictDoNothing();
      console.log(`Inserted products ${i} to ${i + chunk.length}`);
      await new Promise((resolve) => setTimeout(resolve, 100)); // 100 ms
    }

    // const data = [] as any[];
    // const subcategories = await getEmptySubcategories();
    // subcategories.forEach((subcat) => {
    //   // get 30 random products from body, regardless of subcategory_slug
    //   const products = getRandomObjects(body, 30).map((product) => {
    //     return {
    //       ...product,
    //       subcategory_slug: subcat,
    //       slug: slugify(product.name, { lower: true }) + "-1",
    //     };
    //   });
    //   data.push(...products);
    // });

    // for (let i = 0; i < data.length; i += 10000) {
    //   const chunk = data.slice(i, i + 10000);
    //   await db.insert(products).values(chunk).onConflictDoNothing();
    //   console.log(`Inserted products ${i} to ${i + chunk.length}`);
    //   await new Promise((resolve) => setTimeout(resolve, 100)); // Delay of 0.1 second
    // }

    // console.log("Inserted products");
  });
};

// getBody();

const duplicateProducts = async () => {
  for (let i = 0; i < 13; i += 1) {
    const p = await db
      .select()
      .from(products)
      .limit(10000)
      .offset(i * 10000);

    const productsToAdd = p.map((product) => {
      return {
        ...product,
        name: product.name + " V2",
        slug: product.slug + "-v2",
      };
    });

    await db.insert(products).values(productsToAdd).onConflictDoNothing();
    console.log(`Inserted products ${i * 10000} to ${(i + 1) * 10000}`);
  }
  console.log("Inserted products");
};

// duplicateProducts();
