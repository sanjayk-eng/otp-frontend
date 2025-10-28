export const addPhoneNUM = (input)=>localStorage.setItem("phone",input)
export const getPhoneNUm = ()=>localStorage.getItem("phone")
export const setToken = (token)=>localStorage.setItem("accessToken", token)
export const getToken = ()=>localStorage.getItem("accessToken")
