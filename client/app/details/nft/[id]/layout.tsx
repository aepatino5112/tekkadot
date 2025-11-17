import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WalletProvider } from "@/components/WalletProvider";

export const metadata: Metadata = {
  title: "TekkaDot - Details",
  description:
    "TekkaDot is a Web3-powered e-commerce platform offering the latest in laptops, gaming consoles, wearables, smartphones, and exclusive NFTs. Experience secure blockchain transactions, wallet-based access, and true digital ownership—all in one futuristic marketplace. Shop cutting-edge tech and collect verified digital assets with confidence.",
};

export default function DetailsNFTLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="nft-background min-h-screen flex flex-col">
        <WalletProvider>
          <Navbar variant="nfts"/>
          <main className="grow">{children}</main>
          <Footer variant="nfts"/>
        </WalletProvider>
    </section>
  );
}
