"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SpiralIconsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  // ✅ Ajuste: calcular ancho SOLO en cliente
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth(); // setear inmediatamente al montar
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Si no hay ancho aún (SSR), usar un valor estable (ej: 1024)
  const width = screenWidth ?? 1024;

  // Scroll desde que la sección entra hasta que sale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Radio base relativo según pantalla
  const baseRadius = width > 1024 ? 180 : width > 768 ? 140 : 100;
  const extraSplashRadius = width > 1024 ? 80 : width > 768 ? 60 : 40;

  const icons = [
    { src: "/crayons.png", angle: 0, extraRadius: extraSplashRadius },
    { src: "/drawing-compass.png", angle: 72 },
    { src: "/education.png", angle: 185, extraRadius: extraSplashRadius },
    { src: "/pencil.png", angle: 144, extraRadius: extraSplashRadius },
    { src: "/splash.png", angle: 226, extraRadius: extraSplashRadius },
    { src: "/stack-of-books.png", angle: 288, extraRadius: extraSplashRadius },
  ];

  // Tamaño de íconos responsive
  const iconSize = width > 1024 ? 125 : width > 768 ? 90 : 70;

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center bg-white overflow-visible"
      style={{ position: "relative" }}
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url('/manosContacto.png')",
          backgroundSize: width < 768 ? "150%" : "135%",
        }}
      />

      {/* Contenido */}
      <div className="relative flex flex-col items-center justify-center z-10 w-full">
        {/* Botón */}
        <motion.a
          href="/admisiones"
          className="inline-block px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #0069eb 0%, #4f46e5 100%)",
            zIndex: 20,
            borderTopRightRadius: "50%",
            borderBottomLeftRadius: "50%",
            borderTopLeftRadius: "0%",
            borderBottomRightRadius: "0%",
          }}
        >
          Admisión en Línea
        </motion.a>

        {/* Íconos */}
        {icons.map((icon, i) => {
          // Radio total
          let radius = baseRadius;
          if (icon.extraRadius) radius += icon.extraRadius;

          // Ajustes adicionales según ícono
          if (icon.src === "/splash.png") radius += width > 1024 ? 110 : width > 768 ? 80 : 60;
          if (icon.src === "/stack-of-books.png") radius += width > 1024 ? 60 : width > 768 ? 40 : 30;
          if (icon.src === "/education.png") radius += width > 1024 ? 180 : width > 768 ? 120 : 80;

          // En móviles, mantener mínimo separación para que no tape el botón
          if (width < 768) radius = Math.max(radius, 120);

          const angle = useTransform(scrollYProgress, [0, 0.5, 1], [0, icon.angle, icon.angle + 90]);
          const spiralRadius = useTransform(scrollYProgress, [0, 0.5, 1], [0, radius, 0]);

          const x = useTransform([angle, spiralRadius], ([a, r]: number[]) =>
            r * Math.cos((a * Math.PI) / 180)
          );
          const y = useTransform([angle, spiralRadius], ([a, r]: number[]) =>
            r * Math.sin((a * Math.PI) / 180)
          );

          const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
          const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{
                translateX: x,
                translateY: y,
                scale,
                opacity,
                rotate: icon.src === "/crayons.png" ? 60 : 0,
                filter: "drop-shadow(10px 25px 25px rgba(0,0,0,0.35))",
                zIndex: 10, // íconos debajo del botón en móviles
              }}
            >
              <img
                src={icon.src}
                alt={`icon-${i}`}
                style={{
                  width: iconSize,
                  height: iconSize,
                  objectFit: "contain",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
