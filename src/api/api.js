import axios from "axios";

const API_BASE = "https://notification-backend-3.onrender.com";

export const sendOTP = (countryCode, phone) => {
  return axios.post(`${API_BASE}/otp`, {
    "country-code": countryCode,
    phone,
  });
};

export const verifyOTP = (countryCode, phone, otp) => {
  return axios.post(`${API_BASE}/verifyOTP`, {
    "country-code": countryCode,
    phone,
    otp,
  });
};

export const getProfile = (token)=>{
    console.log("token-22",token)
    return axios.get(`${API_BASE}/profileSection`,{
        headers: {
            Authorization: `Bearer ${token}`
          },
    })
}
export const updateProfile = (token, payload) => {
  return axios.put(`${API_BASE}/profileSection`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const currUser = () => {
  return axios.get(`${API_BASE}/connection`)
}
