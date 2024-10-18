import { productCategories } from "./data";


export default function Home() {
  return (
    <main className="flex-1 p-4">
    {productCategories.map((category) => (
      <div key={category.name} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.name} className="flex flex-col items-center text-center">
              <img
                src={subcategory.icon}
                alt={subcategory.name}
                className="w-12 h-12 mb-2"
                width={48}
                height={48}
              />
              <span className="text-xs">{subcategory.name}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </main>
  );
}
