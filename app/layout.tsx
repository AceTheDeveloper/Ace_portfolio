import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
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

const title = `${site.firstName} “${site.nickname}” ${site.lastName} | ${site.role}`;
const description = `${site.fullName} (“${site.nickname}”) is a software developer. ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: `${site.nickname} Simondac`,
  creator: site.fullName,
  authors: [{ name: site.fullName, url: site.githubUrl }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Google Search Console ownership check. Keep it, or the property loses verification.
  verification: { google: "EusYmgDL2NNmCKsiyXLDCFn7D-x7olDR6HCfV3_WzeA" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: `${site.nickname} Simondac`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/*
 * Marks the document as script-enabled before first paint. Scroll reveals only
 * hide their starting state under `.js`, so the server HTML stays fully
 * visible without JavaScript. If the reveal code has not started after 4s, the
 * class is removed again so nothing can stay hidden.
 */
const jsFlag = `document.documentElement.classList.add("js");setTimeout(function(){if(!window.__reveal)document.documentElement.classList.remove("js")},4000)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
