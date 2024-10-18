import Link from "next/link";
import Image from "next/image";
export function ProductLink(props: {
  category: string;
  subcategory: string;
  item: {
    name: string;
    description: string;
  };
}) {
  const { category, subcategory, item } = props;
  return (
    <Link
      className="group flex h-full flex-row border px-4 py-2 hover:bg-gray-100"
      href={`/products/${category}/${subcategory}/${item.name}`}
    >
      <div className="py-2">
        <Image
          src="/placeholder.svg?height=48&width=48"
          alt={item.name}
          width={48}
          height={48}
          className="h-12 w-12 flex-shrink-0 object-cover"
        />
      </div>
      <div className="flex h-24 flex-grow flex-col items-start py-2">
        <div className="text-sm font-medium text-gray-700 group-hover:underline">
          {item.name}
        </div>
        <p className="overflow-hidden text-xs">{item.description}</p>
      </div>
    </Link>
  );
}
