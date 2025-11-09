import Image from "next/image";
import { type HeroImages } from "@/types/heroImages";

const imageList: HeroImages[] = [
    { src:"/hero/playstation5.svg", alt:"playstation 5" },
    { src:"/hero/corneta.svg", alt:"corneta" },
    { src:"/hero/switch.svg", alt:"switch" },
    { src:"/hero/boredape.svg", alt:"bored ape" },
    { src:"/hero/laptop.svg", alt:"laptop" },
    { src:"/hero/headset.svg", alt:"headset" },
    { src:"/hero/dualsense.svg", alt:"dualsense" }
];

const AnimatedViewport = () => {
    const imageHeight = '29rem';

    return (
        <div className="w-[29rem] rounded-2xl relative overflow-hidden" style={{ height: imageHeight }}>
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
                            className="object-cover"
                        />
                    </div>
                ))}
                {imageList.map((img, index) => (
                    <div key={`repeat-${index}`} className="w-full relative shrink-0" style={{ height: imageHeight }}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedViewport;