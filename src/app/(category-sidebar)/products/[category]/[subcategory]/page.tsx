import { notFound } from "next/navigation";
import { ProductLink } from "@/components/ui/product-card";
import { db } from "@/db";

export default async function Page(props: {
  params: Promise<{
    subcategory: string;
    category: string;
  }>;
}) {
  const { subcategory, category } = await props.params;
  const urlDecodedCategory = decodeURIComponent(category);
  const urlDecodedSubcategory = decodeURIComponent(subcategory);
  const sub = await db.query.subcategories.findFirst({
    where: (subcategories, { eq }) =>
      eq(subcategories.slug, urlDecodedSubcategory),
    with: {
      products: true,
    },
  });
  if (!sub) {
    return notFound();
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-2 border-b-2 text-sm font-bold">690 Products</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {sub.products.map((product) => (
          <ProductLink
            key={product.name}
            category_slug={category}
            subcategory_slug={subcategory}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
