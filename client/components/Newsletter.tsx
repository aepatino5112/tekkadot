import GlassButton from "./GlassButton";

const Newsletter = () => {
    return (
        <div className="relative w-full h-140.5 flex items-center justify-center rounded-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/images/newsletter.jpg')] rounded-2xl bg-cover bg-center"></div>
            
            {/* Content Container */}
            <div className="relative z-10 text-center px-4 w-full max-w-[1400px] mx-auto">
                {/* Title */}
                <h2 className="text-white text-[4.5rem] font-semibold leading-[1.1] mb-[4rem]">
                    Stay Updated on Latest<br />Product Releases
                </h2>
                
                {/* Description */}
                <p className="text-white-400 font-medium text-[2rem] mb-10 mx-auto">
                    Subscribe with your wallet to stay updated on our latest product releases.
                </p>
                
                {/* Button */}
                <div className="mt-12">
                    <GlassButton content="Join the Club - Subscribe with your Wallet" />
                </div>
            </div>
        </div>
    );
};

export default Newsletter;