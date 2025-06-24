import { useEffect, useState } from "react";

interface ReviewSlide {
  name: string;
  comment: string;
}

const reviewsArray: ReviewSlide[] = [
  { name: "Janice", comment: "Good Service" },
  { name: "Patrick", comment: "The hotel is cozy for my dogs." },
  { name: "Dominik", comment: "Staffs are helpful and friendly." },
  { name: "Joey", comment: "Recommended!!" },
  { name: "Mark", comment: "Our dog is very happy. I know it!" },
  {
    name: "Judy",
    comment: "Great service. I should tell my friend to come here.",
  },
  { name: "Macky", comment: "Reasonable price and good service" },
  { name: "Zimmy", comment: "Thumbs up!" },
];

export default function ReviewSlide() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === reviewsArray.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentReview = reviewsArray[index];
  return (
    <>
      <strong>Review from Customers</strong>
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md mx-auto mt-5 h-[200px]">
        <p className="text-[#A88763] text-md md:text-lg">
          "{currentReview.comment}"
        </p>
        <p className="text-sm md:text-lg text-gray-500 mt-2">
          - {currentReview.name} -
        </p>
      </div>
    </>
  );
}
