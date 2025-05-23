import { useState } from "react";
import { createReview } from "../api/userApi/reviewApi";
import { FaStar } from "react-icons/fa";
import axios from "axios";

interface ReviewModalProps {
  bookingId: number;
  userId: number;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({
  bookingId,
  userId,
  token,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await createReview(
        { booking_id: bookingId, user_id: userId, rating, comment },
        token
      );
      onSuccess();
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if(error instanceof Error) {
        setStatusMessage(error.message)
      }else {
        setStatusMessage("review failed")
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg mx-auto animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-[#A88763]">Write Your Review</h2>

        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <textarea
          rows={4}
          maxLength={50}
          placeholder="Leave a comment..."
          className="w-full border rounded-md p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {statusMessage && <p className="text-red-600 text-sm">{statusMessage}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-[#A88763] text-white hover:bg-[#926f4e]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
