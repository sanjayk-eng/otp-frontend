import { create } from "zustand";
import { getProfile, updateProfile } from "../api/api";
import { toast } from "react-toastify";
import { showError } from "../util/toas";

export const useOTPStore = create((set) => ({
  phone: "",
  countryCode: "91",
  setPhone: (phone) => set({ phone }),
  setCountryCode: (code) => set({ countryCode: code }),
}));

export const useProfileStore = create((set) => ({
  user: null,
  loading: false,
  error: "",

  fetchProfile: async (token, navigate) => {
    set({ loading: true, error: "" });
    try {
      const res = await getProfile(token);
      console.log("res", res);
      set({ user: res.data });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("error",err.response.data.message)
        showError("Unauthorised access failed",err.response.data.message)
        navigate("/otp");
      } else {
        showError("failed to load profile")
        set({ error: "Failed to load profile" });
      }
    } finally {
      set({ loading: false });
    }
  },

  editProfile: async (token, payload) => {
    set({ loading: true, error: "" });
    try {
      const res = await updateProfile(token, payload);
      set({ user: res.data });
    } catch (err) {
      set({ error: "Failed to update profile" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProfileStore;
