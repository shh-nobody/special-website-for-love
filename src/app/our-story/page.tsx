"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import Image from "next/image";

// News section images
const newsImages = {
  art1: "/images/core-memories-1.jpg",
  museum: "/images/core-memories-2.jpg",
  installation: "/images/core-memories-3.jpg",
  gallery: "/images/core-memories-4.jpg",
  sculpture: "/images/core-memories-5.png",
  exhibition: "/images/core-memories-6.png",
  painting: "/images/core-memories-9.jpg",
  artist: "/images/core-memories-8.png.jpg",
  artSpace: "/images/core-memories-7.jpg.png",
  sidebar1: "/images/core-memories-10.jpg",
  sidebar2: "/images/core-memories-11.jpg",
  sidebar3: "/images/20240917_172912.jpg",
  sidebar4: "/images/20241002_161518.jpg",
};

const PolaroidImages = {
  art1: "/images/core-memories-1.jpg",
  museum: "/images/core-memories-2.jpg",
  installation: "/images/core-memories-3.jpg",
  gallery: "/images/core-memories-4.jpg",
  sculpture: "/images/core-memories-5.png",
  exhibition: "/images/core-memories-6.png",
  painting: "/images/core-memories-9.jpg",
  artist: "/images/core-memories-8.png.jpg",
  artSpace: "/images/20241205_111856.jpg",
  sidebar1: "/images/core-memories-10.jpg",
  sidebar2: "/images/core-memories-11.jpg",
  sidebar3: "/images/20240917_172912.jpg",
  sidebar4: "/images/20241002_161518.jpg",
  sidebar5: "/images/Screenshot 2024-08-31 233039.png",
  sidebar6: "/images/Untitled297_20250107182949.png",
};

