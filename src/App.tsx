import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Proposal: React.FC = () => {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [audioVolume, setAudioVolume] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleYesClick = () => {
    setShowFinalMessage(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
      let volume = 0;
      const fadeIn = setInterval(() => {
        if (volume < 1) {
          volume += 0.05;
          if (audioRef.current) audioRef.current.volume = volume;
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }
  };

  const handleNoHover = () => {
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  useEffect(() => {
    if (showFinalMessage && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
    }
  }, [showFinalMessage]);

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!showFinalMessage && (
        <h1 style={{ color: "black" }}>Will you be my Valentine?</h1>
      )}
      {showFinalMessage ? (
        <div>
          <h2 style={{ color: "black" }}>Yay! See you Muah! 😘</h2>
          <motion.div
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                  y: [Math.random() * 400 - 200, -200],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: "24px",
                }}
              >
                💋
              </motion.span>
            ))}
          </motion.div>
          <img
            src="https://media.giphy.com/media/vtm4qejJIl1ERPIrbA/giphy.gif?cid=790b761161qbveksnfz3j3d8jybu4g8lo3najnw5i6i7tatv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Kinikilig"
            style={{ width: "300px", height: "300px" }}
          />
          <audio ref={audioRef} style={{ display: "none" }} autoPlay>
            <source
              src="https://www.dropbox.com/scl/fi/p0b33ukgy9x8fg0ken1lv/James-Reid-and-Nadine-Lustre-Hanap-Hanap-Lyric-Video-with-Chords.mp3?rlkey=civw7lj94doubszp9svky8zxy&raw=1"
              type="audio/mpeg"
            />
          </audio>
        </div>
      ) : (
        <div>
          <button
            style={{
              margin: "10px",
              padding: "10px",
              fontSize: "18px",
              backgroundColor: "#ff6b81",
              color: "white",
              border: "none",
              borderRadius: "10px",
            }}
            onClick={handleYesClick}
          >
            Yes
          </button>
          <motion.button
            style={{
              margin: "10px",
              padding: "10px",
              fontSize: "18px",
              position: "relative",
              backgroundColor: "#ff6b81",
              color: "white",
              border: "none",
              borderRadius: "10px",
            }}
            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
            transition={{ type: "spring", stiffness: 100 }}
            onMouseEnter={handleNoHover}
          >
            No
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Proposal;
