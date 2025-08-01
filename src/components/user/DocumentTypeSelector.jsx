import { FaFileAlt, FaIdBadge } from "react-icons/fa";

const DocumentTypeSelector = ({ setDocType, next }) => {
  const handleSelect = (type) => {
    setDocType(type);
    next();
  };

  return (
    <div className="flex justify-center items-center min-h-[300px] animate-fade-in">
      <div className="bg-white shadow-xl border border-purple-200 rounded-xl px-10 py-8 w-full max-w-xl text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-2">
          Select Document Type
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Please choose the type of document you want to verify and download.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-4">
          <button
            onClick={() => handleSelect("transcript")}
            className="flex items-center gap-3 bg-gradient-to-br from-blue-400 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
          >
            <FaFileAlt className="text-xl" />
            Transcript
          </button>
          <button
            onClick={() => handleSelect("rollslip")}
            className="flex items-center gap-3 bg-gradient-to-br from-pink-400 to-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
          >
            <FaIdBadge className="text-xl" />
            Roll Number Slip
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentTypeSelector;
