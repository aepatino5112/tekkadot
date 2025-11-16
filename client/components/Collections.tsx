import CollectionCard from "./CollectionCard";

const Collections = () => {

    return (
      <div className="flex flex-col justify-start gap-2 lg:gap-4.5">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-black-500 dark:text-white-500">
          Collections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4.5">
          <CollectionCard name="gaming" />
          <CollectionCard name="laptop" />
          <CollectionCard name="mobile" />
          <CollectionCard name="wearable" />
        </div>
      </div>
    );
};

export default Collections;