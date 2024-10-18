import { ProductLink } from "@/components/ui/product-card";
import { getProductDetails, getRelatedProducts } from "@/db/utils";
import { notFound } from "next/navigation";

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
  const productData = getProductDetails({
    category: urlDecodedCategory,
    subcategory: urlDecodedSubcategory,
    product: urlDecodedProduct,
  });
  const related = getRelatedProducts({
    category: urlDecodedCategory,
    subcategory: urlDecodedSubcategory,
    product: urlDecodedProduct,
  });
  if (!productData) {
    return notFound();
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="border-t-2 pt-1 text-xl font-bold text-green-800">
        {productData?.name}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <img
            src={productData?.name}
            alt={productData?.name}
            className="h-64 w-64 flex-shrink-0 border-2"
          />
          <p className="flex-grow text-base">{productData?.description}</p>
        </div>
        <button className="max-w-[150px] rounded-[2px] bg-green-800 px-2 py-1 text-sm font-semibold text-white">
          Add to cart
        </button>
      </div>
      <div className="pt-8">
        <h2 className="text-lg font-bold text-green-800">
          Explore more products
        </h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {related?.map((item) => (
            <ProductLink
              key={item.name}
              category={category}
              subcategory={subcategory}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
