"use client";

import NextImage, { getImageProps } from "next/image";
import { Suspense, use, useState } from "react";

type NextImageProps = React.ComponentProps<typeof NextImage>;

function CachedImage(props: { props: NextImageProps; isLoaded: boolean }) {
  const imgProps = getImageProps(props.props);
  console.log(imgProps.props.src);
  const isCached = use(
    fetch(imgProps.props.src, {
      method: "GET",
      cache: "only-if-cached",
      mode: "same-origin",
    }).then((response) => {
      return response.ok;
    }),
  );
  if (!isCached) {
    return null;
  }
  return (
    <NextImage
      {...props.props}
      width={48}
      height={48}
      quality={65}
      style={{ visibility: props.isLoaded ? "hidden" : "visible" }} // Hide until the new image is loaded
    />
  );
}

export const FastProductImage = (({ ...props }: NextImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      {/* Display the initial image with width/height of 48 and quality 65 */}
      {!isLoaded && (
        <Suspense>
          <CachedImage props={props} isLoaded={isLoaded} />
        </Suspense>
      )}
      <NextImage
        {...props}
        width={256}
        height={256}
        quality={80}
        onLoad={() => setIsLoaded(true)}
        style={{ visibility: isLoaded ? "visible" : "hidden" }} // Ensure it's visible when loaded
      />
    </div>
  );
}) as typeof NextImage;
