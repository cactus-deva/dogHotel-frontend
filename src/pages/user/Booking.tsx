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

interface Review {
  id: number;
  booking_id: number;
  rating: number;
  comment: string;
}

export type RoomSize = 'S' | 'M' | 'L' | ''

function BookingPage() {
  const [filterType, setFilterType] = useState<"past" | "upcoming" | "all">(
    "all"
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { setIsLoading } = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState<number | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [selectedSize, setSelectedSize] = useState<RoomSize>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [formData, setFormData] = useState<CreateBookingPayload>({
    dog_id: "",
    hotelroom_id: "",
    check_in: "",
    check_out: "",
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const today = new Date().toLocaleDateString("en-GB");

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
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getMyReviews(token, userId);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const fetchMyDogs = async (token: string | null) => {
    const res = await getMyDogs(token);
    setDogs(res.data);
  };

  const handleCreateBooking = async () => {
    try {
      const res = await createBooking(formData, token);
      const message = res?.data?.message ?? "Booking created successfully";
      setStatusMessage(message);
      fetchBookings();
    } catch (error: any) {
      console.error("Booking error", error.response?.data || error.message);

      const fallbackMessage =
        error?.response?.data?.message ??
        error?.message ??
        "unexpected error occurred";
      setStatusMessage(fallbackMessage);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchMyDogs(token);
    fetchReviews();
  }, []);

  const fetchAvailableRooms = async () => {
    if (formData.check_in && formData.check_out && selectedSize) {
      try {
        const inDate = formData.check_in.slice(0, 10);
        const outDate = formData.check_out.slice(0, 10);

        const res = await getAvailableRooms(
          inDate,
          outDate,
          selectedSize,
          token
        );
        setAvailableRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    }
  };

  useEffect(() => {
    fetchAvailableRooms();
  }, [formData.check_in, formData.check_out, selectedSize]);

  const handleEdit = (booking: Booking) => {
    setIsEditing(true);
    setEditingBookingId(booking.booking_id);
    setFormData({
      dog_id: "",
      hotelroom_id: "",
      check_in: booking.check_in.slice(0, 10),
      check_out: booking.check_out.slice(0, 10),
    });
    const roomSize =
      availableRooms.find((r) => r.name === booking.room_name)?.size || "";
    setSelectedSize(roomSize);
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await cancelBooking(bookingId, token);
      setStatusMessage("Booking cancelled successfully");
      fetchBookings();
    } catch (err: any) {
      setStatusMessage(
        err.response?.data?.message ?? "Failed to cancel booking"
      );
    }
  };

  const handleUpdateBooking = async () => {
    if (!editingBookingId) return;
    try {
      await updateBooking(token, formData, editingBookingId);
      setStatusMessage("Booking Update Successfully");
      setIsEditing(false);
      setEditingBookingId(null);
      fetchBookings();
    } catch (error: any) {
      setStatusMessage(
        error.response?.data?.message ?? "Failed to update booking"
      );
    }
  };
  //กรองเอาแต่บุกกิ้งที่ status = 'confirmed' และfilter upcoming booking & past booking

  const filterBookings = bookings.filter((booking) => {
    const checkOut = new Date(booking.check_out).toLocaleDateString("en-GB");
    if (filterType === "all" && booking.status === "confirmed") {
      return booking;
    } else if (filterType === "past" && booking.status === "confirmed") {
      return checkOut < today;
    } else if (filterType === "upcoming" && booking.status === "confirmed") {
      return checkOut >= today;
    } else {
      return;
    }
  });
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
    <section className="min-h-screen bg-[#FDF9F1] py-10 px-6 mt-10 overflow-hidden">
      <GlobalLoader />
      <h1 className="text-3xl font-bold text-[#A88763] mb-6 text-center">
        My Bookings
      </h1>
      {/* ฟอร์มสร้าง booking */}
      <div className="flex flex-col justify-center items-center mt-10 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#A88763] mb-4">
          Create Booking
        </h2>
        {/* เลือกวันที่ */}
        <div className="flex w-full justify-evenly">
          <div className="flex justify-start items-baseline">
            <strong>Check-In</strong>
            <input
              type="date"
              value={formData.check_in}
              onChange={(e) =>
                setFormData({ ...formData, check_in: e.target.value })
              }
              required
              className="mx-4"
            />
          </div>
          <div className="flex justify-end items-baseline">
            <strong>Check-Out</strong>
            <input
              type="date"
              value={formData.check_out}
              onChange={(e) =>
                setFormData({ ...formData, check_out: e.target.value })
              }
              required
              className="mb-6 mx-4"
            />
          </div>
        </div>

        {/* เลือกหมา */}
        <select
          value={formData.dog_id}
          onChange={(e) => setFormData({ ...formData, dog_id: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
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
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="">-- เลือกขนาดห้อง --</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>

        {/* แสดงห้องที่ว่าง */}
        <select
          value={formData.hotelroom_id}
          onChange={(e) =>
            setFormData({ ...formData, hotelroom_id: e.target.value })
          }
          required
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="">-- เลือกห้องที่ว่าง --</option>
          {availableRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} – ฿{room.price_per_night}
            </option>
          ))}
        </select>
        <div className="text-center text-red-600 mb-4">
          {statusMessage || ""}
        </div>
        <button
          onClick={handleCreateBooking}
          className="bg-[#A88763] text-white px-6 py-2 rounded-full hover:bg-[#926f4e] transition"
        >
          Book Now
        </button>
      </div>

      {/* การ์ดแสดง booking */}
      <div className="flex justify-center my-7 gap-4">
        <button
          onClick={() => setFilterType("all")}
          className={`px-4 py-2 rounded-full ${
            filterType === "all"
              ? "bg-[#A88763] text-white"
              : "bg-gray-200"
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
        {filterBookings.map((booking) =>
          isEditing && editingBookingId === booking.booking_id ? (
            <BookingEditCard
              key={booking.booking_id}
              booking={booking}
              dogs={dogs}
              formData={formData}
              setFormData={setFormData}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              availableRooms={availableRooms}
              onUpdate={handleUpdateBooking}
              onCancel={() => {
                setIsEditing(false);
                setEditingBookingId(null);
              }}
            />
          ) : (
            <BookingCard
              key={booking.booking_id}
              booking={booking}
              onEdit={handleEdit}
              onCancel={handleCancelBooking}
              hasReview={hasReviewForBooking(booking.booking_id)}
              onReviewClick={handleReviewClick}
            />
          )
        )}
      </div>
    </section>
  );
}

export default BookingPage;
