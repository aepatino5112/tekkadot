import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "TekkaDot - Disclaimer",
  description:
    "TekkaDot is a Web3-powered e-commerce platform offering the latest in laptops, gaming consoles, wearables, smartphones, and exclusive NFTs. Experience secure blockchain transactions, wallet-based access, and true digital ownership—all in one futuristic marketplace. Shop cutting-edge tech and collect verified digital assets with confidence.",
};

export default function DisclaimerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
    </section>
  );
}
