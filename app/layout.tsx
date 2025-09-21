import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ViewTransitions } from "next-view-transitions";
import Providers from "./providers";
import "prismjs/themes/prism-tomorrow.css";

const noto_Sans_Thai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Knot",
    default: "Knot",
  },
  description:
    "Software developer in Thailand specializing in creating web applications, mobile applications",
  alternates: {
    canonical: `https://knot-dev.tech`,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "Knot",
    title: {
      template: "%s - Knot",
      default: "Knot",
    },
    description:
      "Software developer in Thailand specializing in creating web applications, mobile applications",
    images: [
      {
        url: "https://knot-dev.tech/og-image.png",
        alt: "Software developer in Thailand specializing in creating web applications, mobile applications",
        secureUrl: "https://knot-dev.tech/og-image.png",
        width: 800,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${noto_Sans_Thai.className} antialiased`}>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
