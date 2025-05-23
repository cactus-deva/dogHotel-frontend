import Lottie from "lottie-react";
import pageNotFound from "../assets/pageNotFound.json";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="h-150 w-150 mx-auto flex flex-col items-center justify-center text-[#A88763] p-20 my-20">
      <Lottie
        animationData={pageNotFound}
        loop={true}
        className="w-full mb-4"
      />
      <h1 className="text-4xl font-bold my-4">404 - PAGE NOT FOUND</h1>
      <p className="text-lg">Oops... This page doesn't exist.</p>
      <Link
        to="/"
        className="bouncy-btn bg-amber-600 hover:bg-white text-white hover:text-amber-600 font-bold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 my-5"
      >
        Back to Home
      </Link>
    </div>
  );
}
