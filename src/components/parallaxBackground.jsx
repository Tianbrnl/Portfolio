import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { h1 } from "motion/react-client";
import { div } from "motion/react-m";
import { useRef, useEffect } from "react"
const ParallaxBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust number of stars based on screen width
    const getStarCount = () => {
      if (canvas.width < 368) return 100; // mobile
      if (canvas.width < 1024) return 150; // tablet
      return 200; // desktop
    };

    let stars = Array.from({ length: getStarCount() }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
    }));

    // Make speed proportional to screen width
    const getSpeed = () => canvas.width / 2000;

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const speed = getSpeed();

      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const sx = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
        const sy = (star.y - canvas.height / 2) * (canvas.width / star.z) + canvas.height / 2;
        const radius = canvas.width / star.z;

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recreate stars array with new count
      stars = Array.from({ length: getStarCount() }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default ParallaxBackground;
