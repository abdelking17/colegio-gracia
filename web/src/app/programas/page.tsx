"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";

import { FaMusic, FaDrum, FaPaintBrush, FaFutbol, FaGlobe, FaFlask, FaLaptopCode, FaPrayingHands } from "react-icons/fa";
import { GiGuitar, GiDrum, GiPianoKeys } from "react-icons/gi";

interface Category {
  id: number;
  title: string;
  icon: JSX.Element;
}

export default function Programas() {
  const categories: Category[] = [
    { id: 1, title: "Piano", icon: <GiPianoKeys color="white" size={48} /> },
    { id: 2, title: "Guitarra", icon: <GiGuitar color="white" size={48} /> },
    { id: 3, title: "Percusión", icon: <GiDrum color="white" size={48} /> },
    { id: 4, title: "Canto", icon: <FaMusic color="white" size={48} /> },
    { id: 5, title: "Arte", icon: <FaPaintBrush color="white" size={48} /> },
    { id: 6, title: "Deportes", icon: <FaFutbol color="white" size={48} /> },
    { id: 7, title: "Idiomas", icon: <FaGlobe color="white" size={48} /> },
    { id: 8, title: "Ciencias", icon: <FaFlask color="white" size={48} /> },
    { id: 9, title: "Tecnología", icon: <FaLaptopCode color="white" size={48} /> },
    { id: 10, title: "Valores Cristianos", icon: <FaPrayingHands color="white" size={48} /> },
  ];

  return (
    <section
      className="py-16 px-6 md:px-12 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondoProgramas.jpeg')" }}
    >
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Programas Educativos
        </motion.h1>
        <p className="text-gray-700 md:text-lg bg-white/70 p-4 rounded-2xl inline-block">
          Explora todos los programas que ofrecemos en nuestro colegio cristiano: música, deportes,
          arte, idiomas, ciencias y formación de valores.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map(category => (
          <motion.div
            key={category.id}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-white cursor-pointer transform transition-transform hover:scale-105"
            whileHover={{ scale: 1.08 }}
          >
            {category.icon}
            <h3 className="text-xl font-bold text-center mt-2">{category.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Texto y botón añadidos */}
      {/* Texto y botón añadidos */}
<motion.div 
  className="max-w-7xl mx-auto mt-16 text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-6">
    ¿Quieres unirte a nuestro programa?
  </h2>
  <motion.a
    href="/contacto"  
    className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl text-lg hover:shadow-2xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    ¡Contáctanos!
  </motion.a>
</motion.div>
    </section>
  );
}