import { useEffect, useState } from "react";
import WelcomeUser from "../components/user/WelcomeUser";
import DocumentTypeSelector from "../components/user/DocumentTypeSelector";
import RollNumberInput from "../components/user/RollNumberInput";
import VerificationStep from "../components/user/VerificationStep";
import DownloadStep from "../components/user/DownloadStep";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../store/authstore";
import { toast } from "react-hot-toast";

const steps = [
  { label: "Select Document Type" },
  { label: "Enter Roll Number" },
  { label: "Verification" },
  { label: "Download" },
];

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [prevStep, setPrevStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUsername(user?.username || "User");
        setUserEmail(user?.email || "");
      } catch (err) {
        console.error("Auth failed", err);
        toast.error("Session expired. Please login again.");
      }
    };
    fetchUser();
  }, []);

  const handleStepChange = (newStep) => {
    setPrevStep(step);
    setStep(newStep);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/", { replace: true });
      window.location.reload();
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const animationClass = step > prevStep ? "slide-in-left" : "slide-in-right";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-2xl px-6 py-8 space-y-6 border border-purple-100">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className=" cursor-pointer absolute top-4 right-4 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition font-bold"
        >
          Logout
        </button>
        <WelcomeUser name={username} />

        {/* Stepper */}
        <div className="relative flex justify-between items-center mb-6">
          {steps.map((s, idx) => (
            <div key={s.label} className="flex flex-col items-center w-full">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300
                  ${
                    step === idx + 1
                      ? "bg-purple-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }
                  ${step > idx + 1 ? "bg-green-400 text-white" : ""}
                `}
              >
                {idx + 1}
              </div>
              <span
                className={`text-xs mt-2 ${
                  step === idx + 1
                    ? "text-purple-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
              {step === idx + 1 && (
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="relative min-h-[280px] max-h-[400px] overflow-hidden transition-all">
          <div
            key={step}
            className={`absolute w-full h-full ${animationClass}`}
          >
            <div className="h-full flex items-center justify-center">
              {step === 1 && (
                <DocumentTypeSelector
                  setDocType={setDocType}
                  next={() => handleStepChange(2)}
                />
              )}
              {step === 2 && (
                <RollNumberInput
                  setRollNo={setRollNo}
                  next={() => handleStepChange(3)}
                  back={() => handleStepChange(1)}
                />
              )}
              {step === 3 && (
                <VerificationStep
                  docType={docType}
                  rollNo={rollNo}
                  email={userEmail}
                  codeSent={codeSent}
                  setCodeSent={setCodeSent}
                  back={() => handleStepChange(2)}
                  next={(data) => {
                    setDownloadInfo(data);
                    handleStepChange(4);
                    setCodeSent(false);
                  }}
                />
              )}
              {step === 4 && (
                <DownloadStep
                  docType={docType}
                  rollNo={rollNo}
                  downloadUrl={downloadInfo?.downloadUrl}
                  filename={downloadInfo?.filename}
                  reset={() => {
                    setStep(1);
                    setDownloadInfo(null);
                    setDocType("");
                    setRollNo("");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .slide-in-left {
          animation: slideInLeft 0.5s ease forwards;
        }
        .slide-in-right {
          animation: slideInRight 0.5s ease forwards;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0%);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
