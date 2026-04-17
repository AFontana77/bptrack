import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const SITE_URL = "https://www.bptrack.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BPTrack — Search blood pressure ranges",
    template: "%s | BPTrack",
  },
  description: "BPTrack pairs AHA/CDC reference tables with a daily reading log. Search normal ranges, track trends, and export a report for your doctor. Free on iPhone and Android.",
  keywords: ["blood pressure log", "blood pressure tracker app", "hypertension log", "bp log sheet", "blood pressure reading app"],
  authors: [{ name: "Anvil Road LLC" }],
  creator: "Anvil Road LLC",
  publisher: "Anvil Road LLC",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BPTrack",
    title: "BPTrack — Search blood pressure ranges",
    description: "BPTrack pairs AHA/CDC reference tables with a daily reading log. Search normal ranges, track trends, and export a report for your doctor. Free on iPhone and Android.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BPTrack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BPTrack — Search blood pressure ranges",
    description: "BPTrack pairs AHA/CDC reference tables with a daily reading log. Search normal ranges, track trends, and export a report for your doctor. Free on iPhone and Android.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#DC2626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
