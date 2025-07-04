import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import {
  deleteReview,
  getMyReviews,
  updateReview,
} from "../../api/userApi/reviewApi";
import ConfirmModal from "../../components/ConfirmModal";
import GlobalLoader from "../../components/GlobalLoader";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { showDDMMYY } from "../../utils/validators";

interface Review {
  id: number;
  rating: number;
  comment: string;
  booking_id: number;
  created_at: string;
  dog_name: string;
  room_name: string;
  check_in: string;
  check_out: string;
}

export default function Review() {
  const { setIsLoading } = useLoading();
  const { token, userId } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({ rating: 5, comment: "" });
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchReview = async () => {
    try {
      setIsLoading(true);
      const res = await getMyReviews(token, userId);
      setReviews(res.data);
      setIsLoading(false);
    } catch (error: unknown) {
      console.error(error, "failed to fetch reviews");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const handleEdit = (review: Review) => {
    setErrorMessage("");
    setEditingReview(review);
    setFormData({
      ...formData,
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleUpdate = async () => {
    if (!editingReview) return;

    try {
      await updateReview(token, formData, editingReview.id);
      setEditingReview(null);
      setFormData({ rating: 5, comment: "" });
      fetchReview();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to update review");
      }
    }
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    try {
      await deleteReview(token, reviewToDelete);
      setReviewToDelete(null);
      fetchReview();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to delete review");
      }
    }
  };

  return (
    <section className="min-h-screen bg-[#FDF9F1] p-20 mt-50 sm:mt-30">
      <GlobalLoader />
      <h1 className="text-2xl md:text-3xl font-bold text-[#A88763] text-center mb-10">
        My Reviews
      </h1>
      {reviews.length === 0 ? (
          <div className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient">
            <div className="flex justify-center items-center mt-30 gap-2">
              <span className="text-2xl font-semibold">
               You don't have review yet. Let's create your first review.
              </span>
            </div>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-md p-6 space-y-4"
            >
              <p className="text-[#A88763] font-semibold m-0">
                🐶 {review.dog_name} • 🛏️ {review.room_name}
              </p>
              <p className="text-sm text-gray-500">
                Check-in: {showDDMMYY(review.check_in)} -{" "}
                {showDDMMYY(review.check_out)}
              </p>
              <div className="border-amber-200 border-1 px-1 py-2 bg-amber-500/10 rounded-md text-sm md:text-md">
                <p className="text-gray-700">{review.comment}</p>
                <p className="font-semibold text-[#A88763] flex items-center gap-2">
                  Rating:
                  <span className="flex">
                    {Array.from({ length: review.rating ?? 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </span>
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Reviewed on: {showDDMMYY(review.created_at)}
              </p>
              <div className="flex gap-4">
                <button
                  className="text-blue-600 hover:underline text-sm cursor-pointer"
                  onClick={() => handleEdit(review)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                  onClick={() => setReviewToDelete(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4 text-sm md:text-lg mx-10">
            <h2 className="text-lg font-semibold text-[#A88763]">
              Edit Review
            </h2>
            <label className="block">
              <span>Rating</span>
              <input
                type="number"
                min={1}
                max={5}
                value={formData.rating ?? 5}
                required
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                }
                className="w-full border rounded p-2 mt-1"
              />
            </label>
            <label className="block">
              <span>Comment</span>
              <textarea
                rows={4}
                value={formData.comment}
                maxLength={50}
                required
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="w-full border rounded p-2 mt-1"
              ></textarea>
            </label>
            <div className="text-red-500">{errorMessage}</div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingReview(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-[#A88763] text-white px-4 py-2 rounded hover:bg-[#926f4e]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {reviewToDelete !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this review?"
          onConfirm={handleDelete}
          onCancel={() => setReviewToDelete(null)}
        />
      )}
    </section>
  );
}
