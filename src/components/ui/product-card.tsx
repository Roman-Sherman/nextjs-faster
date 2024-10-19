import { Link } from "@/components/ui/link";
import Image from "next/image";
import { Product } from "@/db/schema";
export function ProductLink(props: {
  imageUrl?: string | null;
  category_slug: string;
  subcategory_slug: string;
  loading: "eager" | "lazy";
  product: Product;
}) {
  const { category_slug, subcategory_slug, product, imageUrl } = props;
  return (
    <Link
      prefetch={true}
      className="group flex h-full flex-row border px-4 py-2 hover:bg-gray-100"
      href={`/products/${category_slug}/${subcategory_slug}/${product.slug}`}
    >
      <div className="py-2">
        <Image
          loading={props.loading}
          decoding="sync"
          src={imageUrl ?? "/placeholder.svg?height=48&width=48"}
          alt={`A small picture of ${product.name}`}
          width={48}
          height={48}
          quality={65}
          className="h-12 w-12 flex-shrink-0 object-cover"
        />
      </div>
      <div className="px-2" />
      <div className="h-26 flex flex-grow flex-col items-start py-2">
        <div className="text-sm font-medium text-gray-700 group-hover:underline">
          {product.name}
        </div>
        <p className="overflow-hidden text-xs">{product.description}</p>
      </div>
    </Link>
  );
}
