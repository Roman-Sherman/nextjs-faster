"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { preloadImage } from "./use-preload-image";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  imagesToLoadOnHover?: string[];
};
export const Link = ({ children, ...props }: LinkProps) => {
  const router = useRouter();
  return (
    <NextLink
      onMouseOver={() => {
        if (props.imagesToLoadOnHover) {
          props.imagesToLoadOnHover.forEach((url) => {
            preloadImage(url);
          });
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
};
