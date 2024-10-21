import { db } from "@/db";
import { categories, products, subcategories, subcollection } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // format is /api/search?q=term
    const searchTerm = request.nextUrl.searchParams.get("q")
    if (!searchTerm || !searchTerm.length) {
      return Response.json([]);
    }
  
    let results;
  
    if (searchTerm.length <= 2) {
      // If the search term is short (e.g., "W"), use ILIKE for prefix matching
      results = await db
        .select()
        .from(products)
        .where(sql`${products.name} ILIKE ${searchTerm + "%"}`) // Prefix match
        .limit(5)
        .innerJoin(
          subcategories,
          sql`${products.subcategory_slug} = ${subcategories.slug}`,
        )
        .innerJoin(
          subcollection,
          sql`${subcategories.subcollection_id} = ${subcollection.id}`,
        )
        .innerJoin(
          categories,
          sql`${subcollection.category_slug} = ${categories.slug}`,
        );
    } else {
      // For longer search terms, use full-text search with tsquery
      const formattedSearchTerm = searchTerm
        .split(" ")
        .filter((term) => term.trim() !== "") // Filter out empty terms
        .map((term) => `${term}:*`)
        .join(" & ");
  
      results = await db
        .select()
        .from(products)
        .where(
          sql`to_tsvector('english', ${products.name}) @@ to_tsquery('english', ${formattedSearchTerm})`,
        )
        .limit(5)
        .innerJoin(
          subcategories,
          sql`${products.subcategory_slug} = ${subcategories.slug}`,
        )
        .innerJoin(
          subcollection,
          sql`${subcategories.subcollection_id} = ${subcollection.id}`,
        )
        .innerJoin(
          categories,
          sql`${subcollection.category_slug} = ${categories.slug}`,
        );
    }
  
    const searchResults: ProductSearchResult = results.map((item) => {
      const href = `/products/${item.categories.slug}/${item.subcategories.slug}/${item.products.slug}`;
      return {
        ...item.products,
        href,
      };
    });
    const response = Response.json(searchResults);
    // cache for 10 minutes
    response.headers.set("Cache-Control", "public, max-age=600");
    return response;
  }
  
  export type ProductSearchResult = {
    href: string;
    name: string;
    slug: string;
    image_url: string | null;
    description: string;
    price: string;
    subcategory_slug: string;
}[]