import { type GlassBtnProps } from "@/types/glassButton";

const GlassButton = ({ content }: GlassBtnProps) => {

    return (
        <button 
            className="glass-effect text-[2rem] px-29.5 py-[2.031rem] text-white-400 font-bold cursor-pointer"
        >
            {`${content}`}
        </button>
    );
};

export default GlassButton;