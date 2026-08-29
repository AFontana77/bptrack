import type { Metadata, Viewport } from "next";
import { Domine, Work_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AffiliateClickTracker } from "@/components/analytics/affiliate-click-tracker";
import { PRODUCT, SIBLING } from "@/lib/product";

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

const SITE_URL = "https://bptrack.app";

const DESCRIPTION =
  "BP Central is a blood pressure log for your phone. Save each reading, see your 7, 30 and 90 day trends, and send a plain summary to your doctor. First 10 readings free, then $6.99 once. No subscription.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BP Central - Blood pressure log and tracker app for your phone",
    template: "%s | BP Central",
  },
  description: DESCRIPTION,
  keywords: [
    "blood pressure log",
    "blood pressure tracker app",
    "blood pressure app",
    "hypertension log",
    "home blood pressure monitoring",
    "blood pressure chart",
  ],
  authors: [{ name: "Anvil Road LLC" }],
  creator: "Anvil Road LLC",
  publisher: "Anvil Road LLC",
  applicationName: "BP Central",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BP Central",
    title: "BP Central - Blood pressure log and tracker app for your phone",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BP Central" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BP Central - Blood pressure log and tracker app for your phone",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  icons: {
    // Sizes declared here must match the files. /favicon.png was a 32px asset
    // declared as 64x64, which is the kind of thing that silently ships a
    // blurry tab icon. The SVG is listed first so modern browsers take the
    // vector and stay sharp at any density; the PNGs are the fallback ladder.
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#A20519",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${domine.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {/*
          Organization and WebSite, once, on every page.
          
          Twelve of sixteen pages carried no structured data at all before this,
          so nothing on the site told a search engine who publishes it or how
          the two properties relate. `publishingPrinciples` points at the page
          that explains how monitors get on the list, and `sameAs` names the
          sister property rather than leaving the relationship to be guessed at.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: PRODUCT.publisher,
                  url: SITE_URL,
                  logo: `${SITE_URL}/icons/icon-192.png`,
                  sameAs: [SIBLING.url],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: PRODUCT.name,
                  url: SITE_URL,
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: "en-US",
                  publishingPrinciples: `${SITE_URL}/validated-blood-pressure-monitors`,
                },
              ],
            }),
          }}
        />
        <AffiliateClickTracker />
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
