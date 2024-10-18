import { artSupplies } from "../data";

export default function Layout({ children }: { children: React.ReactNode }) {
  const allCategories = artSupplies.flatMap((item) => item.categories);
  return (
    <div className="flex flex-grow font-helvetica-roman">
      <aside className="hidden w-64 border-r border-gray-400 p-3 md:block">
        <h2 className="border-b border-green-800 text-sm font-semibold text-green-900">
          Choose a Category
        </h2>
        <ul className="flex flex-col items-start justify-center">
          {allCategories.map((category) => (
            <li key={category.categoryName}>
              <a href={`/products/${category.categoryName}`}>
                <div className="py-1 text-xs text-gray-800 hover:bg-yellow-100 hover:underline">
                  {category.categoryName}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
