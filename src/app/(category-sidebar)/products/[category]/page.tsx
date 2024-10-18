import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await props.params;
  const urlDecoded = decodeURIComponent(category);
  const cat = await db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.slug, urlDecoded),
    with: {
      subcollections: {
        with: {
          subcategories: true,
        },
      },
    },
  });
  if (!cat) {
    return notFound();
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-2 border-b-2 text-sm font-bold">690 Products</h1>
      <div className="space-y-4">
        {cat.subcollections.map((subcollection, index) => (
          <div key={index}>
            <h2 className="mb-2 border-b-2 text-lg font-semibold">
              {subcollection.name}
            </h2>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
              {subcollection.subcategories.map(
                (subcategory, subcategoryIndex) => (
                  <Link
                    key={subcategoryIndex}
                    className="group flex h-full flex-row border px-4 py-2 hover:bg-gray-100"
                    href={`/products/${category}/${subcategory.slug}`}
                  >
                    <div className="py-2">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt={subcategory.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 flex-shrink-0 object-cover"
                      />
                    </div>
                    <div className="flex h-24 flex-grow flex-col items-start py-2">
                      <div className="text-sm font-medium text-gray-700 group-hover:underline">
                        {subcategory.name}
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
