import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { SearchDropdownComponent } from "@/components/search-dropdown";
import { MenuIcon } from "lucide-react";
import { Suspense } from "react";
import { Cart } from "@/components/cart";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <style>
          {`@font-face{font-family:helvetica;src:url(/_next/static/media/1a987f7162e5c0cb-s.p.woff) format("woff");font-display:swap}@font-face{font-family:helvetica Fallback;src:local("Arial");ascent-override:68.07%;descent-override:27.26%;line-gap-override:19.07%;size-adjust:104.90%}.__className_e67eba{font-family:helvetica,helvetica Fallback}.__variable_e67eba{--font-helvetica:"helvetica","helvetica Fallback"}@font-face{font-family:helveticaRoman;src:url(/_next/static/media/a8795df4823f6cd1-s.p.woff) format("woff");font-display:swap}@font-face{font-family:helveticaRoman Fallback;src:local("Arial");ascent-override:70.43%;descent-override:28.21%;line-gap-override:19.73%;size-adjust:101.37%}.__className_39fc1a{font-family:helveticaRoman,helveticaRoman Fallback}.__variable_39fc1a{--font-helvetica-roman:"helveticaRoman","helveticaRoman Fallback"}@font-face{font-family:futura;src:url(/_next/static/media/01a184b686c42e5e-s.p.woff2) format("woff2");font-display:swap}@font-face{font-family:futura Fallback;src:local("Arial");ascent-override:92.79%;descent-override:28.50%;line-gap-override:43.06%;size-adjust:82.45%}.__className_95a50f{font-family:futura,futura Fallback}.__variable_95a50f{--font-futura:"futura","futura Fallback"}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*
! tailwindcss v3.4.14 | MIT License | https://tailwindcss.com
*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:root{--background:0 0% 100%;--foreground:0 0% 3.9%;--card:0 0% 100%;--card-foreground:0 0% 3.9%;--popover:0 0% 100%;--popover-foreground:0 0% 3.9%;--primary:0 0% 9%;--primary-foreground:0 0% 98%;--secondary:0 0% 96.1%;--secondary-foreground:0 0% 9%;--muted:0 0% 96.1%;--muted-foreground:0 0% 45.1%;--accent:0 0% 96.1%;--accent-foreground:0 0% 9%;--destructive:0 84.2% 60.2%;--destructive-foreground:0 0% 98%;--border:0 0% 89.8%;--input:0 0% 89.8%;--ring:0 0% 3.9%;--chart-1:12 76% 61%;--chart-2:173 58% 39%;--chart-3:197 37% 24%;--chart-4:43 74% 66%;--chart-5:27 87% 67%;--radius:0.5rem}*{border-color:hsl(var(--border))}body{background-color:hsl(var(--background));color:hsl(var(--foreground))}.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.absolute{position:absolute}.relative{position:relative}.-right-3{right:-.75rem}.-top-1{top:-.25rem}.right-2{right:.5rem}.right-7{right:1.75rem}.top-1\/2{top:50%}.top-2{top:.5rem}.top-2\.5{top:.625rem}.z-10{z-index:10}.col-span-2{grid-column:span 2/span 2}.mx-auto{margin-left:auto;margin-right:auto}.mb-2{margin-bottom:.5rem}.mt-1{margin-top:.25rem}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.h-10{height:2.5rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-2\.5{height:.625rem}.h-24{height:6rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-64{height:16rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-\[300px\]{height:300px}.h-auto{height:auto}.h-full{height:100%}.min-h-full{min-height:100%}.min-h-screen{min-height:100vh}.w-10{width:2.5rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-2\.5{width:.625rem}.w-24{width:6rem}.w-4{width:1rem}.w-48{width:12rem}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-64{width:16rem}.w-9{width:2.25rem}.w-\[180px\]{width:180px}.w-full{width:100%}.min-w-24{min-width:6rem}.min-w-48{min-width:12rem}.min-w-8{min-width:2rem}.max-w-\[150px\]{max-width:150px}.max-w-md{max-width:28rem}.max-w-screen-lg{max-width:1024px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.-translate-y-1\/2{--tw-translate-y:-50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.touch-none{touch-action:none}.select-none{user-select:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-2{gap:.5rem}.gap-4{gap:1rem}.gap-8{gap:2rem}.space-x-1>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.25rem * var(--tw-space-x-reverse));margin-left:calc(.25rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-10>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(2.5rem * var(--tw-space-x-reverse));margin-left:calc(2.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(.5rem * var(--tw-space-x-reverse));margin-left:calc(.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-1\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem * var(--tw-space-y-reverse))}.space-y-10>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2.5rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.whitespace-nowrap{white-space:nowrap}.rounded{border-radius:.25rem}.rounded-\[2px\]{border-radius:2px}.rounded-\[inherit\]{border-radius:inherit}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:var(--radius)}.rounded-md{border-radius:calc(var(--radius) - 2px)}.rounded-sm{border-radius:calc(var(--radius) - 4px)}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-l{border-left-width:1px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-t-2{border-top-width:2px}.border-black{--tw-border-opacity:1;border-color:rgb(0 0 0/var(--tw-border-opacity))}.border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}.border-gray-400{--tw-border-opacity:1;border-color:rgb(156 163 175/var(--tw-border-opacity))}.border-gray-500{--tw-border-opacity:1;border-color:rgb(107 114 128/var(--tw-border-opacity))}.border-green-800{--tw-border-opacity:1;border-color:rgb(22 101 52/var(--tw-border-opacity))}.border-input{border-color:hsl(var(--input))}.border-yellow-300{--tw-border-opacity:1;border-color:rgb(253 224 71/var(--tw-border-opacity))}.border-l-transparent{border-left-color:transparent}.border-t-transparent{border-top-color:transparent}.bg-background{background-color:hsl(var(--background))}.bg-border{background-color:hsl(var(--border))}.bg-card{background-color:hsl(var(--card))}.bg-destructive{background-color:hsl(var(--destructive))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.bg-green-800{--tw-bg-opacity:1;background-color:rgb(22 101 52/var(--tw-bg-opacity))}.bg-primary{background-color:hsl(var(--primary))}.bg-secondary{background-color:hsl(var(--secondary))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-yellow-300{--tw-bg-opacity:1;background-color:rgb(253 224 71/var(--tw-bg-opacity))}.bg-yellow-400{--tw-bg-opacity:1;background-color:rgb(250 204 21/var(--tw-bg-opacity))}.object-cover{object-fit:cover}.p-2{padding:.5rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.p-\[1px\]{padding:1px}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-8{padding-left:2rem;padding-right:2rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-4{padding-top:1rem}.pb-4,.py-4{padding-bottom:1rem}.pr-16{padding-right:4rem}.pr-2{padding-right:.5rem}.pt-0{padding-top:0}.pt-1{padding-top:.25rem}.pt-2{padding-top:.5rem}.pt-4{padding-top:1rem}.pt-8{padding-top:2rem}.text-center{text-align:center}.font-futura{font-family:var(--font-futura)}.font-helvetica{font-family:var(--font-helvetica)}.font-helvetica-roman{font-family:var(--font-helvetica-roman)}.font-sans{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.text-2xl{font-size:1.5rem;line-height:2rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-\[11px\]{font-size:11px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-tight{letter-spacing:-.025em}.tracking-tighter{letter-spacing:-.05em}.text-card-foreground{color:hsl(var(--card-foreground))}.text-destructive-foreground{color:hsl(var(--destructive-foreground))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity:1;color:rgb(75 85 99/var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81/var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgb(31 41 55/var(--tw-text-opacity))}.text-green-700{--tw-text-opacity:1;color:rgb(21 128 61/var(--tw-text-opacity))}.text-green-800{--tw-text-opacity:1;color:rgb(22 101 52/var(--tw-text-opacity))}.text-green-900{--tw-text-opacity:1;color:rgb(20 83 45/var(--tw-text-opacity))}.text-muted-foreground{color:hsl(var(--muted-foreground))}.text-primary{color:hsl(var(--primary))}.text-primary-foreground{color:hsl(var(--primary-foreground))}.text-secondary-foreground{color:hsl(var(--secondary-foreground))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.underline-offset-4{text-underline-offset:4px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgba(0,0,0,.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.outline{outline-style:solid}.ring-offset-background{--tw-ring-offset-color:hsl(var(--background))}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0) scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1)) rotate(var(--tw-enter-rotate,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0) scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1)) rotate(var(--tw-exit-rotate,0))}}body{font-family:Arial,sans-serif}@media (hover:hover){.hover\:bg-accent:hover{background-color:hsl(var(--accent))}.hover\:bg-destructive\/90:hover{background-color:hsl(var(--destructive)/.9)}.hover\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.hover\:bg-green-800:hover{--tw-bg-opacity:1;background-color:rgb(22 101 52/var(--tw-bg-opacity))}.hover\:bg-primary\/90:hover{background-color:hsl(var(--primary)/.9)}.hover\:bg-secondary\/80:hover{background-color:hsl(var(--secondary)/.8)}.hover\:bg-yellow-100:hover{--tw-bg-opacity:1;background-color:rgb(254 249 195/var(--tw-bg-opacity))}.hover\:bg-yellow-200:hover{--tw-bg-opacity:1;background-color:rgb(254 240 138/var(--tw-bg-opacity))}.hover\:text-accent-foreground:hover{color:hsl(var(--accent-foreground))}.hover\:underline:hover{text-decoration-line:underline}}.focus-visible\:outline-none:focus-visible{outline:2px solid transparent;outline-offset:2px}.focus-visible\:ring-2:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus-visible\:ring-ring:focus-visible{--tw-ring-color:hsl(var(--ring))}.focus-visible\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px}.disabled\:pointer-events-none:disabled{pointer-events:none}.disabled\:opacity-50:disabled{opacity:.5}@media (hover:hover){.group:hover .group-hover\:underline{text-decoration-line:underline}}@media (min-width:640px){.sm\:block{display:block}.sm\:hidden{display:none}.sm\:h-6{height:1.5rem}.sm\:w-\[300px\]{width:300px}.sm\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.sm\:flex-row{flex-direction:row}.sm\:justify-start{justify-content:flex-start}.sm\:space-y-0>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0px * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0px * var(--tw-space-y-reverse))}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:block{display:block}.md\:hidden{display:none}.md\:w-\[375px\]{width:375px}.md\:min-w-24{min-width:6rem}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.md\:flex-row{flex-direction:row}.md\:gap-4{gap:1rem}.md\:p-4{padding:1rem}.md\:text-base{font-size:1rem;line-height:1.5rem}}@media (min-width:1024px){.lg\:grid{display:grid}.lg\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}}.\[\&_svg\]\:pointer-events-none svg{pointer-events:none}.\[\&_svg\]\:size-4 svg{width:1rem;height:1rem}.\[\&_svg\]\:shrink-0 svg{flex-shrink:0}
`}
        </style>
      </head>
      <body
        className={`${helvetica.variable} ${helveticaRoman.variable} ${futura.variable} flex min-h-full flex-col antialiased`}
      >
        <div className="flex flex-grow flex-col">
          <header className="flex items-center justify-between gap-4 border-b-2 border-yellow-300 p-2 font-futura md:p-4">
            <div className="flex items-center space-x-4">
              <Link
                prefetch={true}
                href="/"
                className="hidden text-4xl font-bold text-green-800 sm:block"
              >
                NextMaster
              </Link>
              <Link
                prefetch={true}
                href="/"
                className="block text-4xl font-bold text-green-800 sm:hidden"
              >
                <div className="rounded-lg bg-yellow-400 px-3 pt-2 tracking-tighter">
                  N
                </div>
              </Link>
            </div>
            <SearchDropdownComponent />
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
          </header>
          {children}
        </div>
        <footer className="flex h-auto flex-col items-center justify-between space-y-2 border-t border-gray-400 px-4 font-helvetica text-[11px] sm:h-6 sm:flex-row sm:space-y-0">
          <div className="flex flex-wrap justify-center space-x-1 sm:justify-start">
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
              prefetch={true}
              href="https://github.com/ethanniser/NextMaster"
              className="font-bold hover:underline"
              target="_blank"
            >
              Source Code
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
