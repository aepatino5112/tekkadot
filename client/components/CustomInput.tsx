type CustomInputProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  required = false,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Label */}
      <label className="text-sm font-medium text-black-500 dark:text-white-500">
        {label} {required && "*"}
      </label>

      {/* Input Field */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-4 rounded-lg border border-white-600 dark:border-black-400 bg-white-300 dark:bg-black-800 text-black-500 dark:text-white-500 focus:outline-none focus:ring-2 focus:ring-vivid-pink-500"
      />
    </div>
  );
};

export default CustomInput;
