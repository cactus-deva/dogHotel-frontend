import { useEffect, useState } from "react";
import { getMyBookings, createBooking, getAvailableRooms } from "../../api/bookingApi";
import { Booking, CreateBookingPayload } from "../../api/bookingApi";
import BookingCard from "../../components/BookingCard";
import { DogData, getMyDogs } from "../../api/dogApi";



function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [selectedSize, setSelectedSize] = useState("")
  const [availableRooms, setAvailableRooms] = useState<any[]>([])
  const [formData, setFormData] = useState<CreateBookingPayload>({
    dog_id: "",
    hotelroom_id: "",
    check_in: "",
    check_out: "",
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchAvailableRooms = async () => {
    if(formData.check_in && formData.check_out && selectedSize) {
      try {
        const inDate = formData.check_in.slice(0,10)
        const outDate = formData.check_out.slice(0,10)

        const res = await getAvailableRooms(inDate, outDate, selectedSize, token)
        setAvailableRooms(res.data.data)
      } catch (error) {
        console.error("Error fetching rooms", error)
      }
    }
  }

  useEffect(() => {
    fetchAvailableRooms()
  },[formData.check_in, formData.check_out, selectedSize])

  const fetchBookings = async () => {
    try {
      const response = await getMyBookings(token, userId);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  const fetchMyDogs = async (token: string | null) => {
    const res = await getMyDogs(token);
    setDogs(res.data);
  };

  const handleCreateBooking = async () => {
    try {
      await createBooking(formData, token);
      fetchBookings();
    } catch (error) {
      console.error("Error creating booking", error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchMyDogs(token);
  }, []);

  return (
    <section className="min-h-screen bg-[#FDF9F1] py-10 px-6">
  <h1 className="text-3xl font-bold text-[#A88763] mb-6 text-center">
    My Bookings
  </h1>

  {/* การ์ดแสดง booking */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {bookings
      .filter((booking) => booking.status === "confirmed")
      .map((booking) => (
        <BookingCard key={booking.booking_id} booking={booking} />
      ))}
  </div>

  {/* ฟอร์มสร้าง booking */}
  <div className="flex flex-col justify-center items-center mt-10 p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
    <h2 className="text-2xl font-semibold text-[#A88763] mb-4">
      Create Booking
    </h2>

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

    {/* เลือกวันที่ */}
    <input
      type="date"
      value={formData.check_in}
      onChange={(e) =>
        setFormData({ ...formData, check_in: e.target.value })
      }
      className="input-style"
    />
    <input
      type="date"
      value={formData.check_out}
      onChange={(e) =>
        setFormData({ ...formData, check_out: e.target.value })
      }
      className="input-style mb-4"
    />

    {/* เลือกขนาดห้อง */}
    <select
      value={selectedSize}
      onChange={(e) => setSelectedSize(e.target.value)}
      className="w-full border border-gray-300 rounded-md p-2 mb-4"
    >
      <option value="">-- เลือกขนาดห้อง --</option>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
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

    <button
      onClick={handleCreateBooking}
      className="bg-[#A88763] text-white px-6 py-2 rounded-full hover:bg-[#926f4e] transition"
    >
      Book Now
    </button>
  </div>
</section>
  );
}

export default BookingPage;
