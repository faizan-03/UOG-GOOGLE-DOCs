import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/authstore'; // Update path if needed
import { toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  const uogEmailRegex = /^[0-9]{8}-[0-9]{3}@uog\.edu\.pk$/;
  if (!uogEmailRegex.test(email)) {
    toast.error('Enter your valid UOG Email');
    return;
  }

  try {
    await registerUser({ email, username, password });
    navigate('/');
  } catch (error) {
    console.error('Registration failed:', error);
    toast.error('Registration failed. Try again.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8edea] to-[#fed6e3]">
      <form
        onSubmit={handleRegister}
        className="bg-gradient-to-br from-white via-white to-[#e0c3fc] p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-8 border border-[#e0c3fc]"
      >
        <h2 className="text-center mb-4 text-[#7f53ac] font-bold tracking-wide text-2xl">
          Register
        </h2>

        {/* Email Field */}
        <div className="flex items-center border-2 border-[#a8edea] rounded-lg px-3 py-3 bg-[#a8edea]/15 hover:border-[#7f53ac] hover:bg-[#a8edea]/30 transition">
          <svg
            className="mr-3 text-[#7f53ac]"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v16H4z" stroke="none" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-none outline-none flex-1 text-base bg-transparent text-gray-800"
            required
          />
        </div>

        {/* Username Field */}
        <div className="flex items-center border-2 border-[#fed6e3] rounded-lg px-3 py-3 bg-[#fed6e3]/15 hover:border-[#fd6e6a] hover:bg-[#fed6e3]/30 transition">
          <svg
            className="mr-3 text-[#fd6e6a]"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
          </svg>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-none outline-none flex-1 text-base bg-transparent text-gray-800"
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border-2 border-[#a8edea] rounded-lg px-3 py-3 bg-[#a8edea]/15 hover:border-[#7f53ac] hover:bg-[#a8edea]/30 transition relative">
          <svg
            className="mr-3 text-[#7f53ac]"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-none outline-none flex-1 text-base bg-transparent text-gray-800"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7f53ac] hover:text-[#fd6e6a] transition"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22" />
                <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" />
              </svg>
            )}
          </button>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-[#7f53ac] to-[#647dee] hover:from-[#647dee] hover:to-[#7f53ac] text-white border-none rounded-lg font-bold text-lg cursor-pointer shadow transition-all duration-200 hover:scale-105"
        >
          Register
        </button>

        {/* Back to Login */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="py-3 bg-gradient-to-r from-[#fed6e3] to-[#a8edea] text-[#7f53ac] border-none rounded-lg font-bold text-lg cursor-pointer shadow transition-all duration-200 hover:from-[#a8edea] hover:to-[#fed6e3] hover:text-[#fd6e6a] hover:scale-105"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;
