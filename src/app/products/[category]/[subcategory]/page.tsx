import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSubcategoryDetails } from "@/db/utils";

export default async function Page(props: {
  params: Promise<{
    subcategory: string;
    category: string;
  }>;
}) {
  const { subcategory, category } = await props.params;
  const urlDecodedCategory = decodeURIComponent(category);
  const urlDecodedSubcategory = decodeURIComponent(subcategory);
  const sub = getSubcategoryDetails({
    category: urlDecodedCategory,
    subcategory: urlDecodedSubcategory,
  });
  if (!sub) {
    return notFound();
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-2 border-b-2 text-sm font-bold">690 Products</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {sub.products.map((item) => (
          <Link
            key={item.name}
            className="group flex h-full flex-row border px-4 py-2 hover:bg-gray-100"
            href={`/products/${category}/${subcategory}/${item.name}`}
          >
            <div className="py-2">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt={item.name}
                width={48}
                height={48}
                className="h-12 w-12 flex-shrink-0 object-cover"
              />
            </div>
            <div className="flex h-24 flex-grow flex-col items-start py-2">
              <div className="text-sm font-medium text-gray-700 group-hover:underline">
                {item.name}
              </div>
              <p className="overflow-hidden text-xs">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
