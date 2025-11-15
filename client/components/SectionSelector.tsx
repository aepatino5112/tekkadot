import React, { useState } from "react";

type SectionSelectorProps = {
  sections: string[];
  onSelect: (section: string) => void;
};

const SectionSelector: React.FC<SectionSelectorProps> = ({
  sections,
  onSelect,
}) => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  const handleSelect = (section: string) => {
    setActiveSection(section);
    onSelect(section);
  };

  return (
    <div className=" flex justify-around items-center p-2 rounded-lg bg-white-100 dark:bg-black-300">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => handleSelect(section)}
          className={`cursor-pointer transition-all px-4 py-2 rounded-md font-medium text-center text-black-500 dark:text-white-500 ${
            activeSection === section
              ? "w-1/3 bg-white-500 dark:bg-black-500 text-black dark:text-white shadow-md"
              : "hover:bg-black-200 dark:hover:bg-black-700"
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default SectionSelector;
