import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary";
  type: "nft" | "product";
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant,
  type,
  onClick,
  children,
}) => {
  const isNFT = type === "nft";
  const primaryColor = isNFT ? "bg-lime-green-500" : "bg-vivid-pink-500";
  const secondaryTextColor = "text-black-500 dark:text-white-500";
  const secondaryBorderColor = "border-black-500 dark:border-white-500";

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 rounded-lg text-lg font-medium transition-all ${
        variant === "primary"
          ? `${primaryColor} text-white hover:opacity-90`
          : `bg-transparent ${secondaryTextColor} border ${secondaryBorderColor}`
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
