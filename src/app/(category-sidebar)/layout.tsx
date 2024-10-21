import { Link } from "@/components/ui/link";
import { getCollections } from "@/lib/queries";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCategories = await getCollections();
  return (
    <div className="flex flex-grow overflow-hidden font-helvetica-roman">
      <aside className="sticky hidden h-screen w-64 min-w-64 max-w-64 border-r p-4 md:block">
        <h2 className="border-b border-green-800 text-sm font-semibold text-green-900">
          Choose a Category
        </h2>
        <ul className="flex flex-col items-start justify-center">
          {allCategories.map((category) => (
            <li key={category.name} className="w-full">
              <Link
                prefetch={true}
                href={`/${category.name}`}
                className="block w-full py-1 text-xs text-gray-800 hover:bg-yellow-100 hover:underline"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="h-[calc(100vh-73px)] flex-grow overflow-y-auto p-4 pt-0">
        {children}
      </main>
    </div>
  );
}
