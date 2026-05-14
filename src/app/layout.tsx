import type { Metadata, Viewport } from "next";
import { Domine, Work_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
      <body className="min-h-full flex flex-col font-sans">
        {/* Google Tag Manager - GTM-TJRPT9N6 */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TJRPT9N6');`}
        </Script>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJRPT9N6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>{children}</body>
    </html>
  );
}
