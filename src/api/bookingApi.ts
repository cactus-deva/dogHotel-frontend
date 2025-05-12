import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/booking`;

export interface CreateBookingPayload {
  dog_id: string;
  hotelroom_id: string;
  check_in: string; //YY-MM-DD
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
  status: string;
  price_per_night: number;
}

export const getAvailableRooms = async (
  check_in: string,
  check_out: string,
  size: string,
  token: string | null
) => {
    const res = await axios.get(`${BASE_URL}/available`, {
        params: {
            check_in, check_out, size
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
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
