import { type CollectionCardProps } from "@/types/cards";
import Image from "next/image";

const CollectionCard = ({ name }: CollectionCardProps) => {

    return (
        <div className="relative aspect-video w-full cursor-pointer max-w-sm lg:max-w-106">
            <Image 
                src={`/collections/${name}.svg`}
                alt={`${name} image`}
                fill
                className="object-cover"
            />
        </div>
    );
};

export default CollectionCard;