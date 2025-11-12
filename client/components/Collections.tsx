import CollectionCard from "./CollectionCard";

const Collections = () => {

    return (
        <div className="flex flex-col justify-start gap-4.5">
            <h2 className="text-2xl md:text-3xl lg:text4xl font-medium text-black-500 dark:text-white-500">Collections</h2>
            <div className="flex justify-between w-full">
                <CollectionCard name="gaming"/>
                <CollectionCard name="laptop"/>
                <CollectionCard name="mobile"/>
            </div>
        </div>
    );
};

export default Collections;