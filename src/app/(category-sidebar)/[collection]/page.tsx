import { Link } from "@/components/ui/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { count } from "drizzle-orm";
import Image from "next/image";

export default async function Home(props: {
  params: {
    collection: string;
  };
}) {
  const collections = await db.query.collections.findMany({
    with: {
      categories: true,
    },
    where: (collections, { eq }) =>
      eq(collections.name, decodeURIComponent(props.params.collection)),
    orderBy: (collections, { asc }) => asc(collections.name),
  });
  let imageCount = 0;

  return (
    <div className="w-full p-4">
      {collections.map((collection) => (
        <div key={collection.name}>
          <h2 className="text-xl font-semibold">{collection.name}</h2>
          <div className="flex flex-row flex-wrap justify-center gap-2 border-b-2 py-4 sm:justify-start">
            {collection.categories.map((category) => (
              <Link
                prefetch={true}
                key={category.name}
                className="flex w-[125px] flex-col items-center text-center"
                href={`/products/${category.slug}`}
              >
                <Image
                  loading={imageCount++ < 15 ? "eager" : "lazy"}
                  decoding="sync"
                  src={category.image_url ?? "/placeholder.svg"}
                  alt={`A small picture of ${category.name}`}
                  className="mb-2 h-14 w-14 border hover:bg-yellow-200"
                  width={48}
                  height={48}
                  quality={65}
                />
                <span className="text-xs">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
