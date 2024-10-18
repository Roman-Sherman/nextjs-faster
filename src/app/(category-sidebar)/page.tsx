import Link from "next/link";
import { getAllCollections } from "@/db/utils";

export default function Home() {
  const collections = getAllCollections();
  return (
    <div className="p-4">
      {collections.map((collection) => (
        <div key={collection.collectionName}>
          <h2 className="text-xl font-semibold">{collection.collectionName}</h2>
          <div className="grid grid-cols-2 gap-4 border-b-2 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {collection.categories.map((category) => (
              <Link
                key={category.categoryName}
                className="flex flex-col items-center text-center"
                href={`/products/${category.categoryName}`}
              >
                <img
                  src={category.icon}
                  alt={category.categoryName}
                  className="mb-2 h-14 w-14 border hover:bg-yellow-200"
                  width={48}
                  height={48}
                />
                <span className="text-xs">{category.categoryName}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
