import Lottie from "lottie-react";
import pageNotFound from "../assets/pageNotFound.json"

export default function PageNotFound() {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF9F1] text-[#A88763] p-20">
      <Lottie animationData={pageNotFound} loop={true} className="w-full mb-4" />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg">Oops... This page doesn't exist.</p>
    </div>
  );
}