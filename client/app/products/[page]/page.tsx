import Collections from "@/components/Collections";
import GradientBanner from "@/components/GradientBanner";

const Products = () => {

    return (
        <div className="flex flex-col mx-10 min-w-0">
            <GradientBanner variant="products" />
            <Collections />
        </div>
    );
};

export default Products;