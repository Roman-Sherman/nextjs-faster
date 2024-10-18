import { ProductLink } from "@/components/ui/product-card";
import { db } from "@/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import { addToCart } from "@/lib/actions";
import { ne } from "drizzle-orm";

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
  const urlDecodedCategory = decodeURIComponent(category);
  console.log(urlDecodedProduct);
  const productData = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, urlDecodedProduct),
  });
  const related = await db.query.products.findMany({
    where: (products, { eq, and }) =>
      and(
        eq(products.subcategory_slug, urlDecodedSubcategory),
        ne(products.slug, urlDecodedProduct),
      ),
    with: {
      subcategory: true,
    },
    limit: 5,
  });
  if (!productData) {
    return notFound();
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="border-t-2 pt-1 text-xl font-bold text-green-800">
        {productData.name}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Image
            src={"/placeholder.svg?height=64&width=64"}
            alt={productData.name}
            height={64}
            width={64}
            className="h-64 w-64 flex-shrink-0 border-2"
          />
          <p className="flex-grow text-base">{productData.description}</p>
        </div>
        <form className="flex flex-col gap-2" action={addToCart}>
          <input type="hidden" name="productSlug" value={productData.name} />
          <button
            type="submit"
            className="max-w-[150px] rounded-[2px] bg-green-800 px-5 py-1 text-sm font-semibold text-white"
          >
            Add to cart
          </button>
        </form>
      </div>
      <div className="pt-8">
        <h2 className="text-lg font-bold text-green-800">
          Explore more products
        </h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {related?.map((product) => (
            <ProductLink
              key={product.name}
              category_slug={category}
              subcategory_slug={subcategory}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
