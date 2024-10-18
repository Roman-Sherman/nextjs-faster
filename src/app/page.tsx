import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Fastening & Joining</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "Screws & Bolts",
            "Nuts",
            "Washers",
            "Rivets",
            "Pins",
            "Anchors",
          ].map((item) => (
            <div key={item} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                {/* Replace with actual icons */}
                <span className="text-3xl">🔩</span>
              </div>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Pipe, Tubing, Hose & Fittings
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "Pipe Fittings",
            "Tube Fittings",
            "Hose",
            "Tubing",
            "Valves",
            "Manifolds",
          ].map((item) => (
            <div key={item} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                {/* Replace with actual icons */}
                <span className="text-3xl">🔧</span>
              </div>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
