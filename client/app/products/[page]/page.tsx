import Collections from "@/components/Collections";
import GradientBanner from "@/components/GradientBanner";
import FilterButton from "@/components/FilterButton";

const Products = () => {

    return (
        <div className="flex flex-col mx-10 min-w-0">
            <GradientBanner variant="products" />
            <Collections />
            <div className="flex justify-start items-center gap-3 mt-4">
                <p className="text-[0.8rem] lg:text-[1.1rem] font-medium text-black-300 dark:text-white-300">Filter by</p>
                <FilterButton />
            </div>
        </div>
    );
};

export default Products;