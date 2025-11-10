import { type ProductProps } from "@/types/cards";
import { ShieldCheck, MessageCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  id,
  name,
  price,
  trustIndex,
  imageUrl,
}: ProductProps) => {
  return (
    <Link href={`/details/product/${id}`}>
      <div className="flex flex-col w-full min-w-0 items-center justify-between rounded-t-2xl rounded-r-2xl gap-[1.5rem]">
        {/* keep image square and responsive */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ paddingTop: "100%" }}
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
          />
          <div className="absolute top-4 right-4 flex gap-4 z-10">
            <button className="cursor-pointer rounded-lg p-2 border-vivid-pink-600 dark:border-vivid-pink-400 border-2 bg-transparent">
              <MessageCircle className="w-8 h-8 text-vivid-pink-600 dark:text-vivid-pink-400 fill-current stroke-none" />
            </button>
            <button className="cursor-pointer rounded-lg p-2 border-vivid-pink-600 dark:border-vivid-pink-400 border-2 bg-vivid-pink-600 dark:bg-vivid-pink-400">
              <ShoppingCart className="w-8 h-8 text-white-500" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-start w-full min-w-0 px-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 min-w-0">
              <p className="text-200 lg:text-300 font-medium text-black-500 dark:text-white-500 truncate">
                {name}
              </p>
              <ShieldCheck className="w-9 h-[2.063rem] text-vivid-pink-600 dark:text-vivid-pink-400" />
            </div>
            <p className="text-[0.875rem] text-black-500 dark:text-white-500 font-medium">
              {trustIndex}% Trust Index
            </p>
          </div>
          <p className="text-200 lg:text-300 font-medium text-vivid-pink-600 dark:text-vivid-pink-400 whitespace-nowrap ml-3">
            {price} DOT
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
