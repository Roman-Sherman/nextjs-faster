import { db } from "@/db";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCategories = await db.query.categories.findMany({
    orderBy: (categories, { asc }) => asc(categories.name),
  });
  return (
    <div className="flex flex-grow font-helvetica-roman">
      <aside className="hidden w-48 min-w-48 border-r border-gray-400 p-3 md:block">
        <h2 className="border-b border-green-800 text-sm font-semibold text-green-900">
          Choose a Category
        </h2>
        <ul className="flex flex-col items-start justify-center">
          {allCategories.map((category) => (
            <li key={category.name} className="w-full">
              <Link
                href={`/products/${category.slug}`}
                className="block w-full py-1 text-xs text-gray-800 hover:bg-yellow-100 hover:underline"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
