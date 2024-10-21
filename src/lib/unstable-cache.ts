import { unstable_cache as next_unstable_cache } from "next/cache";
import {cache} from "react";

type Callback<T> = (...args: any[]) => Promise<T>;


export const unstable_cache = <T>(callback: Callback<T>, key: string[], options: {revalidate: number}) => cache(
    next_unstable_cache(callback, key, options)
)
