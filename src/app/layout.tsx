import type { Metadata, Viewport } from "next";
import { Domine, Work_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AffiliateClickTracker } from "@/components/analytics/affiliate-click-tracker";

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
    default: "BP Central - Blood pressure log for iPhone and Android",
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
    title: "BP Central - Blood pressure log for iPhone and Android",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BP Central" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BP Central - Blood pressure log for iPhone and Android",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
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
