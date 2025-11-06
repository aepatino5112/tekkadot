import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "TekkaDot - The Decentralized Marketplace for Tech & NFTs",
  description: "TekkaDot is a Web3-powered e-commerce platform offering the latest in laptops, gaming consoles, wearables, smartphones, and exclusive NFTs. Experience secure blockchain transactions, wallet-based access, and true digital ownership—all in one futuristic marketplace. Shop cutting-edge tech and collect verified digital assets with confidence."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} product-background dark:product-background-dark min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
