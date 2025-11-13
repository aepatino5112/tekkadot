
const FilterButton = () => {

    return (
        <div>
            <label htmlFor="Headline">
                <select name="Headline" id="Headline" className="lg:mt-0.5 p-1 lg:p-2 w-full rounded-xl border-black-500 dark:border-white-500 border text-black-300 dark:text-white-300 shadow-sm sm:text-sm">
                    <option value="" className="text-black-300">Default</option>
                    <option value="h-price" className="text-black-300">Highest Price</option>
                    <option value="l-price" className="text-black-300">Lowest Price</option>
                    <option value="mobile" className="text-black-300">Newest</option>
                    <option value="wearable" className="text-black-300">Oldest</option>
                </select>
            </label>
        </div>
    );
};

export default FilterButton;