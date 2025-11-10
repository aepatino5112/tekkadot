import Link from "next/link";
import Image from "next/image";

const FooterProducts = () => {

    return (
        <footer className="footer">
            <div className="relative flex flex-col items-start">
                <Image src="/logos/tekka-red.svg" alt="TekkaDot products light logo" width={278} height={75.14} className="block pb-9 dark:hidden" />
                <Image src="/logos/tekka-red-dark.svg" alt="TekkaDot products dark logo" width={278} height={75.14} className="hidden pb-9 dark:block" />
                <p className="text-300 font-normal leading-7 text-black-500 dark:text-white-500">We are a tech shop dedicated to offer you the</p>
                <p className="text-300 font-normal leading-7 pb-6 text-black-500 dark:text-white-500">best tech for the best prices in the market.</p>
                <p className="paragraph-lg font-light text-black-500 dark:text-white-500">© 2025 TekkaDot. All rights reserved.</p>
            </div>
            <div className="flex justify-between items-start gap-30">
                <div className="footer-item mr-10">
                    <h5 className="text-vivid-pink-500 font-bold">MARKETPLACE</h5>
                    <Link href="products"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Products</p></Link>
                    <Link href="nfts"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">NFTs</p></Link>
                    <Link href="/tutorial"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">How It Works</p></Link>
                </div>
                <div className="footer-item mr-10">
                    <h5 className="text-vivid-pink-500 font-bold">ABOUT US</h5>
                    <Link href="about-us"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Who are we</p></Link>
                    <Link href="/mission"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Our mission</p></Link>
                    <Link href="/vission"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Our vission</p></Link>
                    <Link href="/allies"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Our allies</p></Link>
                </div>
                <div className="footer-item mr-10">
                    <h5 className="text-vivid-pink-500 font-bold">LEGAL</h5>
                    <Link href="/service-terms"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Terms of Service</p></Link>
                    <Link href="/privacy-policy"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Privacy Policy</p></Link>
                    <Link href="/disclaimer"><p className="paragraph-lg font-light text-black-500 dark:text-white-500">Disclaimer</p></Link>
                </div>
            </div>
        </footer>
    );
};

export default FooterProducts;