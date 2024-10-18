import Link from "next/link";
import Image from "next/image";
const screwTypes = [
  {
    name: "Socket Head Screws",
    items: [
      {
        name: "Alloy Steel Socket Head Screws",
        description: "The standard for high-strength fastening.",
        imageUrl: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Mil. Spec. Alloy Steel Socket Head Screws",
        description:
          "Choose these screws for their adherence to strict military standards for material and construction.",
        imageUrl: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Torx Alloy Steel Socket Head Screws",
        description:
          "A Torx-Plus drive has more points of contact than a hex drive, allowing you to tighten these screws with less slippage or damage to the recess.",
        imageUrl: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Left-Hand Threaded Alloy Steel Socket Head Screws",
        description:
          "Tighten these screws by turning them to the left; once fastened, they prevent counterclockwise-moving parts from loosening.",
        imageUrl: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
];

export default async function Page(props: {
  params: Promise<{
    subcategory: string;
    category: string;
  }>;
}) {
  const { subcategory, category } = await props.params;
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-2 border-b-2 text-sm font-bold">690 Products</h1>
      <div className="space-y-4">
        {screwTypes.map((collection, index) => (
          <div key={index}>
            <h2 className="mb-2 border-b-2 text-lg font-semibold">
              {collection.name}
            </h2>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
              {collection.items.map((item, subcategoryIndex) => (
                <Link
                  key={subcategoryIndex}
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
                    <p className="overflow-hidden text-xs">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
