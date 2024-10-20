import { ProductLink } from "@/components/ui/product-card";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { Metadata } from "next";
import { Image } from "@/components/ui/image";
export async function generateMetadata(props: {
  params: Promise<{ product: string; category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { product: productParam } = await props.params;
  const urlDecodedProduct = decodeURIComponent(productParam);

  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, urlDecodedProduct),
    orderBy: (products, { asc }) => asc(products.name),
  });

  if (!product) {
    return notFound();
  }

  return {
    openGraph: { title: product.name, description: product.description },
  };
}

fetch("", {
  // only check cache
  cache: "only-if-cached",
});

export default async function Page(props: {
  params: Promise<{
    product: string;
    subcategory: string;
    category: string;
  }>;
}) {
  const { product, subcategory, category } = await props.params;
  const urlDecodedProduct = decodeURIComponent(product);
  const urlDecodedSubcategory = decodeURIComponent(subcategory);
  // const urlDecodedCategory = decodeURIComponent(category);
  const productData = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, urlDecodedProduct),
  });
  const relatedUnshifted = await db.query.products.findMany({
    where: (products, { eq, and }) =>
      and(eq(products.subcategory_slug, urlDecodedSubcategory)),
    with: {
      subcategory: true,
    },

    orderBy: (products, { asc }) => asc(products.slug),
  });

  if (!productData) {
    return notFound();
  }
  const currentProductIndex = relatedUnshifted.findIndex(
    (p) => p.slug === productData.slug,
  );
  const related = [
    ...relatedUnshifted.slice(currentProductIndex + 1),
    ...relatedUnshifted.slice(0, currentProductIndex),
  ];

  return (
    <div className="container p-4">
      <h1 className="border-t-2 pt-1 text-xl font-bold text-green-800">
        {productData.name}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Image
            loading="eager"
            decoding="sync"
            src={productData.image_url ?? "/placeholder.svg?height=64&width=64"}
            alt={`A small picture of ${productData.name}`}
            height={256}
            quality={80}
            width={256}
            className="h-64 w-64 flex-shrink-0 border-2"
          />
          <p className="flex-grow text-base">{productData.description}</p>
        </div>
        <p className="text-xl font-bold">${productData.price}</p>
        <AddToCartForm productSlug={productData.slug} />
      </div>
      <div className="pt-8">
        {related.length > 0 && (
          <h2 className="text-lg font-bold text-green-800">
            Explore more products
          </h2>
        )}
        <div className="flex flex-row flex-wrap gap-2">
          {related?.map((product) => (
            <ProductLink
              key={product.name}
              loading="lazy"
              category_slug={category}
              subcategory_slug={subcategory}
              product={product}
              imageUrl={product.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
