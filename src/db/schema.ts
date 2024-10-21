import { sql } from "drizzle-orm";
import {
  index,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export type Collection = typeof collections.$inferSelect;

export const categories = pgTable("categories", {
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  collection_id: integer("collection_id")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  image_url: text("image_url"),
});

export type Category = typeof categories.$inferSelect;

export const subcollection = pgTable("subcollections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category_slug: text("category_slug")
    .notNull()
    .references(() => categories.slug, { onDelete: "cascade" }),
});

export type Subcollection = typeof subcollection.$inferSelect;

export const subcategories = pgTable("subcategories", {
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  subcollection_id: integer("subcollection_id")
    .notNull()
    .references(() => subcollection.id, { onDelete: "cascade" }),
  image_url: text("image_url"),
});

export type Subcategory = typeof subcategories.$inferSelect;

export const products = pgTable(
  "products",
  {
    slug: text("slug").notNull().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: numeric("price").notNull(),
    subcategory_slug: text("subcategory_slug")
      .notNull()
      .references(() => subcategories.slug, { onDelete: "cascade" }),
    image_url: text("image_url"),
  },
  (table) => ({
    nameSearchIndex: index("name_search_index")
      .using("gin", sql`${table.name}`, sql`gi`, sql`n_trgm_ops`)
      .concurrently(),
  }),
);

export type Product = typeof products.$inferSelect;

export const collectionsRelations = relations(collections, ({ many }) => ({
  categories: many(categories),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  collection: one(collections, {
    fields: [categories.collection_id],
    references: [collections.id],
  }),
  subcollections: many(subcollection),
}));

export const subcollectionRelations = relations(
  subcollection,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [subcollection.category_slug],
      references: [categories.slug],
    }),
    subcategories: many(subcategories),
  }),
);

export const subcategoriesRelations = relations(
  subcategories,
  ({ one, many }) => ({
    subcollection: one(subcollection, {
      fields: [subcategories.subcollection_id],
      references: [subcollection.id],
    }),
    products: many(products),
  }),
);

export const productsRelations = relations(products, ({ one }) => ({
  subcategory: one(subcategories, {
    fields: [products.subcategory_slug],
    references: [subcategories.slug],
  }),
}));

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
