import { type ProductProps } from "@/types/cards"
import { ShieldCheck, MessageCircle, ShoppingCart } from 'lucide-react';
import Image from "next/image";

const ProductCard = ({ name, price, trustIndex, imageUrl }: ProductProps) => {

    return (
        <div className="flex flex-col w-96 h-112 items-center justify-between rounded-t-2xl rounded-r-2xl gap-[1.5rem]">
            <div className="relative w-96 h-96 rounded-2xl overflow-hidden">
                <Image src={imageUrl} alt={name} fill className="object-cover" />
                <div className="absolute top-4 right-4 flex gap-4 z-10">
                    <button className="cursor-pointer rounded-lg p-2 border-vivid-pink-600 dark:border-vivid-pink-400 border-2 bg-transparent">
                        <MessageCircle className="w-8 h-8 text-vivid-pink-600 dark:text-vivid-pink-400 fill-current stroke-none" />
                    </button>
                    <button className="cursor-pointer rounded-lg p-2 border-vivid-pink-600 dark:border-vivid-pink-400 border-2 bg-vivid-pink-600 dark:bg-vivid-pink-400">
                        <ShoppingCart className="w-8 h-8 text-white-500" />
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="text-[2rem] font-medium text-black-500 dark:text-white-500">{name}</p>
                        <ShieldCheck className="w-9 h-[2.063rem] text-vivid-pink-600 dark:text-vivid-pink-400"/>
                    </div>
                    <p className="text-[1rem] text-black-500 dark:text-white-500 font-medium">{trustIndex}% Trust Index</p>
                </div>
                <p className="text-[2rem] font-medium text-vivid-pink-600 dark:text-vivid-pink-400">{price} DOT</p>
            </div>
        </div>
    );
};

export default ProductCard;