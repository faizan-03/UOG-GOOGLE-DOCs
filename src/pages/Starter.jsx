import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../store/authstore"; 
import { toast } from "react-hot-toast";

const Starter = ({ setAuthUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showForgotCard, setShowForgotCard] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      if (user) {
        const current = await getCurrentUser();
        setAuthUser(current);
        if (current.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/userdashboard");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed: invalid credentials.");
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
        <div className="flex items-center border-2 border-[#a8edea] rounded-lg px-3 py-3 bg-[#f8fafc] transition-colors duration-200 hover:border-[#7f53ac] hover:bg-[#e0f7fa] relative group shadow-sm focus-within:ring-2 focus-within:ring-[#7f53ac]">
          <svg
            className="mr-3 text-[#7f53ac] opacity-80"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
          </svg>

          <input
            type="email"
            placeholder="Enter your UOG Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-none outline-none flex-1 text-base bg-transparent text-gray-800 placeholder:text-gray-400 focus:placeholder:text-[#7f53ac] transition-colors"
            autoComplete="username"
            required
          />

          {/* Enhanced Hint */}
          {email === "" && (
            <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 w-max max-w-xs bg-[#fefefe] text-[#7f53ac] text-xs px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none z-10 border border-[#7f53ac] font-bold">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#7f53ac]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z"
                  />
                </svg>
                <span>Register yourself first if first time </span>
              </div>
            </div>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
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
              type={showPassword ? "text" : "password"}
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
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22" />
                  <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <p
            className="text-sm text-[#7f53ac] hover:underline mt-2 cursor-pointer w-fit"
            onClick={() => setShowForgotCard(true)}
          >
            Forgot Password?
          </p>

          {/* Forgot Password Card */}
         {showForgotCard && (
  <div className="absolute left-0 mt-2 w-full bg-white border border-[#fd6e6a] rounded-lg shadow-lg p-4 transition duration-300 ease-out transform opacity-100 scale-100 translate-y-0">
    <div className="flex items-start gap-3">
      {/* Icon */}
      <svg
        className="w-6 h-6 text-[#fd6e6a] mt-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0zm0 0v6a4 4 0 01-8 0v-6" />
      </svg>

      {/* Text */}
      <div className="text-sm text-gray-700">
        <p className="font-semibold text-[#7f53ac] mb-1">Need help resetting your password?</p>
        <p>
          Please contact the administrator at: <br />
          <a href="mailto:ranafaizaan03@gmail.com" className="text-[#fd6e6a] underline">
            ranafaizaan03@gmail.com
          </a>
        </p>
      </div>
    </div>

    {/* Close Button */}
    <button
      onClick={() => setShowForgotCard(false)}
      className="absolute top-1 right-1 text-gray-400 hover:text-[#fd6e6a] transition-colors"
      aria-label="Close"
    >
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
)}

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
          onClick={() => navigate("/register")}
          className="py-3 bg-gradient-to-r from-[#fed6e3] to-[#a8edea] text-[#7f53ac] border-none rounded-lg font-bold text-lg cursor-pointer shadow transition-all duration-200 hover:from-[#a8edea] hover:to-[#fed6e3] hover:text-[#fd6e6a] hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Starter;
