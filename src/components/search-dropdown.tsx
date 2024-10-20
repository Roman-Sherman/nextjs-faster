"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "../db/schema";
import { searchProducts } from "../lib/actions";
import { Link } from "@/components/ui/link";
import { useParams, useRouter } from "next/navigation";

type SearchResult = Product & { href: string };

export function SearchDropdownComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const search = async () => {
      if (searchTerm.length === 0) setFilteredItems([]);
      else {
        const results = await searchProducts(searchTerm);
        setFilteredItems(results);
      }
    };

    search();
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
      <div className="relative w-full">
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
            className="w-[180px] font-sans font-medium sm:w-[300px] md:w-[375px]"
          />
          <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
        {isOpen && filteredItems.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <ScrollArea className="h-[300px]">
              {filteredItems.map((item, index) => (
                <Link href={item.href} key={item.slug} prefetch={true}>
                  <div
                    key={item.slug}
                    className={cn("flex cursor-pointer items-center p-2", {
                      "bg-gray-100": index === highlightedIndex,
                    })}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => {
                      setSearchTerm(item.name);
                      setIsOpen(false);
                      inputRef.current?.blur(); // Close the keyboard on mobile
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
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
