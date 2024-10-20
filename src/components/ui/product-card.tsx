"use client";
import { Link } from "@/components/ui/link";
import NextImage from "next/image";
import { getImageProps } from "next/image";
import { Product } from "@/db/schema";
import { useEffect } from "react";

// https://next-master-at84qgcki-next-master.vercel.app/_next/image?url=https%3A%2F%2Fbevgyjm5apuichhj.public.blob.vercel-storage.com%2Fproducts%2FDrawing-Board-FKOQtEHFxxnlP4fnzlV5u9pSltgQhT&w=640&q=80
// https://next-master-at84qgcki-next-master.vercel.app/_next/image?url=https%3A%2F%2Fbevgyjm5apuichhj.public.blob.vercel-storage.com%2Fproducts%2FDrawing-Board-FKOQtEHFxxnlP4fnzlV5u9pSltgQhT&w=640&q=80

export function ProductLink(props: {
  imageUrl?: string | null;
  category_slug: string;
  subcategory_slug: string;
  loading: "eager" | "lazy";
  product: Product;
}) {
  const { category_slug, subcategory_slug, product, imageUrl } = props;
  // prefetch the main image
  const prefetchProps = getImageProps({
    height: 256,
    quality: 80,
    width: 256,
    src: imageUrl ?? "/placeholder.svg?height=64&width=64",
    alt: `A small picture of ${product.name}`,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const func = async () => {
      const url = prefetchProps.props.src;
      console.log("prefetching", prefetchProps.props.src);
      const img = new Image();
      img.src = url;
    };
    func();
  }, [prefetchProps.props.src]);
  return (
    <Link
      prefetch={true}
      className="group flex h-[130px] w-full flex-row border px-4 py-2 hover:bg-gray-100 sm:w-[250px]"
      href={`/products/${category_slug}/${subcategory_slug}/${product.slug}`}
    >
      <div className="py-2">
        <NextImage
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
