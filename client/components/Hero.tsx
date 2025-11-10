import AnimatedViewport from "./AnimatedViewport";

const Hero = () => {

    return (
        <section className="flex justify-between items-center gap-0">
            <div className="flex flex-col justify-center gap-9.5">
                <div className="flex flex-col justify-start">
                    <h1 className="font-semibold text-black-500 dark:text-white-500">Shop Transparently.<br /> 
                        Own Permanently.<br /> 
                        Your Experience.
                    </h1>
                </div>
                <div className="flex flex-col justify-start">
                    <h4 className="font-light text-black-500 dark:text-white-500">Trade tech products and NFTs with wallet-based<br /> 
                        identity, crypto-only payments in DOT, and<br /> 
                        community-driven provenance.
                    </h4>
                </div>
            </div>
            <AnimatedViewport />
        </section>
    );
};

export default Hero;