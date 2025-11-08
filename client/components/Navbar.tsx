"use client";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from 'lucide-react';
import GradientText from './GradientText'
import ConnectBtn from "./ConnectBtn";
import Wallets from "./Wallets";
import { useEffect, useState, useLayoutEffect, startTransition } from "react";

const Navbar = () => {
    // Always start with false to match server render (prevents hydration mismatch)
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

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

    // Handle ESC key to close modal and prevent body scroll when modal is open
    useEffect(() => {
        if (isWalletModalOpen) {
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            
            // Handle ESC key press
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setIsWalletModalOpen(false);
                }
            };
            
            document.addEventListener('keydown', handleEscape);
            
            return () => {
                document.body.style.overflow = 'unset';
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isWalletModalOpen]);


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
                    <ConnectBtn onClick={() => setIsWalletModalOpen(true)} />
                </div>
            </nav>
            
            {/* Wallet Modal with Overlay */}
            {isWalletModalOpen && (
                <div className="wallet-modal-overlay" onClick={() => setIsWalletModalOpen(false)}>
                    <div className="wallet-modal-container" onClick={(e) => e.stopPropagation()}>
                        <Wallets onClose={() => setIsWalletModalOpen(false)} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
