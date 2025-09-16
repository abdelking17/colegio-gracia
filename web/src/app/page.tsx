"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import React from 'react';
import "swiper/css/pagination";
import { motion, useScroll, useTransform } from "framer-motion";
import SpiralIconsSection from "@/components/SpiralIconsSection";




export default function Home() {
  return (
    <main>
      {/* 1. Slider */}
      <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full h-full"
        >
          {["slider.jpg", "slider1.jpg", "slider2.jpg"].map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={`/${src}`}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className="relative pt-6 pb-0 text-center bg-gradient-to-b from-white to-slate-50">
  {/* Imagen encima del título */}
  <motion.img
    src="/birrete.gif"
    alt="Animación Filosofía"
    className="mx-auto w-35 h-auto"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  />

  {/* Título animado con degradado */}
<motion.h2 
  className="text-3xl md:text-4xl font-bold drop-shadow-lg relative z-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
>
  <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
    Nuestra Filosofía
  </span>
</motion.h2>

{/* Párrafo animado */}
<motion.p 
  className="mt-2 max-w-3xl mx-auto text-lg text-slate-800 leading-relaxed drop-shadow-lg relative z-20 px-4"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
>
  Educar con excelencia académica y valores firmes, formando líderes con sabiduría,
  creatividad y fe, preparados para transformar el futuro.
</motion.p>

  <div className="relative">
    {/* Imagen de manos pintadas - Detrás del texto en móvil */}
    <motion.img
      src="/manospintadas.png"
      alt="Manos pintadas"
      className="w-full h-auto -mt-10 md:-mt-12 lg:-mt-16 
               md:relative 
               z-0 md:z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
    />

    {/* 🔹 Ola decorativa inferior */}
    <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-30">
      <svg
        className="block w-full h-32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="#0169ea"
          d="M0,32 C360,112 1080,0 1440,64 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  </div>
</section>


{/* 3. Sobre Nosotros */}
<section className="relative py-20 bg-white text-white">
  {/* 🔹 Fondo azul que cubre solo la mitad superior */}
  <div className="absolute top-0 left-0 w-full h-1/2 bg-[#0169ea] z-0"></div>
  
  {/* 🔹 Ola decorativa superior con óvalos */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
    <svg
      className="relative block w-full h-28"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <path
        d="M0,0 
           C150,100 350,-50 600,80 
           C850,200 1050,20 1200,60 
           L1200,0 L0,0 Z"
        fill="#0169ea"
      />
    </svg>
  </div>

  <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 -translate-y-10 md:-translate-y-16">
    {/* Título animado */}
    <motion.h2
      className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Nuestras Etapas
    </motion.h2>

    {/* Párrafo animado */}
    <motion.p
      className="mt-2 max-w-3xl text-base md:text-lg text-white leading-relaxed drop-shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
    >
      Acompañamos a cada estudiante en su desarrollo académico.
    </motion.p>
  </div>

  {/* 🔹 Contenido */}
  <div className="relative z-30  text-center grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
    {[
      { 
        title: "Inicial", 
        text: "Un espacio lleno de juego, creatividad y valores donde los niños descubren el amor por aprender desde sus primeros pasos.", 
        img: "/cuvos.png" 
      },
      { 
        title: "Primaria", 
        text: "Formamos estudiantes con bases sólidas en lectura, escritura, matemáticas y ciencias, desarrollando su pensamiento crítico y valores humanos.", 
        img: "/primaria.png" 
      },
      { 
        title: "Secundaria", 
        text: "Preparamos jóvenes líderes con excelencia académica, compromiso social y visión de futuro para enfrentar los retos de la vida universitaria y profesional.", 
        img: "/secundaria.png" 
      },
    ].map((stage, index) => (
      <motion.div
        key={stage.title}
        className="bg-white text-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer relative"
        
        /** 🔹 Animación al aparecer en scroll */
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
        
        /** 🔹 Efecto hover */
        whileHover={{
          y: -10,
          scale: 1.05,
          boxShadow: "0px 20px 40px rgba(0,105,235,0.4)",
        }}
      >
        {/* Imagen animada */}
        {stage.img && (
          <motion.img
            src={stage.img}
            alt={stage.title}
            className="mx-auto mb-4 w-55 h-35 object-contain drop-shadow-xl"
            
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 + 0.1 }}
            
            whileHover={{
              scale: 1.1,
              rotate: 2,
              filter: "drop-shadow(0px 10px 20px #fedb1a)",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
          />
        )}

        <h4 className="font-semibold text-xl text-brand-700">{stage.title}</h4>
        <p className="mt-2 text-slate-600">{stage.text}</p>
      </motion.div>
    ))}
  </div>
</section>

<section className="py-10 text-center bg-brand-50 px-6 md:px-12 relative overflow-hidden min-h-[700px]">

{/* Mano derecha con animación - Versión responsiva completa */}
<motion.div 
  className="absolute 
             md:-right-17 lg:-right-19 
             -right-10 
             top-[92%] md:top-[71%] 
             transform -translate-y-1/2 rotate-[-67deg] z-0 opacity-100"
  initial={{ opacity: 0, x: 100 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ 
    duration: 0.8, 
    delay: 5,
    ease: "easeOut" 
  }}
>
  <img 
    src="/una_mano.png" 
    alt="Mano derecha" 
    className="lg:w-150 lg:h-150 md:w-100 md:h-100 w-50 h-50 object-contain" 
  />
</motion.div>

{/* Mano izquierda con animación - Versión responsiva completa */}
<motion.div 
  className="absolute 
             md:-left-17 lg:-left-19 
             -left-10 
             top-[92%] md:top-[71%] 
             transform -translate-y-1/2 rotate-[67deg] scale-x-[-1] z-0 opacity-100"
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ 
    duration: 0.8, 
    delay: 5,
    ease: "easeOut" 
  }}
>
  <img 
    src="/una_mano.png" 
    alt="Mano izquierda" 
    className="lg:w-150 lg:h-150 md:w-100 md:h-100 w-50 h-50 object-contain" 
  />
</motion.div>
<h2 className="text-3xl font-bold relative z-10">
  <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
    Proceso de Admisión Fácil
  </span>
</h2>
<p className="mt-4 text-slate-600 relative z-10">
  Completa el formulario online y únete a nuestra comunidad educativa.
</p>

  {/* Timeline - ESTRUCTURA SIMPLIFICADA Y FUNCIONAL */}
  <div className="mt-10 w-full relative z-10">
  <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
    {[
      { label: "Cita", icon: "/cita.gif" },
      { label: "Evaluación", icon: "/evaluacion.gif" },
      { label: "Inscripción", icon: "/inscripcion.gif" },
      { label: "Inicio de Clases", icon: "/inicioClase.gif" },
    ].map((step, index, arr) => {
      const radius = 42; // Aumentado de 36 a 42 para círculos más grandes
      const circumference = 2 * Math.PI * radius;
      
      const circleDelay = index * 1.5;
      const barDelay = circleDelay + 0.8;

      return (
        <React.Fragment key={index}>
          {/* Contenedor del círculo y texto */}
          <div className="flex flex-col items-center justify-center relative z-10">
            <motion.div 
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ 
                duration: 0.8, 
                delay: circleDelay,
                ease: "easeOut" 
              }}
            >
              {/* Círculo aumentado de tamaño */}
              <div className="w-24 h-24 flex items-center justify-center"> {/* Aumentado de w-20 h-20 a w-24 h-24 */}
                <svg className="w-24 h-24" viewBox="0 0 90 90"> {/* Aumentado de 80x80 a 90x90 */}
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    fill="transparent"
                    stroke="#cbd5e1"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="45"
                    cy="45"
                    r={radius}
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ 
                      duration: 1, 
                      delay: circleDelay + 0.3,
                      ease: "easeOut" 
                    }}
                  />
                </svg>
                
                {/* Icono GIF en lugar del número */}
                <motion.img
                  src={step.icon}
                  alt={step.label}
                  className="absolute w-15 h-15 object-contain" /* Tamaño adecuado para el icono */
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: circleDelay + 0.5, /* Aparece después que el círculo */
                    ease: "easeOut" 
                  }}
                />
              </div>
              
              {/* Texto debajo del círculo */}
              <motion.p
                className="mt-2 text-slate-700 font-bold text-md text-center min-h-[40px] flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ 
                  duration: 0.5, 
                  delay: circleDelay + 0.8,
                  ease: "easeOut" 
                }}
              >
                {step.label}
              </motion.p>
            </motion.div>
          </div>

            {/* Barra de conexión - excepto para el último elemento */}
            {index < arr.length - 1 && (
              <div className="flex-1 hidden md:flex items-center mx-2">
                <motion.div 
                  className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative"
                  style={{ top: '-17px' }}
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: "100%" }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.6,
                    delay: barDelay,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.8,
                      delay: barDelay + 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            )}

            {/* Barra vertical para móvil */}
            {index < arr.length - 1 && (
              <div className="md:hidden w-2 h-16 bg-slate-200 rounded-full overflow-hidden relative mx-auto my-4">
                <motion.div
                  className="w-full bg-blue-500 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.8,
                    delay: barDelay + 0.3,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
  
  
 {/* Contenedor del botón con margen superior aumentado */}
 <div className="mt-24 relative z-10">
  <motion.a
    href="/admisiones"
    className="inline-block px-10 py-5 text-white font-bold text-xl
              shadow-lg hover:shadow-xl 
              transition-all duration-300 
              transform hover:scale-105
              relative overflow-hidden
              group
              rounded-tr-4xl rounded-bl-4xl"
    style={{
      background: 'linear-gradient(135deg, #0069eb 0%, #4f46e5 100%)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ 
      duration: 0.8, 
      delay: 6,
      ease: "easeOut" 
    }}
    whileHover={{
      y: -3,
      scale: 1.05,
      background: 'linear-gradient(135deg, #0056c1 0%, #4338ca 100%)',
      boxShadow: "0 20px 25px -5px rgba(0, 105, 235, 0.4), 0 10px 10px -5px rgba(0, 105, 235, 0.3)",
      transition: { duration: 0.2, ease: "easeOut" }
    }}
    whileTap={{
      y: 0,
      scale: 0.98,
      background: 'linear-gradient(135deg, #004a9e 0%, #3730a3 100%)',
      transition: { duration: 0.1 }
    }}
  >
    {/* Efecto de brillo al hacer hover */}
    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
    
    Iniciar Proceso
  </motion.a>
</div>
</section>


<section className="relative overflow-hidden min-h-[750px] flex items-center justify-center bg-[#0169ea] py-12">
  {/* Imagen de fondo que cubre toda la sección */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/lapiz&tijera.jpg" 
      alt="Fondo decorativo" 
      className="w-full h-full object-cover"
    />
  </div>

  {/* Contenido principal centrado */}
  <div className="relative z-10 text-center px-6 md:px-12 w-full">
    <motion.h2 
      className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16" 
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    >
      <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent drop-shadow-lg">
        Nuestro Equipo
      </span>
    </motion.h2>
    
    {/* Grid de miembros del equipo */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-9 lg:gap-16 items-start justify-center max-w-6xl mx-auto">
      {/* Pastor - Director General */}
      <motion.div 
        className="flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <motion.div 
          className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full shadow-2xl overflow-hidden border-4 bg-gradient-to-r from-blue-600 to-indigo-700 relative"
          whileHover={{
            scale: 1.1,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 10 
            }
          }}
        >
         
          {/* Borde con gradiente */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-600 to-indigo-700 -m-1"></div>
          <motion.img 
            src="/pastor.jpg" 
            alt="Lic. Willy Bayonet" 
            className="w-full h-full object-cover relative z-10"
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.4 }
            }}
          />
        </motion.div>
        
        {/* Card con texto - Fondo con gradiente y texto blanco */}
        <motion.div 
          className="mt-6 shadow-2xl p-6 rounded-tr-4xl rounded-bl-4xl rounded-tl-md rounded-br-md"
          style={{ 
            background: 'linear-gradient(135deg, #0069eb 0%, #4f46e5 100%)' 
          }}
          initial={{ opacity: 0, y: 20, x: -30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            x: 0,
            transition: { 
              duration: 0.6, 
              delay: 0.2,
              ease: "easeOut"
            }
          }}
          whileHover={{ 
            y: -5,
            scale: 1.05,
            x: [0, -5, 5, -3, 3, 0],
            transition: { 
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
        >
          <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
            LIC. WILLY BAYONET
          </h3>
          <p className="text-white/90 text-sm md:text-base mt-2">
            DIRECTOR GENERAL
          </p>
        </motion.div>
      </motion.div>

      {/* Brigida - Coordinadora Académica */}
      <motion.div 
        className="flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <motion.div 
          className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full shadow-2xl overflow-hidden border-4 bg-white relative"
          whileHover={{
            scale: 1.1,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 10 
            }
          }}
        >
          {/* Borde con gradiente */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-600 to-indigo-700 -m-1"></div>
          <motion.img 
            src="/brigida.jpg" 
            alt="Lic. Brígida García" 
            className="w-full h-full object-cover relative z-10"
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.4 }
            }}
          />
        </motion.div>
        
        {/* Card con texto - Fondo con gradiente y texto blanco */}
        <motion.div 
          className="mt-6 shadow-2xl p-6 rounded-tr-4xl rounded-bl-4xl rounded-tl-md rounded-br-md"
          style={{ 
            background: 'linear-gradient(135deg, #0069eb 0%, #4f46e5 100%)' 
          }}
          initial={{ opacity: 0, y: 20, x: -30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            x: 0,
            transition: { 
              duration: 0.6, 
              delay: 0.4,
              ease: "easeOut"
            }
          }}
          whileHover={{ 
            y: -5,
            scale: 1.05,
            x: [0, -5, 5, -3, 3, 0],
            transition: { 
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
        >
          <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
            LIC. BRÍGIDA GARCÍA
          </h3>
          <p className="text-white/90 text-sm md:text-base mt-2">
            COORDINADORA ACADÉMICA
          </p>
        </motion.div>
      </motion.div>

      {/* Mati - Secretaria Docente */}
      <motion.div 
        className="flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <motion.div 
          className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full shadow-2xl overflow-hidden border-4 bg-white relative"
          whileHover={{
            scale: 1.1,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 10 
            }
          }}
        >
          {/* Borde con gradiente */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-600 to-indigo-700 -m-1"></div>
          <motion.img 
            src="/mati.jpg" 
            alt="Martina Martínez" 
            className="w-full h-full object-cover relative z-10"
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.4 }
            }}
          />
        </motion.div>
        
        {/* Card con texto - Fondo con gradiente y texto blanco */}
        <motion.div 
          className="mt-6 shadow-2xl p-6 rounded-tr-4xl rounded-bl-4xl rounded-tl-md rounded-br-md"
          style={{ 
            background: 'linear-gradient(135deg, #0069eb 0%, #4f46e5 100%)' 
          }}
          initial={{ opacity: 0, y: 20, x: -30 }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            x: 0,
            transition: { 
              duration: 0.6, 
              delay: 0.6,
              ease: "easeOut"
            }
          }}
          whileHover={{ 
            y: -5,
            scale: 1.05,
            x: [0, -5, 5, -3, 3, 0],
            transition: { 
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
        >
          <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
            MARTINA MARTÍNEZ
          </h3>
          <p className="text-white/90 text-sm md:text-base mt-2">
            SECRETARIA DOCENTE
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>

{/* 7. Galería Multimedia con Carrusel Automático y Fondo */}
<section className="py-10 text-center px-6 md:px-12 relative overflow-hidden">
  {/* Imagen de fondo - 100% nítida */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/manoBackGroundCs.png" 
      alt="Fondo decorativo manos" 
      className="w-full h-full object-cover"
    />
  </div>

  {/* Contenido principal */}
  <div className="relative z-10">
    <motion.h2 
      className="text-4xl font-bold mb-16"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text  text-transparent  shadow-2xl ">
        Galería Escolar
      </span>
    </motion.h2>
    
    {/* Contenedor del carrusel */}
    <div className="relative overflow-hidden">
      <motion.div 
        className="flex gap-6"
        animate={{
          x: [0, -((16 * 280) + (16 * 24))],
        }}
        transition={{
          x: {
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }
        }}
      >
        {/* Duplicamos las imágenes para efecto de loop continuo */}
        {[...Array(2)].map((_, loopIndex) => (
          <React.Fragment key={loopIndex}>
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={`${loopIndex}-${i}`}
                className="flex-shrink-0 w-64 h-64 bg-white rounded-tr-4xl rounded-bl-4xl rounded-tl-md rounded-br-md shadow-2xl overflow-hidden group cursor-pointer border-2 border-gray-100"
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={`/galeria${i + 1}.jpg`}
                    alt={`Galería Escolar ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay sutil sin lupa */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  </div>
</section>


<section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
  {/* Elementos decorativos de fondo estilo colegio */}
  <div className="absolute inset-0 z-0">
    {/* Birrete decorativo superior izquierdo */}
    <div className="absolute top-6 left-6 md:top-10 md:left-10">
      <img 
        src="/birreteColor.png" 
        alt="Birrete decorativo" 
        className="w-14 h-14 md:w-24 md:h-24 object-contain"
      />
    </div>
    
    {/* Birrete decorativo inferior derecho */}
    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
      <img 
        src="/birreteColor.png" 
        alt="Birrete decorativo" 
        className="w-12 h-12 md:w-20 md:h-20 object-contain"
      />
    </div>
  </div>

  {/* Contenido principal */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-16"
    >
      <motion.h2 
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          NUESTRA MISIÓN
        </span>
      </motion.h2>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
      {/* Primer párrafo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border-l-4 border-blue-500 hover:shadow-3xl transition-all duration-300"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">Formación de Líderes</h3>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Levantar una generación de líderes íntegros, formados bajo los principios de la verdad de Dios, 
          que posean todas las condiciones personales, académicas, éticas y espirituales en Cristo que 
          les permitan afrontar eficazmente todas las demandas y desafíos de estos tiempos.
        </p>
      </motion.div>

      {/* Segundo párrafo */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border-l-4 border-indigo-500 hover:shadow-3xl transition-all duration-300"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">Equipamiento Integral</h3>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Equipar a los estudiantes con los instrumentos de la multiforme sabiduría de Dios, la ciencia 
          y la tecnología a través de un trabajo integrado que involucra a los Padres y el Centro 
          Educativo a fin de entregarle a nuestra sociedad un Estudiante competente.
        </p>
      </motion.div>
    </div>

    {/* Elemento decorativo inferior - Birrete central */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      className="text-center mt-16"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
        <img 
          src="/birreteColor.png" 
          alt="Birrete decorativo" 
          className="w-8 h-8 object-contain"
        />
      </div>
    </motion.div>
  </div>
</section>


 <SpiralIconsSection />
{/* 9. Contacto Rápido con Dirección */}
<section className="py-16 px-4 sm:px-6 md:px-12 text-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
  {/* Elementos decorativos de fondo */}
  <div className="absolute inset-0 z-0">
    <div className="absolute top-6 left-6 md:top-10 md:left-10">
      <img src="/birreteColor.png" alt="Birrete decorativo" className="w-10 h-10 md:w-16 md:h-16 object-contain opacity-80" />
    </div>
    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
      <img src="/birreteColor.png" alt="Birrete decorativo" className="w-9 h-9 md:w-14 md:h-14 object-contain opacity-80" />
    </div>
  </div>

  {/* Contenido principal */}
  <div className="relative z-10 max-w-6xl mx-auto">
    <motion.h2 
      className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 break-words"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        Contáctanos
      </span>
    </motion.h2>

    <motion.div
      className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Card Teléfono */}
      <motion.div
        className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-l-4 border-blue-500 flex-1 max-w-full min-h-[260px] break-words"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <p className="text-lg sm:text-base md:text-lg font-semibold text-gray-800 break-words">(809) 596-1791</p>
        <p className="text-sm text-gray-600 break-words">Lunes a Viernes</p>
        <p className="text-sm text-gray-600 break-words">8:00 AM - 4:00 PM</p>
      </motion.div>

      {/* Card Email */}
      <motion.div
        className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-l-4 border-blue-500 flex-1 max-w-full min-h-[260px] break-words"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-lg sm:text-base md:text-lg font-semibold text-gray-800 break-words">contacto@cegracia.edu</p>
        <p className="text-sm text-gray-600 break-words">Respuesta en 24h</p>
      </motion.div>

      {/* Card Redes Sociales */}
      <motion.div
        className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-l-4 border-blue-500 flex-1 max-w-full min-h-[260px] break-words"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <p className="text-lg sm:text-base md:text-lg font-semibold text-gray-800 break-words">Síguenos</p>
        <div className="flex space-x-3 mt-2">
          <motion.a href="https://www.facebook.com/centroeducativodelagracia/?locale=es_LA" whileHover={{ scale: 1.2 }} className="text-blue-600 hover:text-blue-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </motion.a>
          <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-pink-600 hover:text-pink-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3.7 14.077c-1.75.362-5.453.362-7.203 0-1.896-.391-2.117-1.538-2.246-2.077-.02-.086-.029-.176-.029-.265v-2.97c0-.182.108-.35.27-.431l2.5-1.423c.094-.054.204-.054.298 0l2.5 1.423c.161.081.27.25.27.431v2.97c0 .089-.009.179-.029.265-.056.242-.17.642-.734.831.193.221.432.416.705.572.968.585 2.139.585 3.107 0 .968-.585 1.74-1.643 1.74-2.828 0-1.186-.772-2.243-1.74-2.828-.968-.585-2.139-.585-3.107 0a3.134 3.134 0 00-.705.572c.564-.189.678-.589.734-.831.129-.539.35-1.686 2.246-2.077 1.75-.362 5.453-.362 7.203 0 1.896.391 2.117 1.538 2.246 2.077.02.086.029.176.029.265v2.97c0 .182-.108.35-.27.431l-2.5 1.423c-.094.054-.204.054-.298 0l-2.5-1.423c-.161-.081-.27-.25-.27-.431v-2.97c0-.089.009-.179.029-.265.056-.242.17-.642.734-.831-.193-.221-.432-.416-.705-.572-.968-.585-2.139-.585-3.107 0-.968.585-1.74 1.643-1.74 2.828 0 1.186.772 2.243 1.74 2.828.968.585 2.139.585 3.107 0 .273-.156.512-.351.705-.572z"/>
            </svg>
          </motion.a>
        </div>
      </motion.div>

      {/* Card Dirección */}
      <motion.div
        className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-l-4 border-blue-500 flex-1 max-w-full min-h-[260px] break-words"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12l4.243-4.243a8 8 0 10-11.314 11.314L12 13.414l5.657 5.657z" />
          </svg>
        </div>
        <p className="text-lg sm:text-base md:text-lg font-semibold text-gray-800 break-words">NUESTRA DIRECCIÓN</p>
        <p className="text-sm text-gray-600 break-words">Av. San Vicente de Paúl No. 19, Alma Rosa II</p>
      </motion.div>
    </motion.div>
  </div>
</section>

    </main>
  );
}
