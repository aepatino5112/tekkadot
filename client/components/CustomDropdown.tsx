type CustomDropdownProps = {
  label: string;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Label */}
      <label className="text-sm font-medium text-black-500 dark:text-white-500">
        {label} {required && "*"}
      </label>

      {/* Dropdown */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-4 rounded-lg border border-white-600 dark:border-black-400 bg-white-300 dark:bg-black-800 text-black-500 dark:text-white-500 focus:outline-none focus:ring-2 focus:ring-vivid-pink-500 hover:cursor-pointer"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
