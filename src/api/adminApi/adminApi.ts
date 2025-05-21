import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_ADMIN_API_URL}`

interface AdminAuthPayload {
    username: string;
    password: string;
}
interface AdminRegisterPayload extends AdminAuthPayload {
    email:string;
}


export const adminLogin = async (payload: AdminAuthPayload) => {
 const res = await axios.post(`${BASE_URL}/login`, payload)   
 return res.data
}

export const adminSignUp = async (payload:AdminRegisterPayload) => {
    const res = await axios.post(`${BASE_URL}/register`, payload)
    return res.data
}
