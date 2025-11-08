"use client";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from 'lucide-react';
import GradientText from './GradientText'
import ConnectBtn from "./ConnectBtn";
import { useEffect, useState, useLayoutEffect, startTransition } from "react";

const Navbar: React.FC = () => {
    // Always start with false to match server render (prevents hydration mismatch)
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    // Read theme from DOM (set by script tag) after mount to sync state
    useLayoutEffect(() => {
        // Script tag already set the class, so read from DOM
        const isDark = document.documentElement.classList.contains("dark");
        startTransition(() => {
            setDarkTheme(isDark);
            setMounted(true);
        });
    }, []);

    // Apply theme to DOM and sync with localStorage when darkTheme changes
    useEffect(() => {
        if (!mounted) return; // Don't run on initial mount
        
        const root = window.document.documentElement;

        if (darkTheme) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkTheme, mounted]);


    return (
        <header>
            <nav className="navbar">
                <div className="relative">
                    <Image src="/logos/tekka-red.svg" alt="TekkaDot Light theme logo" width={155.48} height={42} className="block dark:hidden" />
                    <Image src="/logos/tekka-red-dark.svg" alt="TekkaDot Light theme logo" width={155.48} height={42} className="hidden dark:block" />
                </div>
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
                    <button
                        onClick={() => setDarkTheme(!darkTheme)}
                        className="cursor-pointer"
                        aria-label={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {mounted && darkTheme ? (
                            <Moon color="#F3F4F6" className="w-[37px] h-[37px]"/>
                        ) : (
                            <Sun color="#17050B" className="w-[37px] h-[37px]"/>
                        )}
                    </button>
                    <ConnectBtn />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
