import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  type: "product" | "nft";
  imageUrl: string;
  onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  tags,
  type,
  imageUrl,
  onRemove,
}) => {
  const isNFT = type === "nft";
  const priceColor = isNFT ? "text-lime-green-500" : "text-vivid-pink-500";
  const tagColor = isNFT ? "bg-lime-green-200 text-lime-green-700" : "bg-vivid-pink-200 text-vivid-pink-700";
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

        {/* Tags */}
        <div className="flex gap-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-sm rounded-lg ${tagColor}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className={`mt-2 text-xl font-semibold ${priceColor}`}>
          {price} DOT
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className={`p-2 rounded-full cursor-pointer transition-all ${trashColor}`}
        aria-label="Remove item"
      >
        <Trash2 className={`w-6 h-6 ${trashColor}`} />
      </button>
    </div>
  );
};

export default CartItem;