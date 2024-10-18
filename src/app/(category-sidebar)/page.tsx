import Link from "next/link";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const collections = await db.query.collections.findMany({
    with: {
      categories: true,
    },
    orderBy: (collections, { asc }) => asc(collections.name),
  });
  return (
    <div className="p-4">
      {collections.map((collection) => (
        <div key={collection.name}>
          <h2 className="text-xl font-semibold">{collection.name}</h2>
          <div className="grid grid-cols-2 gap-4 border-b-2 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {collection.categories.map((category) => (
              <Link
                key={category.name}
                className="flex flex-col items-center text-center"
                href={`/products/${category.slug}`}
              >
                <Image
                  src={category.image_url ?? "/placeholder.svg"}
                  alt={`A small picture of ${category.name}`}
                  className="mb-2 h-14 w-14 border hover:bg-yellow-200"
                  width={48}
                  height={48}
                  quality={65}
                />
                <span className="text-xs">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
