import React, { useState } from "react";
import { Upload } from "lucide-react";

type FileUploadProps = {
  label: string;
  required?: boolean;
  onUpload: (files: FileList | null) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  required = false,
  onUpload,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Label */}
      <label className="text-sm font-medium text-black-500 dark:text-white-500">
        {label} {required && "*"}
      </label>

      {/* Upload Container */}
      <div className="p-8 rounded-lg border border-dashed border-white-600 dark:border-black-400 bg-white-300 dark:bg-black-800 text-center">
        {/* Upload Icon */}
        <Upload className="w-10 h-10 mx-auto text-black-300 dark:text-white-700 mb-4" />

        <p className="text-sm text-black-300 dark:text-white-700 mb-12">
          Click to Upload or Drag & Drop
        </p>
        <input
          type="file"
          onChange={(e) => onUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-6 py-3 rounded-md border border-black-500 dark:border-white-500 text-black-500 dark:text-white-500 hover:bg-black-200 dark:hover:bg-black-700 transition-all"
        >
          Upload Images
        </label>
      </div>
    </div>
  );
};

const ParentComponent = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

  const handleFileUpload = (files: FileList | null) => {
    setUploadedFiles(files);
    console.log("Uploaded files:", files);
  };

  return (
    <div className="flex flex-col gap-6">
      <FileUpload label="Images" required onUpload={handleFileUpload} />

      {/* Display Uploaded Files */}
      {uploadedFiles && (
        <div className="p-4 rounded-lg border border-white-600 dark:border-black-400 bg-white-300 dark:bg-black-800">
          <h3 className="text-lg font-medium text-black-500 dark:text-white-500 mb-4">
            Uploaded Files:
          </h3>
          <ul className="list-disc pl-5 text-black-300 dark:text-white-700">
            {Array.from(uploadedFiles).map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
