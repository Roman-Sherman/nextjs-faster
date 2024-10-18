import Image from "next/image";
import Link from "next/link";

const adhesiveCategories = [
  {
    title: "Epoxy Structural Adhesives",
    products: [
      {
        name: "Epoxy Structural Adhesives",
        description:
          "Epoxies are the strongest and most weather- and chemical-resistant structural adhesives. They work especially well on metals.",
      },
      {
        name: "Quick-Set Epoxy Structural Adhesives",
        description:
          "For quick repairs, these epoxies begin to harden in 5 minutes or less.",
      },
      {
        name: "Toughened Epoxy Structural Adhesives",
        description:
          "Toughened adhesives are blended with rubber particles for better impact resistance than standard epoxies. They form flexible, resilient bonds.",
      },
      {
        name: "Epoxy Structural Adhesive Assortments",
        description:
          "Assortments include eight different epoxies in 0.1-oz. packets to handle a variety of small jobs.",
      },
      {
        name: "Slow-Set Epoxy Structural Adhesives",
        description:
          "To allow time to adjust and position parts, these epoxies remain workable for at least 90 minutes.",
      },
      {
        name: "Optically Clear Epoxy Structural Adhesives",
        description: "For invisible bond lines, these adhesives dry clear.",
      },
      {
        name: "Waterproof Epoxy Structural Adhesives",
        description:
          "Even when used under water, these adhesives maintain their strength.",
      },
      {
        name: "Epoxy Structural Adhesives for Hard-to-Bond Materials",
        description:
          "Fasten hard-to-bond plastics, such as polypropylene and polyethylene, with these epoxies.",
      },
    ],
  },
  {
    title: "Acrylic Structural Adhesives",
    products: [
      {
        name: "Toughened Acrylic Structural Adhesives",
        description:
          "Toughened adhesives are blended with rubber particles for better impact resistance than standard acrylics. They form resilient bonds.",
      },
      {
        name: "No-Mix Acrylic Structural Adhesives",
        description:
          "No need to mix these acrylics— apply adhesive to one surface and activator to the other, then bring surfaces together to bond.",
      },
      {
        name: "High-Strength Acrylic Structural Adhesives",
        description:
          "With excellent shear strength, these acrylics form bonds at least 25% stronger than standard acrylic structural adhesives.",
      },
      {
        name: "Acrylic Structural Adhesives for Hard-to-Bond Materials",
        description:
          "Fasten hard-to-bond plastics, such as polypropylene and polyethylene, with these adhesives.",
      },
    ],
  },
  {
    title: "Urethane Structural Adhesives",
    products: [
      {
        name: "Urethane Structural Adhesives",
        description:
          "Urethane adhesives are the most flexible, so they bond dissimilar materials and damp vibration.",
      },
      {
        name: "High-Strength Urethane Structural Adhesives",
        description:
          "With high shear strength and peel strength, these form the strongest bonds of our urethane adhesives.",
      },
    ],
  },
  {
    title: "Instant-Bond Adhesives",
    products: [
      {
        name: "Instant-Bond Adhesives",
        description: "Also known as super glue, these adhesives bond quickly.",
      },
      {
        name: "Instant-Bond Adhesives for Hard-to-Bond Materials",
        description:
          "Fasten hard-to-bond plastics, such as polypropylene and polyethylene.",
      },
      {
        name: "Toughened Instant-Bond Adhesives",
        description:
          "Mixed with rubber for better impact resistance than standard instant-bond adhesives, these adhesives form strong, resilient bonds.",
      },
      {
        name: "Flexible Instant-Bond Adhesives",
        description:
          "Accommodate joint movement with these adhesives that remain pliable when cured.",
      },
    ],
  },
];

export default async function Page(props: {
  params: Promise<{
    subcategory: string;
  }>;
}) {
  const { subcategory } = await props.params;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-sm font-bold mb-2 border-b-2">690 Products</h1>
      <div className="space-y-4">
        {adhesiveCategories.map((category, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-2 border-b-2">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2  ">
              {category.products.map((product, productIndex) => (
                <Link
                  key={productIndex}
                  className="flex flex-row h-full border px-4 py-2 group hover:bg-gray-100"
                  href={`/products/${subcategory}/${product.name}`}
                >
                  <div className="py-2">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt={product.name}
                      width={48}
                      height={48}
                      className="object-cover w-12 h-12 flex-shrink-0"
                    />
                  </div>
                  <div className="flex items-start  flex-grow  flex-col py-2 h-24">
                    <div className="text-sm font-medium text-gray-700 group-hover:underline">
                      {product.name}
                    </div>
                    <p className="text-xs overflow-hidden">
                      {product.description}
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
