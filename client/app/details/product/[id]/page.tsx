"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Gallery from "@/components/Gallery";
import QuantitySelector from "@/components/QuantitySelector";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";

// Simulated database call
const fetchProductData = async (id: string) => {
  // Simulated product data
  const product = {
    id,
    name: "PlayStation 5",
    price: 202.5,
    status: "available",
    description:
      "The PlayStation 5, released by Sony in 2020, is a ninth-generation gaming console known for its futuristic design and powerful, custom-built hardware.",
    images: [
      "/images/playstation5.jpg",
      "/images/playstation5-2.jpg",
      "/images/playstation5-3.jpg",
    ],
  };

  // Simulated similar products data
  const similarProducts = [
    {
      id: "2",
      name: "Xbox Series X",
      price: 250.2,
      trustIndex: 85,
      imageUrl: "/images/xbox.jpg",
    },
    {
      id: "3",
      name: "Nintendo Switch",
      price: 300.8,
      trustIndex: 78,
      imageUrl: "/images/switch.jpg",
    },
    {
      id: "4",
      name: "iPhone 17",
      price: 632.5,
      trustIndex: 82,
      imageUrl: "/images/iphone.jpg",
    },
    {
      id: "5",
      name: "Samsung Galaxy S23",
      price: 500.0,
      trustIndex: 80,
      imageUrl: "/images/samsung.jpg",
    },
  ];

  return { product, similarProducts };
};

const ProductDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { product, similarProducts } = await fetchProductData(id);
      setProduct(product);
      setSimilarProducts(similarProducts);
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col w-full px-6 md:px-10 lg:px-16 py-8 min-w-0 overflow-x-hidden">
      {/* Back Arrow */}
      <button
        className="flex items-center gap-2 text-vivid-pink-500 hover:opacity-80 transition-all"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Product Gallery */}
        <div className="flex-1">
          <Gallery images={product.images} type="product" />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Product Name */}
          <h2 className="font-medium text-black-500 dark:text-white-500">
            {product.name}
          </h2>

          {/* Price */}
          <h3 className="font-regular text-vivid-pink-500">
            {product.price} DOT
          </h3>

          {/* Status */}
          <h5 className="font-regular text-black-300 dark:text-white-700">
            {product.status === "available" ? "Available" : "Not Available"}
          </h5>

          {/* Description */}
          <p className="text-lg text-black-500 dark:text-white-500">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="mt-4">
            <QuantitySelector
              defaultValue={1}
              min={1}
              max={99}
              onChange={(value) => console.log("Quantity selected:", value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            {/* Add to Cart Button */}
            <Button
              variant="secondary"
              type="product"
              onClick={() => console.log("Add to Cart clicked")}
            >
              Add to Cart
            </Button>

            {/* Buy Now Button */}
            <Button
              variant="primary"
              type="product"
              onClick={() => console.log("Buy Now clicked")}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-12">
        <h4 className="font-regular mb-4 text-white-500 dark:text-white-500">
          Similar Products
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
