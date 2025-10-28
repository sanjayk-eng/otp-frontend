import { FaUserPlus, FaUserTimes } from "react-icons/fa";

export function NotificationItem({ type, fullName, phone, timestamp }) {

  const bgColor = type === "join" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "join" ? "text-green-800" : "text-red-800";

  return (
    <div className="flex justify-center my-2">
      <div
        className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow text-sm w-96 ${bgColor} ${textColor}`}
      >
        <span className="flex-shrink-0 text-lg">
          {type === "join" ? <FaUserPlus /> : <FaUserTimes />}
        </span>
        <span className="truncate">
          {fullName} ({phone}) {type === "join" ? "joined" : "left"} the chat
        </span>
        <span className="flex-shrink-0 text-xs text-gray-500 ml-2">
          {timestamp}
        </span>
      </div>
    </div>
  );
}
