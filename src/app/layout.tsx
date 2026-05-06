import type { Metadata, Viewport } from "next";
import { Domine, Work_Sans } from "next/font/google";
import "./globals.css";

const domine = Domine({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

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
  themeColor: "#7A1F2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${domine.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
