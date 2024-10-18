import Link from "next/link";
import { productCategories } from "./data";

export default function Home() {
  return (
    <main className="flex-1 p-4">
      {productCategories.map((category) => (
        <div key={category.name} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 border-b-2 pb-4">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.name}
                className="flex flex-col items-center text-center"
                href={`/products/${subcategory.name}`}
              >
                <img
                  src={subcategory.icon}
                  alt={subcategory.name}
                  className="w-14 h-14 border mb-2 hover:bg-yellow-200"
                  width={48}
                  height={48}
                />
                <span className="text-xs">{subcategory.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
