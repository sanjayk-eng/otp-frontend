import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../store/chat/ws";
import { NotificationItem } from "./notification";
import { getPhoneNUm, getToken } from "../store/localstore";
import { CurrentUserDetails } from "../store/chat/countActiveUser";
import { ActiveUsersPopup } from "./ActiveUsersPopup";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineProfile,
  AiOutlineReload,
  AiOutlineArrowDown as ScrollIcon,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export function ChatBox() {
  const { Connect, SendMessage, messages } = useApi();
  const [input, setInput] = useState("");
  const [showActivePopup, setShowActivePopup] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const token = getToken();
  const myPhone = getPhoneNUm();
  const navigate = useNavigate();

  // Zustand store for active users popup
  const backendUsers = CurrentUserDetails((state) => state.activeUser);
  const loading = CurrentUserDetails((state) => state.loading);
  const fetchActiveUsers = CurrentUserDetails((state) => state.fetchActiveUsers);

  // Connect WebSocket on mount
  useEffect(() => {
    Connect("ws://localhost:8086/ws/chat", token);
  }, [Connect, token]);

  // Scroll listener to show/hide Scroll-to-Bottom button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 50;
      setShowScrollButton(!isAtBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to bottom when new messages arrive if user is near bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !messagesEndRef.current) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 50;

    if (isAtBottom) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    SendMessage(input.trim());
    setInput("");
  };

  const handleFetchActiveUsers = async () => {
    await fetchActiveUsers();
    setShowActivePopup(true);
  };

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white font-semibold text-lg shadow flex justify-between items-center relative">
        <span>Global Chat Room</span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-gray-100 transition"
          >
            <AiOutlineProfile className="w-5 h-5" /> Profile
          </button>

          <button
            onClick={handleFetchActiveUsers}
            disabled={loading}
            className="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-gray-100 transition"
          >
            <AiOutlineReload
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
            />{" "}
            Active Users
          </button>
        </div>
      </div>

      {/* Active Users Popup */}
      {showActivePopup && (
        <ActiveUsersPopup
          users={backendUsers}
          onClose={() => setShowActivePopup(false)}
        />
      )}

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 relative"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400">No messages yet</div>
        )}

        {messages.map((msg, index) => {
          const data = typeof msg === "string" ? JSON.parse(msg) : msg;
          const isMine = data.phone === myPhone;

          if (data.type === "join" || data.type === "leave") {
             return (
               <NotificationItem
                 key={index}
                type={data.type}
                fullName={data.fullName}
                phone={data.phone}
                timestamp={getTime()}
                icon={
                  data.type === "join" ? (
                    <AiOutlineArrowUp className="text-green-500" />
                  ) : (
                    <AiOutlineArrowDown className="text-red-500" />
                  )
                }
              />
            );
          }

          return (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                isMine ? "justify-end" : ""
              }`}
            >
              <img
                src={data.profilePhoto || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border"
              />
              <div className="p-3 rounded-2xl max-w-xs break-words shadow bg-white text-gray-800">
                {!isMine && (
                  <div className="text-sm font-semibold mb-1">
                    {data.fullName || "Anonymous"} ({data.phone})
                  </div>
                )}
                <div>{data.message}</div>
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {getTime()}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 z-50"
        >
          <ScrollIcon className="w-5 h-5" />
        </button>
      )}

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="ml-3 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
