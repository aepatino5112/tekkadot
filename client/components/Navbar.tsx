"use client";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
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
          <button
            className="cursor-pointer hidden sm:inline-flex"
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
          >
            {mounted && darkTheme ? (
              <Moon color="#F3F4F6" className="w-[2.3125rem] h-[2.3125rem]" />
            ) : (
              <Sun color="#17050B" className="w-[2.3125rem] h-[2.3125rem]" />
            )}
          </button>

          {/* Connect button visible on desktop, hidden in mobile header (will appear in mobile menu) */}
          <div className="hidden md:block">
            <ConnectBtn onClick={() => setIsWalletModalOpen(true)} />
          </div>

          {/* Mobile burger button */}
          <button
            className="md:hidden p-2"
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

      {/* Mobile menu overlay / drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-50 flex">
          {/* dimmed backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* drawer */}
          <div className="relative ml-auto w-[82%] max-w-xs bg-white dark:bg-zinc-900 h-full p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/tekka-red.svg"
                  alt="logo"
                  width={120}
                  height={32}
                  className="block dark:hidden"
                />
                <Image
                  src="/logos/tekka-red-dark.svg"
                  alt="logo dark"
                  width={120}
                  height={32}
                  className="hidden dark:block"
                />
              </div>
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-lg">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/nfts" onClick={() => setIsMobileMenuOpen(false)}>
                NFTs
              </Link>
              <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDarkTheme(!darkTheme);
                  }}
                  className="flex items-center gap-2 p-2 rounded"
                  aria-label="Toggle theme"
                >
                  {mounted && darkTheme ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  <span className="text-sm">
                    {darkTheme ? "Dark" : "Light"}
                  </span>
                </button>
                <button
                  className="ml-auto p-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-hidden
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              <div>
                <ConnectBtn
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWalletModalOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
