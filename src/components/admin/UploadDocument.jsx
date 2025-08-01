import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_URL } from "../../store/authstore"; // Adjust the import path as necessary

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("transcript");

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("document", file);
    formData.append("type", docType);

    try {
      await axios.post(
        `${API_URL}/api/admin/upload?type=${docType}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Upload successful!");
      setFile(null); // Clear file after upload
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="max-w-sm w-full bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl p-6 shadow-md mx-auto my-4 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        📤 Upload Document
      </h2>

      <div className="flex flex-col gap-3">
        {/* Dropdown */}
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer"
        >
          <option value="transcript">Transcript</option>
          <option value="rollslip">Roll Number Slip</option>
        </select>

        {/* Custom File Upload */}
        <div className="relative">
          <input
            type="file"
            id="fileUpload"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="block w-full px-4 py-2 text-center border border-dashed border-gray-400 rounded-md bg-white cursor-pointer hover:bg-gray-50"
          >
            {file ? file.name : "Click to select file"}
          </label>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;
