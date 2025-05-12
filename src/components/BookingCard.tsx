import { Booking } from "../api/bookingApi";

interface Props {
  booking: Booking;
}

function BookingCard({ booking }: Props) {
  const { check_in, check_out, dog_name, room_name, price_per_night } = booking;
  const check_in_date = new Date(check_in).toLocaleDateString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric"
  })
  const check_out_date = new Date(check_out).toLocaleDateString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric"
  })

  const days =
    Math.ceil(
      (new Date(check_out).getTime() - new Date(check_in).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 0;

  return (
    <div className="bg-white rounded-xl p-4 shadow-md text-[#3B3B3B] mt-20">
      <h3 className="text-xl font-semibold text-[#A88763] mb-2">{dog_name}</h3>
      <p>Room: {room_name}</p>
      <p>Check-in: {check_in_date}</p>
      <p>Check-out: {check_out_date}</p>
      <p>Price/Night: ฿{price_per_night}</p>
      <p>Days: {days}</p>
      <p className="font-bold text-[#A88763]">Total: ฿{price_per_night * days}</p>
    </div>
  );
}

export default BookingCard;
