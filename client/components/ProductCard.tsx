"use client";

import { type ProductProps } from "@/types/cards";
import { MessageCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/CartContext";
import { useWalletContext } from "@/context/WalletContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ProductCard = (props: ProductProps) => {
  console.log('ProductCard props:', props);
  const { id, name, price, imageUrl } = props;
  console.log('ProductCard name:', name);
  const router = useRouter();
  const { addToCart } = useCartContext();
  const { isConnected } = useWalletContext();
  const [imageError, setImageError] = useState(false);

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isConnected) {
      toast.error("Please connect your wallet to send a message.");
      return;
    }
    router.push("/profile?section=Messages");
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isConnected) {
      toast.error("Please connect your wallet to add items to the cart.");
      return;
    }
    // Pass the full props object, now including the 'type'
    addToCart({ ...props, type: "product" });
  };

  return (
    <Link href={`/details/product/${id}`} className="block w-full">
      <article className="flex flex-col w-full overflow-hidden">
        {/* Image (square) */}
        <div className="relative w-full" style={{ paddingTop: "100%" }}>
          {imageError || !imageUrl ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
              <Image
                src="/images/product.svg"
                alt="Product placeholder"
                width={64}
                height={64}
                className="opacity-50"
              />
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={name || "Product image"}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
              style={{ borderRadius: "1rem" }}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              onClick={handleMessageClick}
              className="cursor-pointer rounded-lg p-2 border-2 border-vivid-pink-600 dark:border-vivid-pink-400 bg-transparent"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-vivid-pink-600 dark:text-vivid-pink-400" />
            </button>
            <button
              onClick={handleAddToCartClick}
              className="cursor-pointer rounded-lg p-2 border-2 border-vivid-pink-600 dark:border-vivid-pink-400 bg-vivid-pink-600 dark:bg-vivid-pink-400"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Info row: name + trust (left), price (right) */}
        <div className="flex items-start justify-between gap-4 p-3">
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-medium text-black-500 dark:text-white-500 truncate">
              {name}
            </p>
          </div>

          <div className="flex flex-col items-end justify-between">
            <p className="text-lg sm:text-xl font-semibold text-vivid-pink-600 dark:text-vivid-pink-400 whitespace-nowrap">
              {price} DOT
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
