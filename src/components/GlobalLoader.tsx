import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import dogWait from "../assets/loader-dog.json";
import { useLoading } from "../context/LoadingContext";

export default function GlobalLoader() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-white bg-opacity-70 z-40 flex items-center justify-center mt-50 md:mt-1"
        >
          <Lottie animationData={dogWait} loop autoplay style={{ width: 250 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
