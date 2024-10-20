"use client";
import Image from "next/image";
import { useState } from "react";

function CachedImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  [key: string]: any;
}) {
  const [isLoaded, setIsLoaded] = useState("");

  // TODO: check if thumbnail image is in cache - if not, simply render the full image

  return (
    <div>
      {/* Render cached thumbnail image */}
      {!isLoaded && (
        <Image
          src={src}
          alt={alt}
          {...props}
          width={48}
          height={48}
          quality={65}
        />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        width={256}
        height={256}
        quality={80}
        onLoad={() => setIsLoaded("true")}
        className={isLoaded ? "visible" : "hidden"}
      />
    </div>
  );
}

export default CachedImage;
