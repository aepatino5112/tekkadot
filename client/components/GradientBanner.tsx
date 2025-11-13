import Image from "next/image";
import { GradientBannerProps } from "@/types/gradientBanner";

const GradientBanner = ({ variant }: GradientBannerProps) => {

    return (
        <div className="relative aspect-16/1 lg:aspect-21/1 mb-[1rem] lg:mb-[2rem] rounded-2xl overflow-hidden w-full">
            <Image 
                src={`/gradients/${variant}-gradient.svg`}
                alt={`${variant} gradient banner`}
                fill
                className="object-cover"
            />
        </div>
    );
};

export default GradientBanner;