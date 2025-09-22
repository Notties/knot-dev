import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ViewTransitions } from "next-view-transitions";
import Providers from "./providers";

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
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
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
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        alt: "Software developer in Thailand specializing in creating web applications, mobile applications",
        secureUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1200,
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
