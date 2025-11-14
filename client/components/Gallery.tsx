import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const Gallery = ({
  images,
  type,
}: {
  images: string[];
  type: "nft" | "product";
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const isNFT = type === "nft";
  const iconColor = isNFT ? "lime-green-500" : "vivid-pink-500";

  return (
    <div className="flex flex-col items-center w-full max-w-[40rem] mx-auto">
      {/* Main Image */}
      <div className="relative w-full h-[30rem] sm:h-[40rem] rounded-lg overflow-hidden shadow-lg">
        {/* Inner Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>
        <img
          src={images[selectedImage]}
          alt={`Image ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Message Circle Icon */}
        <button
          className={`absolute top-4 right-4 cursor-pointer rounded-lg p-2 border-2 ${
            isNFT
              ? "border-lime-green-500 dark:border-lime-green-500"
              : "border-vivid-pink-500 dark:border-vivid-pink-500"
          } bg-transparent`}
        >
          <MessageCircle
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              isNFT
                ? "text-lime-green-500 dark:text-lime-green-500"
                : "text-vivid-pink-500 dark:text-vivid-pink-500"
            }`}
          />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 sm:gap-4 mt-4 w-full">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-1 h-[4rem] sm:h-[5rem] rounded-lg overflow-hidden ${
              selectedImage === index
                ? "ring-2 ring-offset-2 ring-black dark:ring-white"
                : ""
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
