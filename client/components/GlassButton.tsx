import { type GlassBtnProps } from "@/types/glassButton";

const GlassButton = ({ content }: GlassBtnProps) => {
  return (
    <button
      className="
                glass-effect rounded-2xl
                /* responsive text and padding */
                text-[clamp(0.95rem,1.6vw,1.25rem)]
                px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4
                text-white-50 font-bold cursor-pointer
                w-full sm:inline-flex items-center justify-center gap-3 sm:w-auto
                max-w-full sm:max-w-none
                whitespace-normal sm:whitespace-nowrap
            "
      aria-label={String(content)}
    >
      {String(content)}
    </button>
  );
};

export default GlassButton;
