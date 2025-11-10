import Link from "next/link";

const DiagonalSelector = () => {

    return (
        <section className="relative w-screen h-[55.438rem] overflow-visible -mx-10 mt-42 mb-30">
            <Link href="/products" className="absolute inset-0 z-10 clip-left group">
                <div className="absolute inset-0 bg-[url(/selector/products.jpg)] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"></div>
            </Link>

            <Link href="/nfts" className="absolute inset-0 z-10 clip-right group">
                <div className="absolute inset-0 bg-[url(/selector/nfts.jpg)] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"></div>
            </Link>

            <div className="absolute inset-0 z-30 pointer-events-none">
                <h2 className="absolute top-24 left-20 text-white-500 text-[10rem] font-black drop-shadow-lg drop-shadow-custom">PRODUCTS</h2>
                <h2 className="absolute bottom-24 right-20 text-white-500 text-[10rem] font-black drop-shadow-lg drop-shadow-custom">NFTs</h2> 
            </div>
        </section>
    );
}

export default DiagonalSelector;