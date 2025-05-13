import { useState } from "react";
import { Booking } from "../api/bookingApi";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

interface BookingCard {
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onCancel: (id: number) => void;
}

function BookingCard({ booking, onEdit, onCancel }: BookingCard) {
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    check_in,
    check_out,
    dog_name,
    room_name,
    price_per_night,
    booking_id,
  } = booking;
  const check_in_date = new Date(check_in).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const check_out_date = new Date(check_out).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const days =
    Math.ceil(
      (new Date(check_out).getTime() - new Date(check_in).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 0;

  return (
    <div className="w-[200px] md:w-full max-h-screen bg-white rounded-xl p-4 shadow-md text-[#3B3B3B]">
      <h3 className="text-md md:text-xl font-semibold text-[#A88763] mb-2">
        {dog_name}
      </h3>
      <p>Room: {room_name}</p>
      <p>Check-in: {check_in_date}</p>
      <p>Check-out: {check_out_date}</p>
      <p>Price/Night: ฿{price_per_night}</p>
      <p>Days: {days}</p>
      <p className="font-bold text-[#A88763]">
        Total: ฿{price_per_night * days}
      </p>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => onEdit(booking)} title="Edit">
          <FaPencil className="w-4 h-4 text-blue-500 hover:scale-110 transition" />
        </button>
        <button onClick={() => setShowConfirm(true)} title="cancel">
          <FaTrash className="w-4 h-4 text-red-500 hover:scale-110 transition" />
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Do you want to delete this booking?"
          onConfirm={() => {
            onCancel(booking_id);
            setShowConfirm(false)
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default BookingCard;
