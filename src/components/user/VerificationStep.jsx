import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {API_URL} from '../../store/authstore'; // Adjust the import path as necessary

const VerificationStep = ({ docType, rollNo, back, email, next, codeSent, setCodeSent }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSendCode = async () => {
    if (!email || codeSent) return; // Prevent sending code if email is empty or code already sent

    const rollPart = rollNo.trim().toLowerCase(); // e.g., 22021519-040
  const emailPart = email.split('@')[0].toLowerCase(); // e.g., 22021519-040

  if (rollPart !== emailPart) {
    toast.error("You are not authorized to get others documents");
    return;
  }



    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/verify/send-code`, { email, rollNo }, { withCredentials: true });
      toast.success(res.data.message);
      setCodeSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (verifying) return;
    if (!/^\d{5}$/.test(code)) {
      setError('Enter a valid 5-digit verification code');
      return;
    }

    setError('');
    setVerifying(true);
    try {
      const res = await axios.post(`${API_URL}/api/verify/verify-code`, {
        email,
        code,
        docType,
        rollNo,
      }, { withCredentials: true });

      toast.success(res.data.message);
      next(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Verify Your Email</h2>

      <p className="text-sm text-gray-600 text-center">
        A 5-digit verification code will be sent to your email. Enter it below to continue.
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleSendCode}
          disabled={codeSent || loading}
          className={`w-full py-2 px-4 rounded text-white text-sm font-medium transition ${
            codeSent ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Sending...' : codeSent ? 'Code Sent' : 'Send Code to Email'}
        </button>

        <input
          type="text"
          maxLength={5}
          placeholder="Enter 5-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="flex justify-between">
        <button
          onClick={back}
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm"
          disabled={verifying}
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={verifying}
          className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition text-sm"
        >
          {verifying ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default VerificationStep;
