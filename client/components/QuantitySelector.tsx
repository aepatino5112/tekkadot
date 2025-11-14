"use client";
import React, { useState, useEffect } from "react";

interface QuantitySelectorProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (v: number) => void;
  className?: string;
}

const clamp = (v: number, min = 1, max = 999) =>
  Math.max(min, Math.min(max, v));

const QuantitySelector = ({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  className = "",
}: QuantitySelectorProps) => {
  const isControlled = typeof value === "number";
  const [internal, setInternal] = useState<number>(
    clamp(defaultValue, min, max)
  );
  const qty = isControlled ? clamp(value as number, min, max) : internal;

  useEffect(() => {
    if (!isControlled) return;
    // keep controlled value clamped
    setInternal(clamp(value as number, min, max));
  }, [value, isControlled, min, max]);

  const update = (next: number) => {
    const v = clamp(next, min, max);
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={`flex flex-col items-start ${className}`}>
      {/* Label */}
      <label className="text-lg font-regular text-black-300 dark:text-white-700 mb-2">
        Quantity
      </label>

      {/* Selector */}
      <div
        className="flex items-center justify-between rounded-full overflow-hidden select-none border border-black-300 dark:border-white-300"
        style={{
          minWidth: "6rem",
          maxWidth: "10rem",
          width: "100%",
        }}
        aria-label="Quantity selector"
      >
        {/* Decrement */}
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => update(qty - 1)}
          disabled={qty <= min}
          className={`cursor-pointer qty-btn flex items-center justify-center shrink-0 rounded-full bg-transparent transition-colors focus:outline-none focus:ring-0 ${
            qty <= min
              ? "text-black-300 dark:text-white-300"
              : "text-black-500 dark:text-white-500"
          }`}
          style={{
            width: "2.75rem",
            height: "2.75rem",
            opacity: qty <= min ? 0.35 : 1,
          }}
        >
          <span className="text-xl sm:text-[1.4rem] leading-none">-</span>
        </button>

        {/* Value */}
        <div
          className="qty-value flex-1 text-center px-4"
          style={{ paddingTop: "0.35rem", paddingBottom: "0.35rem" }}
          aria-live="polite"
        >
          <span className="block text-[1.25rem] sm:text-[1.5rem] font-medium text-black-500 dark:text-white-500">
            {qty}
          </span>
        </div>

        {/* Increment */}
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => update(qty + 1)}
          disabled={qty >= max}
          className={`cursor-pointer qty-btn flex items-center justify-center shrink-0 rounded-full bg-transparent transition-colors focus:outline-none focus:ring-0 ${
            qty >= max
              ? "text-black-300 dark:text-white-300"
              : "text-black-500 dark:text-white-500"
          }`}
          style={{
            width: "2.75rem",
            height: "2.75rem",
            opacity: qty >= max ? 0.35 : 1,
          }}
        >
          <span className="text-xl sm:text-[1.4rem] leading-none">+</span>
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
