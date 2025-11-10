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
    <Link href={`/details/nft/${id}`}>
      <div className="flex flex-col w-full min-w-0 items-center justify-between rounded-t-2xl rounded-r-2xl gap-[1.5rem]">
        {/* responsive square image */}
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
            <button className="cursor-pointer rounded-lg p-2 border-lime-green-600 dark:border-lime-green-400 border-2 bg-transparent">
              <MessageCircle className="w-8 h-8 text-lime-green-600 dark:text-lime-green-400 fill-current stroke-none" />
            </button>
            <button className="cursor-pointer rounded-lg p-2 border-lime-green-600 dark:border-lime-green-400 border-2 bg-lime-green-600 dark:bg-lime-green-400">
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
            </div>
            <div className="flex justify-start items-center gap-2 mt-1 flex-wrap">
              <p className="text-[0.875rem] font-medium text-lime-green-600 dark:text-lime-green-400 px-2 py-0.5 border-2 border-lime-green-600 dark:border-lime-green-400 bg-lime-green-100/50 rounded-xl">
                {rareness}
              </p>
              <p className="text-[0.875rem] font-medium text-black-400 dark:text-white-400 px-2 py-0.5 border-2 border-black-400 dark:border-white-400 bg-black-500/50 dark:bg-white-500/50 rounded-xl">
                {category}
              </p>
            </div>
          </div>
          <p className="text-200 lg:text-300 font-medium text-lime-green-600 dark:text-lime-green-400 whitespace-nowrap ml-3">
            {price} DOT
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
