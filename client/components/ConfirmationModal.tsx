import React from "react";
import Button from "@/components/Button";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "nft" | "product"; // Determines if it's for an NFT or a product
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
}) => {
  if (!isOpen) return null;

  const isNFT = type === "nft";
  const message = isNFT
    ? "Are you sure you want to remove this NFT from your listings?"
    : "Are you sure you want to remove this product from your listings?";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white-300 dark:bg-black-800 p-6 rounded-lg max-w-[90%] w-full sm:max-w-[30rem] border border-white-600 dark:border-black-400">
        {/* Modal Header */}
        <h2 className="text-lg font-bold text-black-500 dark:text-white-500 mb-4">
          Confirm Removal
        </h2>

        {/* Modal Message */}
        <p className="text-sm text-black-300 dark:text-white-700 mb-6">
          {message}
        </p>

        {/* Modal Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="secondary" type={type} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type={type} onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;