import Link from "next/link";
import { productCategories } from "./data";

export default function Home() {
  return (
    <main className="flex-1 p-4">
      {productCategories.map((category) => (
        <div key={category.name} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{category.name}</h2>
          <div className="grid grid-cols-2 gap-4 border-b-2 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.name}
                className="flex flex-col items-center text-center"
                href={`/products/${subcategory.name}`}
                href="/products/subcategory"
              >
                <img
                  src={subcategory.icon}
                  alt={subcategory.name}
                  className="mb-2 h-14 w-14 border hover:bg-yellow-200"
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
