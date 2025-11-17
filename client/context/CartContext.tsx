"use client";

import { ProductProps, NFTProps } from "@/types/cards";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-hot-toast";

// The CartItem can be either a Product or an NFT, plus a quantity.
export type CartItem = (ProductProps | NFTProps) & { quantity: number };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: ProductProps | NFTProps) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // This effect now only handles saving to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: ProductProps | NFTProps) => {
    // Check for existing item using the current state
    const existingItem = cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      // Perform side effect (toast)
      toast.error(`${item.name} is already in your cart.`);
      // Do not update state
      return;
    }

    // Perform side effect (toast)
    toast.success(`Added ${item.name} to cart!`);
    // Then, update state
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (itemId: string) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (itemToRemove) {
      // Perform side effect (toast)
      toast.success(`Removed ${itemToRemove.name} from cart.`);
    }
    // Then, update state
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
