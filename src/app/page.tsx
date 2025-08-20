"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      router.push("/letter");
    }, 1500); // Wait for animation to complete before redirecting
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-pink-100 to-rose-200">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-80 h-56 cursor-pointer"
        onClick={handleEnvelopeClick}
        style={{ perspective: "1000px" }}
      >
        {/* Letter */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[70%] h-[80%] bg-white rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          initial={{ y: 0 }}
          animate={{
            y: isOpening ? -100 : 0,
            scale: isOpening ? 1.1 : 1,
            zIndex: isOpening ? 20 : 5,
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="text-4xl transform hover:scale-110 transition-transform">
            💌
          </span>
        </motion.div>

        {/* Envelope Body */}
        <motion.div
          className="absolute inset-0 bg-rose-400 rounded-lg shadow-lg overflow-hidden"
          animate={{ scale: isOpening ? 1.1 : 1, zIndex: isOpening ? 1 : 10 }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Bottom Triangle */}
          <div className="absolute bottom-0 left-0 w-full h-0 border-l-[160px] border-r-[160px] border-b-[80px] border-l-transparent border-r-transparent border-b-rose-500" />
        </motion.div>

        {/* Side Flaps */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg"
          style={{ zIndex: 8 }}
        >
          {/* Left Flap */}
          <div className="absolute left-0 top-1/2 w-1/2 h-1/2 origin-right bg-rose-500/80 -skew-y-[20deg]" />
          {/* Right Flap */}
          <div className="absolute right-0 top-1/2 w-1/2 h-1/2 origin-left bg-rose-500/80 skew-y-[20deg]" />
        </div>

        {/* Top Flap */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 origin-bottom bg-rose-300 rounded-t-lg"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpening ? -180 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            zIndex: isOpening ? 1 : 10,
          }}
        >
          <div className="absolute inset-0 bg-rose-500 rounded-t-lg transform rotate-180" />
          {/* Inner shadow for depth */}
          <div className="absolute inset-0 bg-black/10 rounded-t-lg" />
        </motion.div>

        {/* Letter */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[70%] h-[80%] bg-white rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          initial={{ y: 0 }}
          animate={{
            y: isOpening ? -100 : 0,
            scale: isOpening ? 1.1 : 1,
            zIndex: isOpening ? 20 : 5,
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="text-4xl transform hover:scale-110 transition-transform">
            💌
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
}
