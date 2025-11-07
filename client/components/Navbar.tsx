import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from 'lucide-react';
import GradientText from './GradientText'
import ConnectBtn from "./ConnectBtn";

const Navbar: React.FC = () => {

    return (
        <header>
            <nav className="navbar">
                <Image src="/logos/tekka-red.svg" alt="TekkaDot logo" width={155.38} height={42} />
                <div className="links">
                    <Link href="/"><GradientText
                        colors={["#ff2670", "#87de3c", "#ff2670", "#87de3c"]}
                        animationSpeed={6}
                        showBorder={false}
                        className="custom-class"
                        >
                        Home
                    </GradientText></Link>
                    <Link href="/products">Products</Link>
                    <Link href="/nfts">NFTs</Link>
                    <Link href="/about-us">About Us</Link>
                </div>
                <div className="connect-btn">
                    <Sun className="w-[37px] h-[37px]"/>
                    <ConnectBtn />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
