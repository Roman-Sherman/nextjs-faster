import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SearchDropdownComponent } from "@/components/search-dropdown";
import { MenuIcon } from "lucide-react";
import { Suspense } from "react";
import { Cart } from "@/components/cart";
import { AuthServer } from "./auth.server";
import { Link } from "@/components/ui/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { WelcomeToast } from "./welcome-toast";

const helvetica = localFont({
  src: "./fonts/HelveticaNeueLTPro-Md.woff",
  variable: "--font-helvetica",
});
const helveticaRoman = localFont({
  src: "./fonts/HelveticaNeueLTPro-Roman.woff",
  variable: "--font-helvetica-roman",
});

const futura = localFont({
  src: "./fonts/FuturaLTPro-BoldCond.woff2",
  variable: "--font-futura",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NextMaster",
    default: "NextMaster",
  },
  description: "A performant site built with Next.js",
};

// revalidate the data at most every day
export const revalidate = 86400;

// commented out due to accessibility issues
// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
//   minimumScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${helvetica.variable} ${helveticaRoman.variable} ${futura.variable} flex min-h-full flex-col overflow-y-hidden antialiased`}
      >
        <header className="sticky top-0 z-10 flex w-[100vw] flex-grow flex-col items-center justify-between gap-4 border-b-2 border-yellow-300 bg-background p-2 pb-[4px] pt-2 font-futura sm:flex-row sm:p-4 sm:pb-[4px] sm:pt-0">
          <div className="flex flex-grow flex-col">
            <div className="flex w-full justify-end px-4 pt-2 font-sans text-sm hover:underline">
              <Suspense
                fallback={
                  <button className="flex flex-row items-center gap-1">
                    <div className="h-[20px]" />
                    <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]">
                      <polygon points="0,0 5,6 10,0"></polygon>
                    </svg>
                  </button>
                }
              >
                <AuthServer />
              </Suspense>
            </div>
            <div className="flex w-full items-center justify-center sm:w-auto">
              <Link
                prefetch={true}
                href="/"
                className="text-4xl font-bold text-green-800"
              >
                NextMaster
              </Link>
              <div className="items flex w-full flex-row items-center justify-between gap-4">
                <div className="mx-0 flex-grow sm:mx-auto sm:flex-grow-0">
                  <SearchDropdownComponent />
                </div>
                <div className="flex flex-row justify-between space-x-4">
                  <div className="relative">
                    <Link
                      prefetch={true}
                      href="/order"
                      className="text-lg text-green-800 hover:underline"
                    >
                      ORDER
                    </Link>
                    <Suspense>
                      <Cart />
                    </Suspense>
                  </div>
                  <Link
                    prefetch={true}
                    href="/order-history"
                    className="hidden text-lg text-green-800 hover:underline md:block"
                  >
                    ORDER HISTORY
                  </Link>
                  <Link
                    prefetch={true}
                    href="/order-history"
                    aria-label="Order History"
                    className="block text-lg text-green-800 hover:underline md:hidden"
                  >
                    <MenuIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}
        <footer className="sticky bottom-0 flex h-auto flex-col items-center justify-between space-y-2 border-t border-gray-400 bg-background px-4 font-helvetica text-[11px] sm:h-6 sm:flex-row sm:space-y-0">
          <div className="flex flex-wrap justify-center space-x-2 pt-2 sm:justify-start">
            <span className="hover:bg-yellow-100 hover:underline">Home</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Location
            </span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">Returns</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">Careers</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Mobile App
            </span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Solidworks Add-In
            </span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">Help</span>
            <span>|</span>
            <span className="hover:bg-yellow-100 hover:underline">
              Settings
            </span>
          </div>
          <div className="text-center sm:text-right">
            By using this website, you agree to check out the{" "}
            <Link
              href="https://git.new/NextMaster"
              className="font-bold hover:underline"
              target="_blank"
            >
              Source Code
            </Link>
          </div>
        </footer>
        {/* does putting this in suspense do anything? */}
        <Suspense fallback={null}>
          <Toaster closeButton />
          <WelcomeToast />
        </Suspense>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
