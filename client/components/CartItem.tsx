import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/context/CartContext"; // Import the correct type

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { id, name, price, imageUrl, type } = item;

  const isNFT = type === "nft";
  const priceColor = isNFT ? "text-lime-green-500" : "text-vivid-pink-500";
  const tagColor = isNFT
    ? "bg-lime-green-200 text-lime-green-700"
    : "bg-vivid-pink-200 text-vivid-pink-700";
  const trashColor = isNFT ? "text-lime-green-700" : "text-vivid-pink-700";

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white-400 dark:bg-black-800 border border-white-600 dark:border-black-400 w-full">
      {/* Image */}
      <div className="relative w-[5rem] h-[5rem] rounded-lg overflow-hidden">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1">
        {/* Name */}
        <h3 className="text-lg font-medium text-black-500 dark:text-white-500">
          {name}
        </h3>

        {/* Tags - Conditional Rendering */}
        <div className="flex flex-wrap gap-2 mt-1">
          {type === "nft" && (
            <>
              <span className={`px-2 py-1 text-xs rounded-lg ${tagColor}`}>
                {item.rareness}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200`}
              >
                {item.category}
              </span>
            </>
          )}
        </div>

        {/* Price */}
        <p className={`mt-2 text-xl font-semibold ${priceColor}`}>
          {price} DOT
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className={`p-2 rounded-full cursor-pointer transition-all ${trashColor}`}
        aria-label="Remove item"
      >
        <Trash2 className={`w-6 h-6 ${trashColor}`} />
      </button>
    </div>
  );
};

export default CartItem;
