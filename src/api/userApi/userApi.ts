import axios from "axios";

export interface UserDataProps {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface LoginUserProps {
  username: string;
  password: string;
}

export interface UpdateUserProps {
  first_name: string;
  last_name: string;
  password?: string;
  phone: string;
}

const BASE_URL = import.meta.env.VITE_PROD_URL


const authHeader = (token: string | null) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const registerUser = async (formData: UserDataProps) => {
  try {
    return await axios.post(`${BASE_URL}/register`, formData)
  } catch (error) {
    console.error("Failed to Register", error)
    throw error;
  }
}

export const loginUser = async ({username, password}: LoginUserProps) => {
  try {
    return await axios.post(`${BASE_URL}/login`, {username, password})
  } catch (error) {
    console.error("Failed to Login", error)
    throw error
  }
}

export const getUserProfile = async (userId: string | null, token: string | null) => {
  try {
    return await axios.get(`${BASE_URL}/profile/${userId}`, authHeader(token))
  } catch (error) {
    console.error("Failed to Get Profile", error)
    throw error
  }
}

export const updateUserProfile = async (
  userId: string,
  updateData: UpdateUserProps,
  token: string
) => {
  try {
    const payload = {...updateData};
    if(!payload.password || payload.password.trim() === "") {
        delete payload.password;
    }

    return await axios.patch(`${BASE_URL}/profile/${userId}`, payload, authHeader(token))
  } catch (error) {
    console.error("Failed to Update Profile", error)
    throw error;
  }
}

    
export const deleteuserProfile = async (userId: number, token: string) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${userId}`, authHeader(token))
  } catch (error) {
    console.error("Failed to Delete", error)
    throw error
  }
}

 
