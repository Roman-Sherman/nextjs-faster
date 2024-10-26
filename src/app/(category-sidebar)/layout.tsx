import { Link } from "@/components/ui/link";
import { getCollections } from "@/lib/queries";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCollections = await getCollections();
  return (
    <div className="flex flex-grow font-mono">
      <aside className="hidden w-64 min-w-64 max-w-64 border-r p-4 md:block">
        <h2 className="border-accent1 text-accent1 border-b text-sm font-semibold">
          Choose a Category
        </h2>
        <ul className="flex flex-col items-start justify-center">
          {allCollections.map((collection) => (
            <li key={collection.slug} className="w-full">
              <Link
                prefetch={true}
                href={`/${collection.slug}`}
                className="hover:bg-accent2 block w-full py-1 text-xs text-gray-800 hover:underline"
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main
        className="h-[calc(100vh-113px)] overflow-y-auto p-4 pt-0"
        id="main-content"
      >
        {children}
      </main>
    </div>
  );
}
