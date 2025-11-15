"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import CheckoutItem from "@/components/CheckoutItem";
import Button from "@/components/Button";

type CheckoutItemType = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  type: "product" | "nft";
  imageUrl: string;
};

const Checkout = () => {
  const router = useRouter();

  // Simulated checkout items
  const checkoutItems: CheckoutItemType[] = [
    {
      id: "1",
      name: "Samsung Galaxy S25",
      price: 0,
      tags: ["Tech", "92% Trust Index"],
      type: "product",
      imageUrl: "/images/product1.jpg",
    },
    {
      id: "2",
      name: "Samsung Galaxy S25",
      price: 0,
      tags: ["Tech", "92% Trust Index"],
      type: "product",
      imageUrl: "/images/product1.jpg",
    },
    {
      id: "3",
      name: "Samsung Galaxy S25",
      price: 0,
      tags: ["Tech", "92% Trust Index"],
      type: "product",
      imageUrl: "/images/product1.jpg",
    },
  ];

  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price, 0);
  const networkFee = 0.05;
  const total = subtotal + networkFee;

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
              Checkout
            </h1>
            <p className="text-lg text-black-300 dark:text-white-700">
              Review and confirm your DOT payment.
            </p>
          </div>
        </div>

        <div className="terms-divider my-6" />
      </div>

      {/* Order Items Title */}
      <div className="max-w-312 w-full mx-auto">
        <h4 className="font-medium text-black-500 dark:text-white-500 mb-6">
          Order Items
        </h4>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-312 w-full mx-auto pb-10 ">
        {/* Order Items */}
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            {checkoutItems.map((item) => (
              <CheckoutItem key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 w-full lg:w-[20rem] ">
          {/* Payment Summary */}
          <div className="p-6 rounded-lg border border-white-600 dark:border-black-400">
            <h5 className="font-medium text-black-500 dark:text-white-500">
              Payment Summary
            </h5>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-black-500 dark:text-white-500">
                <span>Subtotal</span>
                <span className="font-semibold">{subtotal.toFixed(2)} DOT</span>
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
                onClick={() => console.log("Pay with Wallet")}
              >
                Pay with Wallet
              </Button>
            </div>
          </div>

          {/* Non-Custodial Settlement */}
          <div className="p-6 rounded-lg border border-white-600 dark:border-black-400">
            <h5 className="font-medium text-black-500 dark:text-white-500 flex items-center gap-2">
              Non-custodial Settlement
            </h5>
            <p className="text-sm text-black-500 dark:text-white-500 mt-2">
              This is a peer-to-peer trade. Settlement is protocol enforced and
              non-reversible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
