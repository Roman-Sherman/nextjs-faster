import { unstable_cache as next_unstable_cache } from "next/cache";
import { cache } from "react";

// sorry theo but we're using an any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback<T> = (...args: any[]) => Promise<T>;

// next_unstable_cache doesn't handle deduplication, so we wrap it in React's cache
export const unstable_cache = <T>(
  callback: Callback<T>,
  key: string[],
  options: { revalidate: number },
) => cache(next_unstable_cache(callback, key, options));