// All gallery images
const galleryImages = [
  "/images/20240917_172912.jpg",
  "/images/20241002_161518.jpg",
  "/images/20241003_162820.jpg",
  "/images/20241003_163059.jpg",
  "/images/20241003_164159.jpg",
  "/images/20241016_103439.jpg",
  "/images/20241103_191409.jpg",
  "/images/20241105_164931.jpg",
  "/images/20241105_165155.jpg",
  "/images/20241105_165159.jpg",
  "/images/20241127_112707.jpg",
  "/images/20241127_120827.jpg",
  "/images/20241127_134231.jpg",
  "/images/20241127_134249.jpg",
  "/images/20241127_134607.jpg",
  "/images/20241127_134734.jpg",
  "/images/20241202_084824.jpg",
  "/images/20241202_103444.jpg",
  "/images/20241205_103135.jpg",
  "/images/20241205_103216.jpg",
  "/images/20241205_110127.jpg",
  "/images/20241205_111856.jpg",
  "/images/Desktop - 1.png",
  "/images/IMG-20240710-WA0008.jpg",
  "/images/IMG-20240803-WA0076.jpg",
  "/images/IMG-20240809-WA0048.jpg",
  "/images/IMG-20240823-WA0030.jpg",
  "/images/IMG-20240826-WA0031.jpg",
  "/images/IMG-20240829-WA0002.jpg",
  "/images/IMG-20240909-WA0054.jpg",
  "/images/IMG-20240909-WA0058.jpg",
  "/images/IMG-20241002-WA0027.jpg",
  "/images/IMG-20241002-WA0032.jpg",
  "/images/IMG-20241003-WA0036.jpg",
  "/images/IMG-20241004-WA0029(1).jpg",
  "/images/IMG-20241029-WA0023.jpg",
  "/images/IMG-20241105-WA0135(1).jpg",
  "/images/IMG-20241121-WA0049.jpg",
  "/images/IMG-20241127-WA0092.jpg",
  "/images/IMG-20241127-WA0093.jpg",
  "/images/IMG-20241128-WA0023.jpg",
  "/images/IMG-20241128-WA0027.jpg",
  "/images/IMG-20241128-WA0028.jpg",
  "/images/Screenshot 2024-08-31 233039.png",
  "/images/Screenshot_2024-08-22_195925-2.png",
  "/images/Screenshot_2024-08-22_195949-2.png",
  "/images/Untitled249_20250103123006.png",
  "/images/Untitled254_20241106094538.png",
  "/images/Untitled291.png",
  "/images/Untitled295_20250106154118.png",
  "/images/Untitled297_20250107182949.png",
  "/images/Untitled298_20250108201705.png",
  "/images/Untitled299.png",
];
import { Toaster, toast } from "react-hot-toast";
export default function OurStoryPage() {
  const [activeTab, setActiveTab] = useState<
    "Core Memories" | "Polaroids" | "note" | "gallery"
  >("Core Memories");
  const [note, setNote] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendNote = async () => {
    if (!note.trim()) {
      toast.error("Please write something first.");
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch("/api/sendNote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: note }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Your note has been sent ❤️");
        setNote("");
      } else {
        toast.error("Failed to send. Try again later.");
      }
    } catch (_error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const startTimeInSeconds = 120; // 2 minutes

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      // If the audio has ended or is close to ending, reset to start time
      if (audioRef.current.currentTime >= audioRef.current.duration - 0.1) {
        audioRef.current.currentTime = startTimeInSeconds;
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Set the start time before playing
        audioRef.current.currentTime = startTimeInSeconds;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-rose-900/60 to-gray-800 text-white flex flex-col">
      {/* Audio Player */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <div className="bg-black/70 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-lg flex items-center gap-2 sm:gap-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-600 hover:bg-rose-700 transition-colors"
          >
            {isPlaying ? (
              <IoMdPause className="w-6 h-6" />
            ) : (
              <IoMdPlay className="w-6 h-6 ml-1" />
            )}
          </button>
          <div className="text-sm font-medium">
            <div className="text-white">Background Music</div>
            <div className="text-gray-400 text-xs">Lo-fi Piano</div>
          </div>
        </div>
        <audio
          ref={audioRef}
          src="/audio/lofi-piano.mp3"
          loop
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = startTimeInSeconds;
            }
          }}
        />
      </div>
      {/* Navigation */}
      <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-10 py-6 bg-gradient-to-r from-neutral-900/80 to-rose-900/60 shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Our Moments
        </h1>
        <div className="flex flex-wrap justify-center gap-2 sm:ml-8">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border border-transparent ${
              activeTab === "Core Memories"
                ? "bg-rose-600 text-white"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
            onClick={() => setActiveTab("Core Memories")}
          >
            Core Memories
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border border-transparent ${
              activeTab === "Polaroids"
                ? "bg-rose-600 text-white"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
            onClick={() => setActiveTab("Polaroids")}
          >
            Polaroids
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border border-transparent ${
              activeTab === "gallery"
                ? "bg-rose-600 text-white"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border border-transparent ${
              activeTab === "note"
                ? "bg-rose-600 text-white"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
            onClick={() => setActiveTab("note")}
          >
            Leave a Note
          </button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 px-4 sm:px-10 py-8 max-w-7xl w-full mx-auto overflow-x-hidden">
        {activeTab === "Polaroids" && (
          <div className="flex-1 min-h-[80vh] bg-neutral-800/30 rounded-xl p-8 relative">
            <div className="absolute inset-0 bg-[url('/images/corkboard.jpg')] opacity-10 bg-cover bg-center rounded-xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
              {Object.entries(PolaroidImages).map(([key, src], index) => (
                <motion.div
                  key={key}
                  className="bg-white rounded-lg shadow-xl p-3 cursor-move"
                  initial={{
                    opacity: 0,
                    y: 20,
                    rotate: Math.random() * 10 - 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: Math.random() * 10 - 5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                  drag
                  dragConstraints={{
                    left: -100,
                    right: 100,
                    top: -100,
                    bottom: 100,
                  }}
                  dragElastic={0.1}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  whileTap={{ scale: 0.95, rotate: 0 }}
                >
                  <div className="relative w-full aspect-square mb-3 bg-neutral-100 rounded overflow-hidden">
                    <Image
                      src={src}
                      alt={`Memory ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-neutral-800 font-handwriting text-sm">
                      {key === "art1" && "Our First Date ❤️"}
                      {key === "museum" && "Just Us Being Us 🥰"}
                      {key === "installation" && "Friends Noticed Us 👀"}
                      {key === "gallery" && "Cutie Patootie 😈"}
                      {key === "sculpture" && "Colorful Days 🎨"}
                      {key === "exhibition" && "You Made Our Official Card! ✨"}
                      {key === "painting" && "Best Experience 💝"}
                      {key === "artist" && "EC Activities 🎭"}
                      {key === "artSpace" && "First Spark ⚡"}
                      {key === "sidebar1" && "Sweet Memories 🍬"}
                      {key === "sidebar2" && "OTN 2024 With You 💫"}
                      {key === "sidebar3" && "Our Special Day 🌟"}
                      {key === "sidebar4" && "Our Journey Continues 🌈"}
                      {key === "sidebar5" && "A Discord Night ✨"}
                      {key === "sidebar6" && "Jojo Pose 🔥"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "Core Memories" && (
          <>
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-48 flex-shrink-0">
                  <div className="relative w-full h-48 sm:h-32 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={newsImages.art1}
                      alt="Core Memory 1"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Our First Official Date
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Our first official date was a memorable one. We visited the
                    Ice Cream Store and shared laughs over our favorite flavors.
                    After that we just walked around the mall. It was a day
                    filled with joy and happiness.
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs text-gray-400">Unforgettable</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={newsImages.museum}
                      alt="Core Memory 2"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Just Us being Us</h2>
                  <p className="text-gray-300 mb-2">
                    We have daily meetups at the akatel canteen. During our meet
                    , we must take a random photo or video hshshsh. After that i
                    clipped ur nails if its already long. We spent much times
                    after school until its getting dark. And i remember that we
                    once go home at 6 just because spending time talking to each
                    other.
                    <span className="text-gray-500">Our Dailies</span>
                  </p>
                </div>
              </div>

              {/* Second News Section */}
              <div className="flex gap-6">
                <div className="w-48 flex-shrink-0">
                  <img
                    src={newsImages.sculpture}
                    alt="Core Memory 5"
                    className="rounded-xl w-full h-32 object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold">
                    Colorful photo you made
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Seeing this literally makes me smile. I remember the moment
                    we took this photo. It was a beautiful day, me and you were
                    so happy.
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs text-gray-400">Pretty Moment</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <img
                    src={newsImages.gallery}
                    alt="Core Memory 4"
                    className="rounded-xl w-full h-64 object-cover mb-3"
                  />
                  <h2 className="text-2xl font-bold mb-2">
                    Devil bornt just to be a cutie patootie u said..
                  </h2>
                  <p className="text-gray-300 mb-2">
                    That day , we were waiting for practical exam results and
                    you were binding my hand with those ribbons and said,
                    &ldquo;Devil bornt just to be a cutie patootie.&rdquo; It
                    made me laugh so hard HAHAHAHAHA , and i posted this photo
                    on my instagram story XD{" "}
                    <span className="text-gray-500">
                      Unforgettable moment tho
                    </span>
                  </p>
                </div>
              </div>

              {/* Third News Section */}
              <div className="flex gap-6">
                <div className="w-48 flex-shrink-0">
                  <img
                    src={newsImages.artist}
                    alt="Core Memory 8"
                    className="rounded-xl w-full h-32 object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold">EC Activities</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    I&apos;m always impressed by your creativity and leadership
                    in organizing events. Your passion for art shines through in
                    everything you do. Keep inspiring others with your
                    dedication and vision.
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-xs text-gray-400">Supa Woman !</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <img
                    src={newsImages.artSpace}
                    alt="Core Memory 9"
                    className="rounded-xl w-full h-64 object-cover mb-3"
                  />
                  <h2 className="text-2xl font-bold mb-2">Our first spark</h2>
                  <p className="text-gray-300 mb-2">
                    We always waiting each other for centra and i remember that
                    we were sitting together, doing little things to pass the
                    time. And my friends were noticed that we have thumbs kissed
                    and they took a photo of it.
                    <span className="text-gray-500">
                      Such a beautiful moment
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold">Last to say..</h3>
                <p className="text-gray-300 text-sm">
                  Thank you for being the best person . thank you for always
                  being there for me. Thank you for guiding me to better me..
                  Hope you find someone that can guide you as well just like kak
                  kirani said..{" "}
                  <span className="text-gray-500">
                    I hope you find happiness
                  </span>
                </p>
              </div>
            </div>
            {/* Right column */}
            <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6 sm:gap-8">
              <div className="bg-rose-700/80 rounded-xl p-4 sm:p-6 text-white">
                <div className="text-xs uppercase tracking-widest mb-2">
                  Anniversary Was 17 Days Ago !
                </div>
                <div className="text-3xl font-bold mb-1">365 Days</div>
                <div className="text-sm">
                  I was writing our anniv description .. but you suddenly
                  blocked me out.. Happiness turns out to tears raining..
                </div>
              </div>

              {/* Additional sidebar items */}
              <div>
                <img
                  src={newsImages.installation}
                  alt="Core Memory 3"
                  className="rounded-xl w-full h-32 object-cover mb-3"
                />
                <h3 className="text-lg font-semibold">
                  The Day That Our Friends Noticed Us Together
                </h3>
                <p className="text-gray-300 text-sm">
                  We were at the akatel canteen. During our meet , we were
                  taking photos and videos. And our friends noticed us together.
                  It was a special moment that marked the beginning of our
                  relationship.{" "}
                  <span className="text-gray-500">Suprisingly :0</span>
                </p>
              </div>

              <div className="bg-neutral-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  My Plannings that i couldn't tell you
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold">
                      Watch Kny movie together
                    </div>
                    <div className="text-xs text-gray-400">
                      it should be next week. But i know its impossible right?
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      This Anniv website
                    </div>
                    <div className="text-xs text-gray-400">
                      I made this website before august. It should be ready by a
                      week ago.. , but i need to change some things cause of
                      you're hating me..
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <img
                  src={newsImages.painting}
                  alt="Core Memory 7"
                  className="rounded-xl w-full h-32 object-cover mb-3"
                />
                <h3 className="text-lg font-semibold">
                  You were the best experience..
                </h3>
                <p className="text-gray-300 text-sm">
                  Although i haven&apos;t treated you well , you always made me
                  feel special. I&apos;m sorry for everything. I know you
                  deserve better. I went silence not meant to dump you. I just
                  wanted to validate that ur feelings are valid. Although i want
                  to express my feelings, I just couldn&apos;t find the right
                  words. So i made this website to express my feelings. I hope
                  you understand that i still care about you and i want to make
                  things right between us.{" "}
                  <span className="text-gray-500">:(</span>
                </p>
              </div>

              <div className="bg-rose-600/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Things i couldn't say
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>• I've always concerned about your feelings.</li>
                  <li>
                    • I regret not being there for you when you needed me. So
                    i'm distancing myself from you.
                  </li>
                  <li>
                    • I always feel guilty when you're ranting in ec sesat
                  </li>
                  <li>• I've prepared a surprise for you..</li>
                </ul>
              </div>
            </aside>
          </>
        )}

        {activeTab === "gallery" && (
          <div className="flex-1 p-8">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
              {galleryImages.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-xl overflow-hidden ${
                    index % 5 === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <div className="relative w-full h-full aspect-square">
                    <Image
                      src={src}
                      alt={`Memory ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      priority={index < 4}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 text-sm font-medium">
                      {src.split("/").pop()?.split(".")[0]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "note" && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-xl bg-white/80 p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-rose-600 mb-4">
                Leave a Note ✍️
              </h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 border rounded-lg text-gray-900"
                rows={5}
                placeholder="Write something from your heart..."
              />
              <button
                onClick={handleSendNote}
                disabled={isSending}
                className="mt-4 w-full px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send Note"}
              </button>
            </div>
            <Toaster position="bottom-center" />
          </div>
        )}
      </div>
    </main>
  );
}
