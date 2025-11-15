"use client";

import { useRouter } from "next/navigation";
import { MoveLeft, ShoppingCart } from "lucide-react";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";

// Define the type for cart items
type CartItemType = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  type: "product" | "nft"; // Restrict type to "product" or "nft"
  imageUrl: string;
  onRemove: () => void;
};

const Cart = () => {
  const router = useRouter();

  // Simulated cart items
  const cartItems: CartItemType[] = [
    {
      id: "1",
      name: "Gaming Laptop",
      price: 1200,
      tags: ["electronics", "gaming"],
      type: "product",
      imageUrl: "/images/gaming-laptop.jpg",
      onRemove: () => console.log("Remove Gaming Laptop"),
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const networkFee = 0.05;
  const loyaltyDiscount = -0.02;
  const total = subtotal + networkFee + loyaltyDiscount;

  return (
    <div className="flex flex-col w-full px-6 sm:px-10 min-w-0 overflow-x-hidden">
      {/* Header */}
      <div className="max-w-312 w-full mx-auto pt-6 pb-10">
        <div className="flex items-center gap-6">
          <button
            aria-label="Go back"
            onClick={() => router.back()}
            className="back-link"
          >
            <MoveLeft className="w-5 h-5 sm:w-6 sm:h-6 text-vivid-pink-600 dark:text-vivid-pink-400" />
          </button>

          <div>
            <h1 className="font-bold text-[1.75rem] lg:text-[2.25rem] text-black-500 dark:text-white-500">
              Your Cart
            </h1>
            <p className="text-lg text-black-300 dark:text-white-700">
              Review your items before checkout.
            </p>
          </div>
        </div>

        <div className="terms-divider my-6" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-312 w-full mx-auto pt-6 pb-10">
        {/* Cart Items */}
        <div className="flex-1">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 py-16">
              {/* Empty Cart Icon */}
              <div className="flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-black-500 dark:text-white-500" />
              </div>

              {/* Empty Cart Message */}
              <p className="text-lg font-medium text-black-500 dark:text-white-500">
                Your cart is empty
              </p>

              {/* Start Shopping Button */}
              <Button
                variant="primary"
                type="product"
                onClick={() => router.push("/products")}
              >
                Start Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {cartItems.length > 0 && (
          <div className="flex flex-col gap-6 w-full lg:w-[20rem]">
            {/* Order Summary */}
            <div className="p-6 rounded-lg border border-white-600 dark:border-black-400">
              <h5 className="font-medium text-black-500 dark:text-white-500">
                Order Summary
              </h5>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-black-500 dark:text-white-500">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {subtotal.toFixed(2)} DOT
                  </span>
                </div>
                <div className="flex justify-between text-black-500 dark:text-white-500">
                  <span>Network Fee</span>
                  <span className="font-semibold">
                    {networkFee.toFixed(2)} DOT
                  </span>
                </div>
                <div className="terms-divider my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-black-500 dark:text-white-500">
                    Total
                  </span>
                  <span className="text-vivid-pink-500">
                    {total.toFixed(2)} DOT
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <Button
                  variant="primary"
                  type="product"
                  onClick={() => console.log("Proceed to Checkout")}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="secondary"
                  type="product"
                  onClick={() => router.push("/products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
