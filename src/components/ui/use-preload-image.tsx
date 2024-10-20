import { useEffect } from "react";
export function preloadImage(url: string) {
  try {
    const img = new Image();
    img.src = url;
  } catch (e) {
    console.error("failed to preload", url, e);
  }
}

export function usePreloadImage(prefetchProps: { props: { src: string } }) {
  useEffect(() => {
    preloadImage(prefetchProps.props.src);
  }, [prefetchProps]);
}
