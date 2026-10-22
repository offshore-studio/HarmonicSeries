import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_BASE_PATH
    ? "https://offshore.studio/harmonic-series"
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl),
  title: {
    default: "Harmonic Series Lab",
    template: "%s · Harmonic Series",
  },
  description:
    "Open-source compensated summation for the harmonic series — CPU, CUDA turbo, Euler–Maclaurin estimation toward sum=40.",
  openGraph: {
    title: "Harmonic Series Lab",
    description:
      "GPU-accelerated harmonic series summation, benchmarks, and cluster scaling estimates.",
    type: "website",
    siteName: "Harmonic Series",
  },
  twitter: {
    card: "summary",
    title: "Harmonic Series Lab",
    description:
      "Open-source compensated summation — CPU, CUDA, and estimation toward sum=40.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="bg-atmosphere" aria-hidden />
        <div className="grain" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-base"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
