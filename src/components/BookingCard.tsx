import { useState } from "react";
import { Booking } from "../api/userApi/bookingApi";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";
import { Link } from "react-router-dom";
import { FilterType } from "../pages/user/Booking";
import { setDateTime, showDDMMYY } from "../utils/validators";

interface BookingCard {
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onCancel: (id: number) => void;
  hasReview: boolean;
  onReviewClick: (booking: Booking) => void;
  filterType: FilterType;
}

function BookingCard({
  booking,
  onEdit,
  onCancel,
  hasReview,
  onReviewClick,
  filterType,
}: BookingCard) {
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    check_in,
    check_out,
    dog_name,
    room_name,
    price_per_night,
    booking_id,
  } = booking;

  const checkInDate = showDDMMYY(check_in);
  const checkOutDate = showDDMMYY(check_out);
  const today = setDateTime();
  const checkIn = setDateTime(check_in);
  
  const days =
    Math.ceil(
      (new Date(check_out).getTime() - new Date(check_in).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 0;

  return (
    <div className="w-[200px] md:w-full max-h-screen bg-white rounded-xl p-4 shadow-md text-[#3B3B3B] text-sm md:text-md lg:text-lg">
      <h3 className="font-semibold text-[#A88763] mb-2">
        {dog_name}
      </h3>
      <div className="flex">
        <p className="w-1/2">Room:</p>
        <p>{room_name}</p>
      </div>
      <div className="flex">
         <p className="w-1/2">Check-in:</p>
         <p>{checkInDate}</p>
      </div>
     <div className="flex">
         <p className="w-1/2">Check-out:</p>
         <p>{checkOutDate}</p>
      </div>
      <div className="flex">
        <p className="w-1/2">Price/Night:</p>
        <p>฿{price_per_night}</p>
      </div>
      <div className="flex">
        <p className="w-1/2">Days:</p>
        <p>{days}</p>
      </div>
      <div className="flex font-bold text-[#A88763]">
        <p className="w-1/2">Total:</p>
      <p>฿{price_per_night * days}</p>
      </div>
      

      <div className="flex justify-end gap-2 mt-4">
        {filterType === "past" ||
        (filterType === "upcoming" && checkIn <= today) ||
        (filterType === "all" && checkIn <= today) ? (
          <button disabled title="Cannot edit past bookings">
            <FaPencil className="w-4 h-4 text-gray-300 cursor-not-allowed" />
          </button>
        ) : (
          <button onClick={() => onEdit(booking)} title="Edit">
            <FaPencil className="w-3 md:w-4 h-3 md:h-4 text-blue-500 hover:scale-110 transition" />
          </button>
        )}

        <button onClick={() => setShowConfirm(true)} title="cancel">
          <FaTrash className="w-3 md:w-4 h-3 md:h-4 text-red-500 hover:scale-110 transition" />
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Do you want to delete this booking?"
          onConfirm={() => {
            onCancel(booking_id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div className="flex justify-end mt-4">
        <Link
          to={hasReview ? "/review" : "/booking"}
          onClick={() => onReviewClick(booking)}
          className="text-xs md:text-sm text-green-600 hover:underline"
        >
          {hasReview ? "View Review" : "Write Review"}
        </Link>
      </div>
    </div>
  );
}

export default BookingCard;
