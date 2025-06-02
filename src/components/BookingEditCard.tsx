import { Booking, CreateBookingPayload } from "../api/userApi/bookingApi";
import { DogData } from "../api/userApi/dogApi";
import { RoomSize } from "../pages/user/Booking";

interface BookingEditCardProps {
  booking: Booking;
  dogs: DogData[];
  formData: CreateBookingPayload;
  setFormData: React.Dispatch<React.SetStateAction<CreateBookingPayload>>;
  selectedSize: RoomSize;
  setSelectedSize: React.Dispatch<React.SetStateAction<RoomSize>>;
  availableRooms: any[];
  onUpdate: () => void;
  onCancel: () => void;
  statusMessage: string | null;
}

export const BookingEditCard = ({
  dogs,
  formData,
  setFormData,
  selectedSize,
  setSelectedSize,
  availableRooms,
  onUpdate,
  onCancel,
  statusMessage,
}: BookingEditCardProps) => {

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg mx-auto">
      <h3 className="text-md md:text-xl font-bold text-[#A88763] mb-4">Edit Booking</h3>
      {/* เลือกหมา */}
      <select
        value={formData.dog_id}
        onChange={(e) => setFormData({ ...formData, dog_id: e.target.value })}
        className="w-full border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
      >
        <option value="">-- Select Dog --</option>
        {dogs.map((dog) => (
          <option key={dog.id} value={dog.id}>
            {dog.name}
          </option>
        ))}
      </select>

      {/* วันที่ */}
      <div className="flex gap-4 md:mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Check-In</label>
          <input
            type="date"
            value={formData.check_in}
            onChange={(e) =>
              setFormData({ ...formData, check_in: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Check-Out</label>
          <input
            type="date"
            value={formData.check_out}
            onChange={(e) =>
              setFormData({ ...formData, check_out: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
          />
        </div>
      </div>

      {/* ขนาดห้อง */}
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value as RoomSize)}
        className="w-full border border-gray-300 rounded-md p-2 mb-2 md:mb-4"
      >
        <option value="">-- Room Size --</option>
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>

      {/* ห้องว่าง */}
      <select
        value={formData.hotelroom_id}
        onChange={(e) =>
          setFormData({ ...formData, hotelroom_id: e.target.value })
        }
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      >
        <option value="">-- Available Rooms --</option>
        {availableRooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name} – ฿{room.price_per_night}
          </option>
        ))}
      </select>
      <div className="text-red-400 text-sm text-center">{statusMessage}</div>
      {/* ปุ่ม */}
      <div className="flex justify-end gap-4 text-xs md:text-lg">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          ❌ Cancel
        </button>
        <button
          onClick={onUpdate}
          className="px-4 py-2 bg-[#A88763] text-white rounded hover:bg-[#926f4e]"
        >
          ✅ Update
        </button>
      </div>
    </div>
  );
};
