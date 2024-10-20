import { NextRequest, NextResponse } from "next/server";
import { parseHTML } from "linkedom";

export const dynamic = "force-static";

export async function GET(
  _: NextRequest,
  { params }: { params: { rest: string[] } },
) {
  const schema = process.env.NODE_ENV === "development" ? "http" : "https";
  const host =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : process.env.VERCEL_URL;
  const href = (await params).rest.join("/");
  if (!href) {
    return new Response("Missing url parameter", { status: 400 });
  }
  const url = `${schema}://${host}/${href}`;
  const response = await fetch(url);
  if (!response.ok) {
    return new Response("Failed to fetch", { status: response.status });
  }
  const body = await response.text();
  const { document } = parseHTML(body);
  const images = Array.from(document.querySelectorAll("main img")).map(
    (img) => ({
      srcset: img.getAttribute("srcset"),
      sizes: img.getAttribute("sizes"),
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt"),
    }),
  );
  return NextResponse.json({ images });
}
