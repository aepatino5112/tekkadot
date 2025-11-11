import { type GlassBtnProps } from "@/types/glassButton";

const GlassButton = ({ content }: GlassBtnProps) => {

    return (
        <button 
            className="glass-effect rounded-2xl text-[2rem] px-29.5 py-[2.031rem] text-white-50 font-bold cursor-pointer"
        >
            {`${content}`}
        </button>
    );
};

export default GlassButton;