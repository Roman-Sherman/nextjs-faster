"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PrefetchImage = {
  srcset: string;
  sizes: string;
  src: string;
  alt: string;
  loading: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function prefetchImages(href: string) {
  if (!href.startsWith("/products")) {
    return [];
  }
  // Delay the prefetch until after Next.js has time to prefetch the page itself.
  await sleep(1000);
  const url = new URL(href, window.location.href);
  const imageResponse = await fetch(`/api/prefetch-images${url.pathname}`, {
    priority: "low",
  });
  if (!imageResponse.ok) {
    throw new Error("Failed to prefetch images");
  }
  const { images } = await imageResponse.json();
  return images as PrefetchImage[];
}

const seen = new Set<string>();

export const Link: typeof NextLink = (({ children, ...props }) => {
  const [images, setImages] = useState<PrefetchImage[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (props.prefetch === false) {
      return;
    }
    void prefetchImages(String(props.href)).then((images) => {
      setImages(images);
    }, console.error);
  }, [props.href, props.prefetch]);
  return (
    <NextLink
      onMouseOver={() => {
        for (const image of images) {
          if (image.loading === "lazy" || seen.has(image.srcset)) {
            continue;
          }
          const img = new Image();
          img.decoding = "async";
          img.fetchPriority = "low";
          img.sizes = image.sizes;
          seen.add(image.srcset);
          img.srcset = image.srcset;
          img.src = image.src;
          img.alt = image.alt;
        }
      }}
      onMouseDown={(e) => {
        const url = new URL(String(props.href), window.location.href);
        if (
          url.origin === window.location.origin &&
          e.button === 0 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey
        ) {
          e.preventDefault();
          router.push(String(props.href));
        }
      }}
      {...props}
    >
      {children}
    </NextLink>
  );
}) as typeof NextLink;
