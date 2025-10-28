import React, { useEffect, useState } from "react";
import { useProfileStore } from "../store/store";
import { EditProfileModal } from "./EditProfile";
import { AiOutlineEdit, AiOutlineGlobal, AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getToken } from "../store/localstore";

export function ProfileSection() {
  const { user, loading, error, fetchProfile } = useProfileStore();
  const [showModal, setShowModal] = useState(false);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) fetchProfile(token,navigate);
  }, [token, fetchProfile]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl flex flex-col sm:flex-row items-center sm:items-center gap-8 sm:gap-12 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">

        {/* Profile Section - Left */}
        <div className="flex flex-col items-center sm:items-start gap-4 sm:w-2/3">
          {/* Profile Picture */}
          <div className="relative group">
            <img
              src={user.profilePhoto || "https://i.pravatar.cc/150?img=3"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover ring-2 ring-blue-300 transition-all group-hover:ring-blue-500"
            />
            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full border-2 border-white shadow-md transition-all transform group-hover:scale-110"
            >
              <AiOutlineEdit className="w-5 h-5" />
            </button>
          </div>

          {/* User Details */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wide text-center sm:text-left">
            {user.fullName || "Your Name"}
          </h2>
          <p className="text-gray-500 text-sm text-center sm:text-left">
            {user.countryCode || "+91"} {user.phone || "----------"}
          </p>
          {user.status && (
            <p className="text-gray-400 italic text-sm text-center sm:text-left">
              {user.status}
            </p>
          )}

          {/* Divider */}
          <div className="w-16 h-[2px] bg-blue-500 mt-1 rounded-full self-center sm:self-start"></div>
        </div>

        {/* Buttons Section - Right */}
        <div className="flex flex-col sm:w-1/3 gap-3 items-center sm:items-end">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-end"
          >
            <AiOutlineEdit /> Edit Profile
          </button>

          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2.5 rounded-xl shadow-md font-semibold hover:from-green-600 hover:to-green-700 active:scale-95 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-end"
          >
            <AiOutlineGlobal /> Global Chat
          </button>

          <button
            onClick={() => navigate("/otp")}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-md font-semibold hover:from-purple-600 hover:to-purple-700 active:scale-95 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-end"
          >
            <AiOutlineCheckCircle /> Verification
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <EditProfileModal token={token} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
