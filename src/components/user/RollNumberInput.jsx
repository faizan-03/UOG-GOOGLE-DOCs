import { useState } from "react";

const RollNumberInput = ({ setRollNo, next, back }) => {
  const [roll, setRoll] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!/^22021519-\d{3}$/.test(roll)) {
      setError("Please enter a valid roll number (e.g., 22021519-040)");
      return;
    }
    setError("");
    setRollNo(roll);
    next();
  };

  return (
    <div className="flex justify-center items-center min-h-[300px] animate-fade-in">
      <div className="w-full bg-white shadow-xl rounded-xl px-10 py-8 max-w-xl border border-purple-200">
        <h2 className="text-2xl font-bold text-purple-600 mb-2 text-center">
          Roll Number Verification
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your roll number in the format: <span className="font-mono text-black">00000000-000</span>
        </p>

        <input
          type="text"
          value={roll}
          placeholder="22021519-040"
          onChange={(e) => setRoll(e.target.value)}
          className="w-full px-4 py-3 text-lg border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {error && (
          <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={back}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RollNumberInput;
