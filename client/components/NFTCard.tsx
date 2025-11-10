import { type NFTProps } from "@/types/cards";
import { MessageCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NFTCard = ({
  id,
  name,
  price,
  rareness,
  category,
  imageUrl,
}: NFTProps) => {
  return (
    <Link href={`/details/nft/${id}`} className="block w-full">
      <article className="flex flex-col w-full overflow-hidden">
        {/* responsive square image */}
        <div className="relative w-full" style={{ paddingTop: "100%" }}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            style={{ borderRadius: "1rem" }}
          />
          <div className="absolute top-3 right-3 flex gap-3 z-10">
            <button
              aria-label="Message"
              className="cursor-pointer rounded-lg p-2 border-2 border-lime-green-600 dark:border-lime-green-400 bg-transparent"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-lime-green-600 dark:text-lime-green-400" />
            </button>
            <button
              aria-label="Add to cart"
              className="cursor-pointer rounded-lg p-2 border-2 border-lime-green-600 dark:border-lime-green-400 bg-lime-green-600 dark:bg-lime-green-400"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Info row: left = name + tags (stacked), right = price */}
        <div className="flex items-start justify-between gap-4 px-3 py-3">
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-medium text-black-500 dark:text-white-500 truncate">
              {name}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm font-medium text-lime-green-600 dark:text-lime-green-400 px-2 py-0.5 border-2 border-lime-green-600 dark:border-lime-green-400 bg-lime-green-100/50 rounded-xl">
                {rareness}
              </span>

              <span className="text-sm font-medium text-black-400 dark:text-white-400 px-2 py-0.5 border-2 border-black-400 dark:border-white-400 bg-black-500/50 dark:bg-white-500/50 rounded-xl">
                {category}
              </span>
            </div>
          </div>

          <div className="flex items-start justify-end ml-3 min-w-[72px]">
            <p className="text-lg sm:text-xl font-semibold text-lime-green-600 dark:text-lime-green-400 whitespace-nowrap">
              {price} DOT
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NFTCard;
