import Link from "next/link";
import Image from "next/image";
import { Product } from "@/db/schema";
export function ProductLink(props: {
  imageUrl?: string | null;
  category_slug: string;
  subcategory_slug: string;
  product: Product;
}) {
  const { category_slug, subcategory_slug, product, imageUrl } = props;
  return (
    <Link
      className="group flex h-full flex-row border px-4 py-2 hover:bg-gray-100"
      href={`/products/${category_slug}/${subcategory_slug}/${product.slug}`}
    >
      <div className="py-2">
        <Image
          src={imageUrl ?? "/placeholder.svg?height=48&width=48"}
          alt={`A small picture of ${product.name}`}
          width={48}
          height={48}
          className="h-12 w-12 flex-shrink-0 object-cover"
        />
      </div>
      <div className="px-2" />
      <div className="flex h-24 flex-grow flex-col items-start py-2">
        <div className="text-sm font-medium text-gray-700 group-hover:underline">
          {product.name}
        </div>
        <p className="overflow-hidden text-xs">{product.description}</p>
      </div>
    </Link>
  );
}
