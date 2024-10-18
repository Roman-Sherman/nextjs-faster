import { artSupplies } from "../data";

export default function Layout({ children }: { children: React.ReactNode }) {
  const allCategories = artSupplies.flatMap((item) => item.categories);
  return (
    <div className="flex flex-grow font-helvetica-roman">
      <aside className="hidden w-64 border-r border-gray-400 p-4 md:block">
        <h2 className="border-b border-green-800 text-sm font-semibold text-green-900">
          Choose a Category
        </h2>
        <ul className="">
          {allCategories.map((category) => (
            <li
              key={category.categoryName}
              className="group pb-2 hover:bg-yellow-200"
            >
              <a
                href={`/products/${category.categoryName}`}
                className="text-xs text-gray-800 group-hover:underline"
              >
                {category.categoryName}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
