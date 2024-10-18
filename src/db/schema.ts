import { integer, numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const categories = pgTable("categories", {
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  collection_id: integer("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
});

export const subcollection = pgTable("subcollections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category_slug: text("category_slug")
    .notNull()
    .references(() => categories.slug, { onDelete: "cascade" }),
});

export const subcategories = pgTable("subcategories", {
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  subcollection_id: integer("subcollection_id")
    .notNull()
    .references(() => subcollection.id, { onDelete: "cascade" }),
});

export const products = pgTable("products", {
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  subcategory_slug: text("subcategory_slug")
    .notNull()
    .references(() => subcategories.slug, { onDelete: "cascade" }),
});
