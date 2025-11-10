import Image from "next/image";
import { type HeroImages } from "@/types/heroImages";

const imageList: HeroImages[] = [
    { src:"/hero/playstation5.svg", alt:"playstation 5", background: "/images/product.svg" },
    { src:"/hero/corneta.svg", alt:"corneta", background: "/images/product.svg" },
    { src:"/hero/switch.svg", alt:"switch", background: "/images/product.svg" },
    { src:"/hero/boredape.svg", alt:"bored ape", background: "/images/nft.svg" },
    { src:"/hero/laptop.svg", alt:"laptop", background: "/images/product.svg" },
    { src:"/hero/headset.svg", alt:"headset", background: "/images/product.svg" },
    { src:"/hero/dualsense.svg", alt:"dualsense", background: "/images/product.svg" }
];

const AnimatedViewport = () => {
    const imageHeight = '42rem';

    return (
        <div className="w-152 rounded-2xl relative overflow-hidden" style={{ height: imageHeight }}>
            {/* Default background: static */}
            <Image
                src="/images/product.svg"
                alt="default background"
                fill
                className="object-cover absolute inset-0"
                priority
            />

            {/* Special background: only visible during its segment */}
            <Image
                src="/images/nft.svg"
                alt="nft background"
                fill
                className="object-cover absolute inset-0 opacity-0 animate-nft-bg"
            />

            <div 
                className="absolute animate-slide flex flex-col top-0 left-0 right-0"
                style={{ '--image-height': imageHeight } as React.CSSProperties}
            >
                {imageList.map((img, index) => (
                    <div key={index} className="w-full relative shrink-0" style={{ height: imageHeight }}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className={`object-contain relative z-10 ${index === 3 ? "scale-[0.50]" : ""}`}
                        />
                    </div>
                ))}
                {imageList.map((img, index) => (
                    <div key={`repeat-${index}`} className="w-full relative shrink-0" style={{ height: imageHeight }}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className={`object-contain relative z-10 ${index === 3 ? "scale-[0.50]" : ""}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedViewport;