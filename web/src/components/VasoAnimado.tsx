"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VasoAnimado() {
  const frames = ["vaso2.png", "vaso3.png", "vaso4.png", "vaso5.png"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Duración de la animación del vaso entrando (1s)
    const animationDuration = 1000;

    // Repartimos ese tiempo entre el total de frames
    const frameInterval = animationDuration / frames.length;

    let frameCount = 0;
    interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
      frameCount++;
      // paramos cuando se hayan mostrado todos los frames una vez
      if (frameCount >= frames.length) {
        clearInterval(interval);
      }
    }, frameInterval);

    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <section className="py-20 flex justify-center items-center bg-gray-50">
      <motion.div
        initial={{ x: -200, opacity: 0, rotate: -15 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }} // 1s → mismo que arriba
        viewport={{ once: true, amount: 0.4 }}
        className="w-[50vw] h-[70vh] flex justify-center items-center"

      >
        <img
          src={`/${frames[index]}`}
          alt="Vaso girando"
          className="w-full h-full object-contain bg-white rounded-2xl "
        />
      </motion.div>
    </section>
  );
}
