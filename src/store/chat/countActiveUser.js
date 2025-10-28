import { create } from "zustand";
import { currUser } from "../../api/api";

export const CurrentUserDetails = create((set) => ({
  activeUser: [], // array of user objects { fullName, phone, profilePhoto }
  loading: false,
  fetchActiveUsers: async () => {
    set({ loading: true });
    try {
      const res = await currUser();
      const data = res.data.message; // or res.data.users if backend changed

      // Map phones array to objects
      const users = (data.users || data.phones || []).map((user) => ({
        fullName: user.fullName || "Anonymous",
        phone: user.phone,
        profilePhoto: user.profilePhoto || "/default-avatar.png",
      }));

      set({ activeUser: users, loading: false });
    } catch (err) {
      console.error("Failed to fetch active users:", err);
      set({ activeUser: [], loading: false });
    }
  },
}));


