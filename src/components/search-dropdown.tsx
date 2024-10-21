"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "../db/schema";
import { searchProducts } from "../lib/actions";
import { Link } from "@/components/ui/link";
import { useParams, useRouter } from "next/navigation";

type SearchResult = Product & { href: string };

export function SearchDropdownComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [committedSearchTerm, setCommittedSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFilteredItems([]);
      setCommittedSearchTerm("");
    } else {
      const currentSearchTerm = searchTerm;
      startTransition(() => {
        searchProducts(currentSearchTerm).then((results) => {
          if (currentSearchTerm === searchTerm) {
            setFilteredItems(results);
            setCommittedSearchTerm(currentSearchTerm);
          }
        });
      });
    }
  }, [searchTerm]);

  const params = useParams();
  useEffect(() => {
    if (!params.product) {
      const subcategory = params.subcategory;
      setSearchTerm(
        typeof subcategory === "string" ? subcategory.replaceAll("-", " ") : "",
      );
    }
  }, [params]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1,
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      router.push(filteredItems[highlightedIndex].href);
      setSearchTerm(filteredItems[highlightedIndex].name);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="font-sans">
      <div className="relative flex-grow">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(e.target.value.length > 0);
              setHighlightedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            className="font-sans font-medium sm:w-[300px] md:w-[375px]"
          />
          {isPending ? (
            <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          )}
          <X
            className={cn(
              "absolute right-7 top-2 h-5 w-5 text-muted-foreground",
              {
                hidden: !isOpen,
              },
            )}
            onClick={() => {
              setSearchTerm("");
              setIsOpen(false);
            }}
          />
        </div>
        {((isOpen && committedSearchTerm === searchTerm) || false) && (
          <div className="absolute z-10 w-full border border-gray-200 bg-white shadow-lg">
            <ScrollArea className="h-[300px]">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <Link href={item.href} key={item.slug} prefetch={true}>
                    <div
                      className={cn("flex cursor-pointer items-center p-2", {
                        "bg-gray-100": index === highlightedIndex,
                      })}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onClick={() => {
                        setSearchTerm(item.name);
                        setIsOpen(false);
                        inputRef.current?.blur();
                      }}
                    >
                      <Image
                        loading="eager"
                        decoding="sync"
                        src={item.image_url ?? "/placeholder.svg"}
                        alt=""
                        className="h-10 w-10 pr-2"
                        height={40}
                        width={40}
                        quality={65}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-500">No results found</p>
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
