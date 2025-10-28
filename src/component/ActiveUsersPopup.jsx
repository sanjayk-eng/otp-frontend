import React from "react";

export function ActiveUsersPopup({ users, onClose }) {
  return (
    <div className="absolute top-14 right-4 w-72 bg-white shadow-lg rounded-lg z-50 p-3">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold">Active Users</h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 font-bold"
        >
          X
        </button>
      </div>
      {users.length === 0 ? (
        <div className="text-sm text-gray-500">No active users</div>
      ) : (
        <ul className="text-sm max-h-48 overflow-y-auto">
          {users.map((user, idx) => (
            <li key={idx} className="flex items-center py-1 border-b last:border-b-0 gap-2">
              <img
                src={user.profilePhoto || "/default-avatar.png"}
                alt="avatar"
                className="w-6 h-6 rounded-full border"
              />
              <span>{user.fullName || "Anonymous"} ({user.phone})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
