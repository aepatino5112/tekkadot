import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TekkaDot - NFTs",
  description: "TekkaDot is a Web3-powered e-commerce platform offering the latest in laptops, gaming consoles, wearables, smartphones, and exclusive NFTs. Experience secure blockchain transactions, wallet-based access, and true digital ownership—all in one futuristic marketplace. Shop cutting-edge tech and collect verified digital assets with confidence."
};

export default function NFTsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Apply the nft background at the route layout level so the entire NFTs
  // page uses the `nft-background` defined in globals.css without changing
  // any global/background styles or dark-mode logic.
  return (
    <section className="nft-background min-h-screen flex flex-col">
        <Navbar variant="nfts" />
          <main className="grow">{children}</main>
        <Footer variant="nfts" />
    </section>
  );
}