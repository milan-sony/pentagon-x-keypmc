import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import { Preloader } from "@/components/layout/preloader";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { home } from "@/content/home";
import { introHeadScript } from "@/lib/intro-script";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const title = `${home.company.shortName} | Project Management Consultancy in Abu Dhabi`;
const description =
  "Key International is a 100% Emirati project management consultancy in Abu Dhabi, a member of United National Holding. We represent clients from concept to handover.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the live domain so social previews resolve correctly.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  applicationName: home.company.shortName,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_AE",
    siteName: home.company.shortName,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#2e1a0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${cormorant.variable} ${cinzel.variable}`}
      // The head script may add the intro-skip attribute before hydration.
      suppressHydrationWarning
    >
      <head>
        {/* Decides before first paint whether the preloader plays (see src/lib/intro.ts). */}
        <script dangerouslySetInnerHTML={{ __html: introHeadScript }} />
      </head>
      <body>
        <SmoothScroll>
          <Preloader />
          {children}
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
