"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Gallery from "@/components/Gallery";
import QuantitySelector from "@/components/QuantitySelector";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { getProduct, searchProducts } from "@/lib/api";
import { ProductProps } from "@/types/cards";

// Fetch product data from API
const fetchProductData = async (id: string) => {
  const product = await getProduct(id);
  // Fetch similar products (first page, no specific sort/collection for now)
  const similarProductsResponse = await searchProducts({ page: 1 });
  const similarProducts = similarProductsResponse.items.slice(0, 4); // Take first 4 as similar

  return { product, similarProducts };
};

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductProps[]>([]);
  const id = (params as { id: string }).id;

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
          <Gallery images={[product.imageUrl]} type="product" />
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
            {product.status === "listed" ? "Available" : "Sold"}
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
