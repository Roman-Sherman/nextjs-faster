import { integer, numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  title: text("name").notNull(),
  slug: text("slug").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  title: text("name").notNull(),
  slug: text("slug").notNull(),
  collection_id: integer("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
});

export const subcollection = pgTable("subcollections", {
  id: serial("id").primaryKey(),
  title: text("name").notNull(),
  slug: text("slug").notNull(),
  category_id: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export const subcategories = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  title: text("name").notNull(),
  slug: text("slug").notNull(),
  subcollection_id: integer("subcollection_id")
    .notNull()
    .references(() => subcollection.id, { onDelete: "cascade" }),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull(),
  price: numeric("price").notNull(),
  subcategory_id: integer("subcategory_id")
    .notNull()
    .references(() => subcategories.id, { onDelete: "cascade" }),
});
