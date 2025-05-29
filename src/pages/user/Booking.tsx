import { useEffect, useState } from "react";
import {
  getMyBookings,
  createBooking,
  getAvailableRooms,
  cancelBooking,
  updateBooking,
} from "../../api/userApi/bookingApi";
import { Booking, CreateBookingPayload } from "../../api/userApi/bookingApi";
import BookingCard from "../../components/BookingCard";
import { DogData, getMyDogs } from "../../api/userApi/dogApi";
import { useLoading } from "../../context/LoadingContext";
import GlobalLoader from "../../components/GlobalLoader";
import { BookingEditCard } from "../../components/BookingEditCard";
import { getMyReviews } from "../../api/userApi/reviewApi";
import ReviewModal from "../../components/ReviewModal";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface Review {
  id: number;
  booking_id: number;
  rating: number;
  comment: string;
}

export type RoomSize = "S" | "M" | "L" | "";
export type FilterType = "past" | "upcoming" | "all";

function BookingPage() {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { setIsLoading } = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState<number | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [selectedSize, setSelectedSize] = useState<RoomSize>("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [editSelectedSize, setEditSelectedSize] = useState<RoomSize>("");
  const {token, userId} = useAuth()
  const [createFormData, setCreateFormData] = useState<CreateBookingPayload>({
    dog_id: "",
    hotelroom_id: "",
    check_in: "",
    check_out: "",
  });
  const [editFormData, setEditFormData] = useState<CreateBookingPayload>({
    dog_id: "",
    hotelroom_id: "",
    check_in: "",
    check_out: "",
  });

  useEffect(() => {
    if (statusMessage) {
      const timeout = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [statusMessage]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await getMyBookings(token, userId);
      const bookingData = response.data;
      setBookings(bookingData);
      setIsLoading(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage("error.response?.data?.message || error.message");
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Something went wrong during fetching bookings");
      }
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getMyReviews(token, userId);
      setReviews(res.data);
    } catch (error: unknown) {
      console.error("Error fetching reviews", error);
    }
  };

  const fetchMyDogs = async (token: string | null) => {
    try {
      const res = await getMyDogs(token);
      setDogs(res.data);
    } catch (error: unknown) {
      console.error("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchMyDogs(token);
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      const formDataToUse = isEditing ? editFormData : createFormData;
      const sizeToUse = isEditing ? editSelectedSize : selectedSize;

      if (formDataToUse.check_in && formDataToUse.check_out && sizeToUse) {
        try {
          const res = await getAvailableRooms(
            formDataToUse.check_in.slice(0, 10),
            formDataToUse.check_out.slice(0, 10),
            sizeToUse,
            token
          );
          setAvailableRooms(res.data);
        } catch (error: unknown) {
          console.error("Error fetching rooms", error);
        }
      }
    };

    fetchRooms();
  }, [
    isEditing,
    createFormData.check_in,
    createFormData.check_out,
    selectedSize,
    editFormData.check_in,
    editFormData.check_out,
    editSelectedSize,
  ]);

  const handleCreateBooking = async () => {
    try {
      const res = await createBooking(createFormData, token);
      const message = res?.data?.message ?? "Booking created successfully";
      setCreateFormData({
        dog_id: "",
        hotelroom_id: "",
        check_in: "",
        check_out: "",
      });
      setSelectedSize("");
      setStatusMessage(message);
      fetchBookings();
    } catch (error: unknown) {
      console.error("Booking error", error);
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Unexpected error occurred on create booking");
      }
    }
  };

  const handleEdit = (booking: Booking) => {
    setIsEditing(true);
    setEditingBookingId(booking.booking_id);
    setEditFormData({
      dog_id: String(booking.dog_id),
      hotelroom_id: String(booking.hotelroom_id),
      check_in: booking.check_in.slice(0, 10),
      check_out: booking.check_out.slice(0, 10),
    });

    const roomSize = availableRooms.find((r) => r.name === booking.room_name)?.size || "";
    setEditSelectedSize(roomSize);
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await cancelBooking(bookingId, token);
      setStatusMessage("Booking cancelled successfully");
      fetchBookings();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Failed to cancel booking");
      }
    }
  };

  const handleUpdateBooking = async () => {
    if (!editingBookingId) return;

    // หา booking ตัวที่กำลังแก้จาก bookings[]
    const oldBooking = bookings.find(
      (booking) => booking.booking_id === editingBookingId
    );
    if (!oldBooking) return;

    //สร้าง payload ใหม่ให้เก็บค่าจาก bookings เดิมถ้าไม่มีการใส่ค่าใหม่มา
    const updatedPayload = {
      dog_id: editFormData.dog_id || String(oldBooking.booking_id),
      hotelroom_id: editFormData.hotelroom_id || String(oldBooking.hotelroom_id),
      check_in: editFormData.check_in || oldBooking.check_in.slice(0, 10),
      check_out: editFormData.check_out || oldBooking.check_out.slice(0, 10),
    };

    try {
      await updateBooking(token, updatedPayload, editingBookingId);
      setStatusMessage("Booking Update Successfully");
      setIsEditing(false);
      setEditingBookingId(null);
      fetchBookings();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Failed to update booking");
      }
    }
  };

  //กรองเอาแต่บุกกิ้งที่ status = 'confirmed' และfilter past, all, upcoming events
  const getFilteredBookings = () => {
    const today = new Date();
    return bookings.filter((booking) => {
      const checkOut = new Date(booking.check_out);

      if (filterType === "all" && booking.status === "confirmed") {
        return booking;
      } else if (filterType === "past" && booking.status === "confirmed") {
        return checkOut < today;
      } else if (filterType === "upcoming" && booking.status === "confirmed") {
        return checkOut >= today;
      } else {
        return false;
      }
    });
  };

  const hasReviewForBooking = (bookingId: number): boolean => {
    return reviews.some((review) => review.booking_id === bookingId);
  };

  const handleReviewClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleReviewSuccess = () => {
    fetchBookings();
    fetchReviews();
  };

  return (
    <section className="min-h-screen bg-[#FDF9F1] py-10 px-6 mt-90 md:mt-30">
      <GlobalLoader />
      <h1 className="text-xl md:text-3xl font-bold text-[#A88763] text-center">
        My Bookings
      </h1>
      {/* ฟอร์มสร้าง booking */}
      <div className="mt-10">
        <div className="flex flex-col justify-center items-center p-3 md:p-6 bg-white rounded-xl shadow max-w-xl mx-auto mb-6 text-xs md:text-lg">
          <h2 className="text-lg font-semibold text-[#A88763] mb-2">
            Create Booking
          </h2>
          {/* เลือกวันที่ */}
          <div className="flex flex-col md:flex-row w-full justify-evenly">
            <div className="flex justify-center items-baseline">
              <strong>Check-In</strong>
              <input
                type="date"
                value={createFormData.check_in}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    check_in: e.target.value,
                  })
                }
                required
                className="mx-4"
              />
            </div>
            <div className="flex justify-center items-baseline">
              <strong>Check-Out</strong>
              <input
                type="date"
                value={createFormData.check_out}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    check_out: e.target.value,
                  })
                }
                required
                className="mb-6 mx-4"
              />
            </div>
          </div>

          {/* เลือกหมา */}
          <select
            value={createFormData.dog_id}
            onChange={(e) =>
              setCreateFormData({ ...createFormData, dog_id: e.target.value })
            }
            required
            className="w-full border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
          >
            <option value="" disabled>
              -- Select Your Dog --
            </option>
            {dogs.map((dog) => (
              <option key={dog.id} value={dog.id}>
                {dog.name}
              </option>
            ))}
          </select>

          {/* เลือกขนาดห้อง */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value as RoomSize)}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
          >
            <option value="">-- เลือกขนาดห้อง --</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>

          {/* แสดงห้องที่ว่าง */}
          <select
            value={createFormData.hotelroom_id}
            onChange={(e) =>
              setCreateFormData({
                ...createFormData,
                hotelroom_id: e.target.value,
              })
            }
            required
            className="w-full border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
          >
            <option value="">-- เลือกห้องที่ว่าง --</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} – ฿{room.price_per_night}
              </option>
            ))}
          </select>
          <div className="text-center text-red-600 mb-2 md:mb-4">
            {statusMessage || ""}
          </div>
          <button
            onClick={handleCreateBooking}
            className="bg-[#A88763] text-white px-6 py-1 md:py-2 rounded-full hover:bg-[#926f4e] transition"
          >
            Book Now
          </button>
        </div>

        {/* การ์ดแสดง booking */}
        <div className="flex justify-center gap-3 mb-4 text-xs md:text-lg">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-full ${
              filterType === "all" ? "bg-[#A88763] text-white" : "bg-gray-200"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterType("upcoming")}
            className={`px-4 py-2 rounded-full ${
              filterType === "upcoming"
                ? "bg-[#A88763] text-white"
                : "bg-gray-200"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setFilterType("past")}
            className={`px-4 py-2 rounded-full ${
              filterType === "past" ? "bg-[#A88763] text-white" : "bg-gray-200"
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {selectedBooking && (
        <ReviewModal
          bookingId={selectedBooking.booking_id}
          userId={parseInt(userId || "0")}
          token={token || ""}
          onClose={() => setSelectedBooking(null)}
          onSuccess={handleReviewSuccess}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-6 text-sm md:text-lg md:p-20">
        {getFilteredBookings().map((booking) =>
          isEditing && editingBookingId === booking.booking_id ? (
            <BookingEditCard
              key={booking.booking_id}
              booking={booking}
              dogs={dogs}
              formData={editFormData}
              setFormData={setEditFormData}
              selectedSize={editSelectedSize}
              setSelectedSize={setEditSelectedSize}
              availableRooms={availableRooms}
              onUpdate={handleUpdateBooking}
              onCancel={() => {
                setIsEditing(false);
                setEditingBookingId(null);
              }}
              statusMessage={statusMessage}
            />
          ) : (
            <BookingCard
              key={booking.booking_id}
              booking={booking}
              onEdit={handleEdit}
              onCancel={handleCancelBooking}
              hasReview={hasReviewForBooking(booking.booking_id)}
              onReviewClick={handleReviewClick}
              filterType={filterType}
            />
          )
        )}
      </div>
    </section>
  );
}

export default BookingPage;
