import { Link } from "@/components/ui/link";
import { db } from "@/db";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCategories = await db.query.collections.findMany({
    with: {
      categories: true,
    },
    orderBy: (collections, { asc }) => asc(collections.name),
  });
  return (
    <div className="flex flex-grow overflow-hidden font-helvetica-roman">
      <aside className="sticky top-[73px] hidden h-[calc(100vh-73px)] w-48 min-w-48 overflow-y-auto border-r border-gray-400 p-3 md:block">
        <h2 className="border-b border-green-800 text-sm font-semibold text-green-900">
          Choose a Category
        </h2>
        <ul className="flex flex-col items-start justify-center">
          {allCategories.map((category) => (
            <li key={category.name} className="w-full">
              <Link
                prefetch={true}
                href={`/products/${category.name}`}
                className="block w-full py-1 text-xs text-gray-800 hover:bg-yellow-100 hover:underline"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="h-[calc(100vh-73px)] flex-grow overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
