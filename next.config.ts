import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /free-download and /free-blood-pressure-log-pdf both offered the same
      // printable log, which split the keyword and left two thin pages. The PDF
      // URL is the one people search for, so it keeps the content and this one
      // sends its traffic there. Permanent, so the link equity follows.
      {
        source: '/free-download',
        destination: '/free-blood-pressure-log-pdf',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
