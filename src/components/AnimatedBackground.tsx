import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  fade: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { darkMode } = useTheme(); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let stars: Star[] = [];
    const numStars = 100;

    const starColor = darkMode ? "white" : "black";

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          opacity: Math.random(),
          fade: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = starColor; 

      for (let star of stars) {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.opacity += star.fade;
        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.fade *= -1;
        }
      }

      requestAnimationFrame(drawStars);
    };

    const init = () => {
      resizeCanvas();
      drawStars();
    };

    window.addEventListener("resize", resizeCanvas);
    init();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [darkMode]); 

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
};

export default AnimatedBackground;
