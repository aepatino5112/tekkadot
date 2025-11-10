import Link from "next/link";

const DiagonalSelector = () => {

    return (
        <section className="relative w-[107.938rem] h-[55.438rem] overflow-visible">
            <Link href="/products" className="absolute inset-0 z-10 clip-left bg-[url(/selector/products.jpg)] bg-cover bg-center">
            </Link>

            <Link href="/nfts" className="absolute inset-0 z-10 clip-right bg-[url(/selector/nfts.jpg)] bg-cover bg-center">
            </Link>

            <div className="absolute inset-0 z-30 pointer-events-none">
                <h2 className="absolute top-24 left-20 text-white-500 text-[10rem] font-black drop-shadow-lg drop-shadow-custom">PRODUCTS</h2>
                <h2 className="absolute bottom-24 right-20 text-white-500 text-[10rem] font-black drop-shadow-lg drop-shadow-custom">NFTs</h2> 
            </div>
        </section>
    );
}

export default DiagonalSelector;