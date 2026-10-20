
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowRight,
  RotateCcw,
  Music2,
  VolumeX
} from "lucide-react";
import "./App.css";

const cerita = [
  {
    judul: "Hai, Kamu 🤍",
    isi: "Aku nggak tahu bagaimana cara semesta bekerja. Tapi dari begitu banyak orang yang bisa hadir dalam hidupku, ternyata kamu yang berhasil membuat hatiku merasa pulang."
  },
  {
    judul: "Sejak Ada Kamu",
    isi: "Hal-hal sederhana jadi terasa lebih indah. Pesan singkat darimu, tawamu, bahkan cerita random tentang harimu selalu berhasil membuat aku tersenyum."
  },
  {
    judul: "Aku Suka Kamu",
    isi: "Bukan cuma saat kamu bahagia atau terlihat sempurna. Aku juga ingin ada di sampingmu ketika duniamu sedang berantakan, ketika kamu lelah, dan ketika kamu butuh seseorang."
  },
  {
    judul: "Ada Satu Hal...",
    isi: "Aku mungkin bukan orang yang paling hebat dalam menunjukkan rasa sayang. Tapi percayalah, setiap kali aku membayangkan masa depan, selalu ada kamu di dalamnya."
  },
  {
    judul: "Kalau Boleh Meminta",
    isi: "Aku ingin kita tetap saling memilih. Bahkan di hari-hari yang sulit, saat semuanya nggak berjalan sesuai rencana, semoga kita selalu menemukan alasan untuk tetap bersama."
  },
  {
    judul: "Tentang Selamanya",
    isi: "Aku nggak tahu apa yang akan terjadi besok. Tapi ada satu hal yang selalu ingin aku perjuangkan: sebuah masa depan yang di dalamnya ada aku, kamu, dan banyak cerita indah yang kita buat bersama."
  },
  {
    judul: "Untuk Kamu, Selalu.",
    isi: "Kalau nanti rambut kita mulai memutih, langkah kita mulai melambat, dan dunia nggak lagi seramai sekarang, aku berharap tangan yang masih kugenggam adalah tanganmu."
  }
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loved, setLoved] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  // Musik background
  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setMusicPlaying(true);
    } catch (error) {
      console.log("Autoplay menunggu interaksi pengguna:", error);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  // Mencoba memutar musik saat web dibuka
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    playMusic();
  }, []);

  const startStory = () => {
    playMusic();
    setStarted(true);
  };

  const next = () => {
    if (page < cerita.length - 1) {
      setPage((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setStarted(false);
    setPage(0);
    setFinished(false);
    setLoved(false);
  };

  return (
    <div className="love-app">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/romantis.mp3`}
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />

      {/* Tombol Musik */}
      <motion.button
        className="music-toggle"
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        aria-label={
          musicPlaying ? "Matikan musik" : "Putar musik"
        }
        title={
          musicPlaying ? "Pause musik" : "Putar musik"
        }
      >
        {musicPlaying ? (
          <Music2 size={22} />
        ) : (
          <VolumeX size={22} />
        )}
      </motion.button>

      {/* Background Glow */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Bintang */}
      <div className="star-field">
        {Array.from({ length: 55 }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${(i * 43.7) % 100}%`,
              top: `${(i * 29.3) % 100}%`,
              animationDelay: `${(i * 0.37) % 5}s`,
              animationDuration: `${2 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      {/* Hati Beterbangan */}
      <div className="floating-hearts">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 19.3) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${7 + (i % 5)}s`
            }}
          >
            {i % 3 === 0 ? "✦" : "♡"}
          </span>
        ))}
      </div>

      <motion.div
        className="love-card"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="logo">
          <span>✦</span> ALIA PRAMESTI <span>✦</span>
        </div>

        <AnimatePresence mode="wait">
          {!started ? (
            // HALAMAN PEMBUKA
            <motion.div
              key="intro"
              className="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow">
                A LITTLE PIECE OF MY HEART
              </p>

              <div className="moon-scene">
                <motion.div
                  className="moon-glow"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.9, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                />

                <motion.div
                  className="moon"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="moon-cut" />
                </motion.div>

                <span className="moon-spark sp1">✧</span>
                <span className="moon-spark sp2">✦</span>
                <span className="moon-spark sp3">✧</span>

                <motion.div
                  className="center-heart"
                  animate={{
                    scale: [1, 1.18, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  ♥
                </motion.div>
              </div>

              <h1>
                Di Antara Jutaan Bintang,
                <em> Aku Memilih Kamu.</em>
              </h1>

              <p className="description">
                Ada sedikit cerita yang selama ini
                ingin aku sampaikan kepadamu.
                Tentang rasa yang tumbuh diam-diam,
                lalu berubah menjadi harapan yang indah.
              </p>

              <button
                className="primary-button"
                onClick={startStory}
              >
                Baca Ceritaku
                <ArrowRight size={17} />
              </button>
            </motion.div>
          ) : !finished ? (
            // HALAMAN CERITA
            <motion.div
              key={`story-${page}`}
              className="content story-content"
              initial={{
                opacity: 0,
                y: 35,
                filter: "blur(8px)"
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -25,
                filter: "blur(8px)"
              }}
              transition={{ duration: 0.65 }}
            >
              <motion.div
                className="story-heart"
                animate={{
                  scale: [1, 1.13, 1],
                  rotate: [-5, 5, -5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                <Heart
                  size={60}
                  fill="#f5a6c4"
                  strokeWidth={1}
                />
              </motion.div>

              <p className="eyebrow">
                OUR LITTLE STORY ·{" "}
                {String(page + 1).padStart(2, "0")}
              </p>

              <h2>{cerita[page].judul}</h2>

              <p className="story-text">
                {cerita[page].isi}
              </p>

              <div className="progress">
                {cerita.map((_, i) => (
                  <span
                    key={i}
                    className={i <= page ? "active" : ""}
                  />
                ))}
              </div>

              <button
                className="primary-button"
                onClick={next}
              >
                {page === cerita.length - 1
                  ? "Satu Hal Terakhir ♡"
                  : "Lanjut Ceritanya"}
                <ArrowRight size={17} />
              </button>
            </motion.div>
          ) : (
            // HALAMAN PENUTUP
            <motion.div
              key="ending"
              className="content ending"
              initial={{
                opacity: 0,
                scale: 0.75
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{ duration: 0.9 }}
            >
              <motion.div
                className="big-heart"
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 15px #f5a6c4)",
                    "drop-shadow(0 0 45px #ff7caf)",
                    "drop-shadow(0 0 15px #f5a6c4)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                ♥
              </motion.div>

              <p className="eyebrow">
                MY FAVORITE PERSON
              </p>

              <h1>
                Aku Ingin Kita,
                <em> Untuk Waktu yang Lama.</em>
              </h1>

              <p className="description">
                Bukan hanya untuk hari ini.
                Bukan hanya selama semuanya terasa mudah.
                Tapi untuk setiap pagi yang akan datang,
                setiap mimpi yang ingin kita wujudkan,
                dan setiap cerita yang belum sempat kita tulis.
              </p>

              <p className="ending-quote">
                "Kalau hidup adalah perjalanan panjang,
                aku ingin kamu menjadi seseorang
                yang berjalan bersamaku sampai akhir."
              </p>

              <AnimatePresence mode="wait">
                {!loved ? (
                  <motion.button
                    key="love"
                    className="primary-button"
                    onClick={() => setLoved(true)}
                    exit={{ opacity: 0 }}
                  >
                    Simpan Rasa Ini
                    <Heart size={17} />
                  </motion.button>
                ) : (
                  <motion.p
                    key="accepted"
                    className="love-response"
                    initial={{
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                  >
                    ♡ Kamu adalah bagian terindah
                    dari harapanku. ♡
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                className="reset-button"
                onClick={reset}
              >
                <RotateCcw size={15} />
                Ulangi Cerita
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer>
          WITH ALL MY HEART · ALIA PRAMESTI ♡
        </footer>
      </motion.div>
    </div>
  );
}
