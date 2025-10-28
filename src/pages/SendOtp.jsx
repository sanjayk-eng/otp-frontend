import React, { useState ,useEffect  } from "react";
import { useOTPStore } from "../store/store.jsx";
import { sendOTP } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { addPhoneNUM } from "../store/localstore.js";
import { showSuccess,showError } from "../util/toas.jsx";
import { toast } from "react-toastify";
import {
  AiOutlinePhone,
  AiOutlineLoading3Quarters,
  AiOutlineExclamationCircle,
} from "react-icons/ai";


export function SendOTP() {
  const navigate = useNavigate();
  const { countryCode, setCountryCode, setPhone } = useOTPStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.match(/^[0-9]{10}$/)) {
      showError("Enter a valid 10-digit phone number")
      return;
    }
    addPhoneNUM(input)
    setLoading(true);

    try {
      const response = await sendOTP(countryCode, input);
      console.log("OTP Sent:", response);
      setPhone(input);
      showSuccess("Otp successfully")
      navigate("/verify");
    } catch (err) {
      const e = err.response?.data?.message || "Failed to send OTP";
      showError(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        
        {/*  LEFT SIDE — Image Section */}
        <div className="md:w-1/2 bg-gray-100 flex flex-col items-center justify-center p-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Scan with WhatsApp
          </h3>
          <p className="text-gray-500 text-center mb-3">
            Open WhatsApp → Tap Camera → Scan this code to connect
          </p>

          {/* Replace with your QR image */}
          <img
            src="QR.png"
            alt="WhatsApp QR Code"
            className="w-64 h-64 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/*  RIGHT SIDE — OTP Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
            <AiOutlinePhone size={28} /> Send OTP
          </h2>

          {/* Country Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Select Country
            </label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="91">🇮🇳 India (+91)</option>
              <option value="1">🇺🇸 USA (+1)</option>
            </select>
          </div>

          {/* Phone Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md transition duration-300 mb-3 flex justify-center items-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
