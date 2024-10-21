import { db } from "../src/db";
import slugify from "slugify";
import { collections } from "../src/db/schema";
import { eq } from "drizzle-orm";

const collectionsData = await db.query.collections.findMany();
for (const collection of collectionsData) {
  await db
    .update(collections)
    .set({ slug: slugify(collection.name, { lower: true }) })
    .where(eq(collections.id, collection.id));
}
