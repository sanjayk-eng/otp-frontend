import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOTPStore } from "../store/store.jsx";
import { verifyOTP } from "../api/api.js";
import { setToken } from "../store/localstore.js";
import { showSuccess,showError, showWarning } from "../util/toas.jsx";
import { toast } from "react-toastify";
import {
  AiOutlineArrowLeft,
  AiOutlineLoading3Quarters,
  AiOutlineCloseCircle,
} from "react-icons/ai";

export function VerifyOTP() {
  const { countryCode, phone } = useOTPStore();
  const [otp, setOtp] = useState(Array(6).fill("")); // store 6 digits
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // countdown 60 seconds
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  if (!phone){
    navigate("/otp")
  }

  //  Countdown effect
  useEffect(() => {
    if (timer === 0) {
      showWarning("timeout to filled otp")
      navigate("/otp"); // if time up -> go back
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, navigate]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next input
    if (value && index < 5) inputRefs.current[index + 1].focus();
    // focus previous if empty
    if (!value && index > 0) inputRefs.current[index - 1].focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setErrorMsg("Enter all 6 digits");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOTP(countryCode, phone, code);
      const token = response.headers.token;
      if (token) setToken(token)
        showSuccess("verification successed")

      navigate("/");
    } catch (err) {
      console.error(err);
      const e = err.response?.data?.message || "Invalid OTP, please try again"
      showError(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-400 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/otp")}
          className="absolute top-4 left-4 flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold"
        >
          <AiOutlineArrowLeft size={20} /> Back
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Verify OTP
        </h2>

        <p className="text-gray-600 text-center mb-4">
          Enter the code sent to{" "}
          <span className="font-semibold">
            {countryCode} {phone}
          </span>
        </p>

        {/* Timer Display */}
        <p className="text-center text-sm text-gray-500 mb-6">
          Time remaining:{" "}
          <span className="font-semibold text-blue-600">{timer}s</span>
        </p>

        {/* 6 Box OTP Input */}
        <div className="flex justify-between mb-6 gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md transition duration-300 mb-3 flex justify-center items-center gap-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-500 text-center mt-4 text-sm flex items-center justify-center gap-1">
            <AiOutlineCloseCircle /> {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
}
