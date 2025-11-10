import Link from "next/link";

const DiagonalSelector = () => {

    return (
        <section className="grid grid-cols-2 w-[107.938rem] h-[55.438rem]">
            <Link href="/products" className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-[url(/selector/products.jpg)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"></div>
                <h2 className="absolute top-10 left-10 text-white-500 text-[10rem] font-bold drop-shadow-lg">PRODUCTS</h2>
            </Link>

            <Link href="/nfts" className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-[url(/selector/nfts.jpg)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"></div>
                <h2 className="absolute bottom-10 right-10 text-white-500 text-[10rem] font-bold drop-shadow-lg">NFTs</h2> 
            </Link>
        </section>
    );
}

export default DiagonalSelector;