import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_PROD_URL}/booking`;

export interface CreateBookingPayload {
  dog_id: string;
  hotelroom_id: string;
  check_in: string;
  check_out: string;
}

export interface Booking {
  booking_id: number;
  check_in: string;
  check_out: string;
  created_at: string;
  dog_name: string;
  room_name: string;
  total_price: number;
  status: BookingStatus;
  price_per_night: number;
  dog_id: number;
  hotelroom_id: number;
}

type BookingStatus = 'confirmed' | 'cancelled'

export const getAvailableRooms = async (
  check_in: string,
  check_out: string,
  size: string,
  token: string | null
) => {
  const res = await axios.get(`${BASE_URL}/available`, {
    params: {
      check_in,
      check_out,
      size,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMyBookings = async (
  token: string | null,
  userId: string | null
) => {
  const res = await axios.get(`${BASE_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createBooking = async (
  payload: CreateBookingPayload,
  token: string | null
) => {
  const res = await axios.post(`${BASE_URL}/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const cancelBooking = async (
  bookingId: number,
  token: string | null
) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to cancel booking", error);
    throw error;
  }
};

export const updateBooking = async (
  token: string | null,
  payload: CreateBookingPayload,
  bookingId: number
) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${bookingId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to update booking", error);
    throw error;
  }
};

