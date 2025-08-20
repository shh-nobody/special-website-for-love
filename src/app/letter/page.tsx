"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LetterPage() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
        },
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-100 via-rose-50 to-violet-100 overflow-hidden p-6">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ x: heart.x, y: heart.y, opacity: 1, scale: 0.8 }}
          animate={{ y: -100, opacity: 0, scale: 1.2 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="absolute text-pink-400"
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl border border-pink-200 p-8 text-center"
      >
        <h1 className="text-3xl font-bold text-rose-500 mb-6">For You ❤️</h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Dear Shandra. I know this might be unexpected, but I wanted to reach
          out and apologize for the hurt I caused you. I never meant to hurt
          you, and I deeply regret my actions. I understand if you need space,
          but I hope we can find a way to reconnect someday...
        </p>

        <p className="text-gray-700 leading-relaxed italic">
          And about the instagram follow, i just want to clarify that..
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          I didn’t follow her back because I wanted to get back together, it was
          only as a friend. I truly never realized it would hurt you, and I’m
          deeply sorry for that. I know it might be too late, but please know I
          never wanted to cause you pain. You’ve meant a lot to me, and I only
          wish you peace and happiness, always...
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          If space is what you need, I will respect it. But please know...
        </p>
        <p className="text-gray-700 leading-relaxed italic">
          You mean more to me just like you think you mean to me.
        </p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-5xl"
        >
          💖
        </motion.div>

        <button
          onClick={() => (window.location.href = "/our-story")}
          className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition"
        >
          Read Our Story
        </button>
      </motion.div>
    </main>
  );
}
