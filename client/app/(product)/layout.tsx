import React from "react";

export const metadata = {
  title: "Products - TekkaDot",
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  // Apply the product background only to routes inside the (product) group.
  // Keeping a min-h-screen container ensures the background covers the page area
  // but doesn't affect the root footer that is rendered by the root layout.
  return (
    <div className="product-background dark:product-background-dark min-h-screen flex flex-col">
      <main className="grow">{children}</main>
    </div>
  );
}
