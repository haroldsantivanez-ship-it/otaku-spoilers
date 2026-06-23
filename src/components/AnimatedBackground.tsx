import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));
}

function AnimatedBackground() {
  const [particles] = useState(() => generateParticles(40));

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grilla en perspectiva */}
      <div className="absolute inset-0 [perspective:1000px]">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "rotateX(60deg) translateY(-50%)",
            transformOrigin: "center top",
          }}
        />
      </div>

      {/* Aurora principal - sigue el mouse sutilmente */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full blur-[120px]"
        animate={{
          x: `${mousePos.x * 0.3}%`,
          y: `${mousePos.y * 0.3}%`,
        }}
        transition={{ type: "tween", duration: 2, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(200,200,255,0.04) 40%, transparent 70%)",
          left: "-10%",
          top: "-10%",
        }}
      />

      {/* Orbe de acento 1 */}
      <motion.div
        className="absolute h-80 w-80 rounded-full blur-[100px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.12, 0.2, 0.08, 0.12],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          right: "15%",
          top: "20%",
        }}
      />

      {/* Orbe de acento 2 */}
      <motion.div
        className="absolute h-96 w-96 rounded-full blur-[120px]"
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.8, 1.2, 1],
          opacity: [0.08, 0.15, 0.06, 0.08],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          background:
            "radial-gradient(circle, hsl(280, 80%, 60%) 0%, transparent 70%)",
          left: "10%",
          bottom: "10%",
        }}
      />

      {/* Orbe cyan */}
      <motion.div
        className="absolute h-72 w-72 rounded-full blur-[100px]"
        animate={{
          x: [0, 60, -90, 0],
          y: [0, -50, 80, 0],
          opacity: [0.06, 0.12, 0.04, 0.06],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
        style={{
          background:
            "radial-gradient(circle, hsl(200, 80%, 50%) 0%, transparent 70%)",
          right: "30%",
          bottom: "30%",
        }}
      />

      {/* Partículas flotantes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0, 0.6, 0.3, 0.5, 0],
            scale: [0, 1, 0.8, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Líneas de luz diagonales (efecto cinematográfico) */}
      <motion.div
        className="absolute -left-20 top-0 h-full w-px rotate-[20deg] bg-gradient-to-b from-transparent via-white/10 to-transparent"
        animate={{ x: [0, 1200], opacity: [0, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute -left-20 top-0 h-full w-px rotate-[25deg] bg-gradient-to-b from-transparent via-white/5 to-transparent"
        animate={{ x: [0, 1400], opacity: [0, 1, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 6 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
