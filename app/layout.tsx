import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = `${site.firstName} “${site.nickname}” ${site.lastName} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.tagline,
  authors: [{ name: site.fullName, url: site.githubUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: site.tagline,
    siteName: `${site.nickname} Simondac`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-dvh">
        {/* Scroll reveals start hidden and are shown by script. */}
        <noscript>
          <style>{`.reveal,.hero-name{visibility:visible!important;opacity:1!important;animation:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
