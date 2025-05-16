import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/review`;

export interface ReviewPayload {
  user_id: number;
  booking_id: number;
  rating: number;
  comment: string;
}

export interface ReviewUpdatePayload {
  rating: number;
  comment: string;
}

export const createReview = async (
  payload: ReviewPayload,
  token: string | null
) => {
  try {
    const res = await axios.post(`${BASE_URL}/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMyReviews = async (token: string | null, userId: string | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateReview = async (
  token: string | null,
  paylaod: ReviewUpdatePayload,
  reviewId: number
) => {
  try {
    const res = await axios.patch(`${BASE_URL}/profile/${reviewId}`, paylaod, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReview = async (token: string | null, reviewId: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/profile/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
