import { create } from "zustand";
import { showError,showSuccess ,showInfo} from "../../util/toas";

export const useApi = create((set, get) => ({
  ws: null,
  messages: [],
  wsConnection: "disconnected",

  // Callback when a message is received
  onMessageReceived: null,

  // Connect WebSocket
  Connect: (url, token) => {
    const { ws } = get();
    if (ws) return; // already connected

    const socket = new WebSocket(`${url}?token=${token}`);
    showSuccess("joined success")
    // Save socket in state
    set({ ws: socket, wsConnection: "connecting" });

    // Attach listeners
    socket.onopen = () => set({ wsConnection: "connected" });

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messageObj = {
          phone: data.phone || "",
          fullName: data.fullName || "",
          profilePhoto: data.profilePhoto || "",
          message: data.message || "",
          type :data.type || "",
};
set((state) => ({ messages: [...state.messages, messageObj] }));

      // Push message to state
      

      // Call optional callback
      const callback = get().onMessageReceived;
      if (callback) callback(data);
    };

    socket.onclose = () => set({ ws: null, wsConnection: "disconnected" });
    socket.onerror = () => set({ wsConnection: "error" });
  },

  // Send a message
  SendMessage: (msg) => {
    const { ws } = get();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ message: msg }));
    }
  },

  // Disconnect WebSocket
  Disconnect: () => {
    const { ws } = get();
    showInfo("user disconnect")
    ws?.close();
    set({ ws: null, wsConnection: "disconnected" });
  },

  // Set a message listener dynamically
  SetMessageListener: (callback) => set({ onMessageReceived: callback }),
}));
