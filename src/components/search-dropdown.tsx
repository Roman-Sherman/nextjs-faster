"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

type Item = {
  id: string;
  name: string;
  icon: string;
};

const items: Item[] = [
  { id: "1", name: "aluminum", icon: "/placeholder.svg?height=40&width=40" },
  {
    id: "2",
    name: "aluminum extrusions",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "aluminum tubing",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "allen wrenches",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "all thread rods",
    icon: "/placeholder.svg?height=40&width=40",
  },
];

export function SearchDropdownComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          className="w-[300px] font-sans font-medium md:w-[450px]"
        />
        <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
      {isOpen && filteredItems.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <ScrollArea className="h-[300px]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(item.name);
                  setIsOpen(false);
                }}
              >
                <img src={item.icon} alt="" className="mr-2 h-10 w-10" />
                <span>{item.name}</span>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
