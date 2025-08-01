import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getCurrentUser } from '../store/authstore'; // Adjust the path if needed
import { toast } from "react-hot-toast";

const Starter = ({ setAuthUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      if (user) {
        const current = await getCurrentUser();
        setAuthUser(current);
        if (current.role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/userdashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed: invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a8edea] to-[#fed6e3]">
      <form
        onSubmit={handleLogin}
        className="bg-gradient-to-br from-white via-white to-[#e0c3fc] p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-8 border border-[#e0c3fc]"
      >
        <h2 className="text-center mb-4 text-[#7f53ac] font-bold tracking-wide text-2xl">
          Login
        </h2>

        {/* Email Input */}
        <div className="flex items-center border-2 border-[#a8edea] rounded-lg px-3 py-3 bg-[#a8edea]/15 transition-colors duration-200 hover:border-[#7f53ac] hover:bg-[#a8edea]/30">
          <svg
            className="mr-3 text-[#7f53ac]"
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-none outline-none flex-1 text-base bg-transparent text-gray-800"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center border-2 border-[#fed6e3] rounded-lg px-3 py-3 bg-[#fed6e3]/15 relative transition-colors duration-200 hover:border-[#fd6e6a] hover:bg-[#fed6e3]/30">
          <svg
            className="mr-3 text-[#fd6e6a]"
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
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="bg-none border-none cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-0 text-[#7f53ac] hover:text-[#fd6e6a] transition-colors duration-200"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              // Eye open icon
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // Eye closed icon
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22" />
                <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" />
              </svg>
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-[#7f53ac] to-[#647dee] hover:from-[#647dee] hover:to-[#7f53ac] text-white border-none rounded-lg font-bold text-lg cursor-pointer shadow transition-all duration-200 hover:scale-105"
        >
          Login
        </button>

        {/* Register Button */}
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="py-3 bg-gradient-to-r from-[#fed6e3] to-[#a8edea] text-[#7f53ac] border-none rounded-lg font-bold text-lg cursor-pointer shadow transition-all duration-200 hover:from-[#a8edea] hover:to-[#fed6e3] hover:text-[#fd6e6a] hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Starter;
