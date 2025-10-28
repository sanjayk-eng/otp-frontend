import React, { useState } from "react";
import {useProfileStore} from "../store/store";
import { AiOutlineClose } from "react-icons/ai";
import { showError,showSuccess } from "../util/toas";

export  function EditProfileModal({ token, onClose }) {
  const { user, editProfile } = useProfileStore();
  const [fullName, setFullName] = useState(user.fullName || "");
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await editProfile(token, { fullName, profilePhoto });
      showSuccess("profile update successfully")
      onClose();
    } catch {
      showError("Failed to update profile")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="border p-2 w-full rounded mb-3"
        />

        <input
          type="text"
          value={profilePhoto}
          onChange={(e) => setProfilePhoto(e.target.value)}
          placeholder="Profile Photo URL"
          className="border p-2 w-full rounded mb-3"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
