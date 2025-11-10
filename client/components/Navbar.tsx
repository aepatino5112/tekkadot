"use client";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon, Search, Menu, X, Wallet } from "lucide-react";
import GradientText from "./GradientText";
import ConnectBtn from "./ConnectBtn";
import Wallets from "./Wallets";
import { useEffect, useState, useLayoutEffect, startTransition } from "react";

const Navbar = () => {
  // Always start with false to match server render (prevents hydration mismatch)
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

  // new: mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  // Handle ESC key to close wallet modal and prevent body scroll when modal is open
  useEffect(() => {
    if (isWalletModalOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Handle ESC key press
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsWalletModalOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isWalletModalOpen]);

  // Handle ESC key and body scroll for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileMenuOpen(false);
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <header>
      <nav className="navbar flex items-center justify-between px-4 py-3 md:px-8">
        <div className="relative flex items-center gap-4">
          <Image
            src="/logos/tekka-red.svg"
            alt="TekkaDot Light theme logo"
            width={155.48}
            height={42}
            className="block dark:hidden"
          />
          <Image
            src="/logos/tekka-red-dark.svg"
            alt="TekkaDot Light theme logo"
            width={155.48}
            height={42}
            className="hidden dark:block"
          />
        </div>

        {/* Desktop links - hidden on mobile */}
        <div className="links hidden md:flex gap-6 items-center text-sm md:text-base lg:text-lg">
          <Link href="/">
            <GradientText
              colors={["#ff2670", "#87de3c", "#ff2670", "#87de3c"]}
              animationSpeed={6}
              showBorder={false}
              className="custom-class"
            >
              Home
            </GradientText>
          </Link>
          <Link href="/products">Products</Link>
          <Link href="/nfts">NFTs</Link>
          <Link href="/about-us">About Us</Link>
        </div>

        <div className="connect-btn flex items-center gap-3">
          {/* Keep search and theme toggle on the navbar when burger is closed */}
          {!isMobileMenuOpen && (
            <>
              <button
                className="cursor-pointer p-2"
                onClick={() => true}
                aria-label="Search"
              >
                <Search className="w-[2.3125rem] h-[2.3125rem] text-black-500 dark:text-white-500" />
              </button>

              <button
                onClick={() => setDarkTheme(!darkTheme)}
                className="cursor-pointer p-1 rounded"
                aria-label={
                  darkTheme ? "Switch to light mode" : "Switch to dark mode"
                }
                aria-pressed={darkTheme}
              >
                {/* overlapping icons that animate via globals.css */}
                <span className="theme-toggle" aria-hidden={false}>
                  <Sun
                    color="#17050B"
                    className={
                      mounted && !darkTheme ? "icon-show" : "icon-hide"
                    }
                  />
                  <Moon
                    color="#F3F4F6"
                    className={mounted && darkTheme ? "icon-show" : "icon-hide"}
                  />
                </span>
              </button>
            </>
          )}

          {/* Connect button visible on desktop, hidden in mobile header (will appear in mobile menu top) */}
          <div className="hidden md:block">
            <ConnectBtn onClick={() => setIsWalletModalOpen(true)} />
          </div>

          {/* Mobile burger button */}
          <button
            className="md:hidden p-2 text-black dark:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Wallet Modal with Overlay */}
      {isWalletModalOpen && (
        <div
          className="wallet-modal-overlay fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          onClick={() => setIsWalletModalOpen(false)}
        >
          <div
            className="wallet-modal-container bg-white dark:bg-zinc-900 rounded-lg p-6 w-[min(420px,96%)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Wallets onClose={() => setIsWalletModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile menu - full screen split: top area = main color (logo, connect icon+text, close), bottom area = page bg (light/dark) with links */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden
          />

          {/* content container (stacked) */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Top bar: main brand color */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ backgroundColor: "#ff2670" }} /* main color */
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/tekka-red.svg"
                  alt="logo"
                  width={140}
                  height={36}
                  className="block dark:hidden"
                />
                <Image
                  src="/logos/tekka-red-dark.svg"
                  alt="logo dark"
                  width={140}
                  height={36}
                  className="hidden dark:block"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* simplified connect wallet (no background) */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWalletModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-white bg-transparent p-0"
                  aria-label="Connect Wallet"
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-sm font-medium">Connect Wallet</span>
                </button>

                <button
                  className="p-2 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Menu options area: uses page background depending on theme and is scrollable */}
            <div className="flex-1 overflow-auto bg-white dark:bg-zinc-950 px-6 py-8">
              <nav className="flex flex-col gap-8 items-start">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-semibold text-tekka-dark dark:text-white"
                >
                  <GradientText
                    colors={["#ff2670", "#87de3c", "#ff2670", "#87de3c"]}
                    animationSpeed={6}
                    showBorder={false}
                    className="text-4xl"
                  >
                    Home
                  </GradientText>
                </Link>

                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-medium text-black dark:text-white"
                >
                  Products
                </Link>

                <Link
                  href="/nfts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-medium text-black dark:text-white"
                >
                  NFTs
                </Link>

                <Link
                  href="/about-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-medium text-black dark:text-white"
                >
                  About Us
                </Link>
              </nav>

              {/* spacing at bottom; removed search, theme toggle and connect from the menu options per request */}
              <div className="h-20" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
