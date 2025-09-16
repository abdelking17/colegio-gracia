"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Contacto() {
  return (
    <section
      className="py-20 px-6 md:px-12 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondoContacto.jpeg')" }}
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Formulario de Contacto
          </span>
        </motion.h2>
        <p className="text-gray-700 md:text-lg bg-white/70 p-4 rounded-2xl inline-block">
          Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
      </div>

      <form className="max-w-4xl mx-auto space-y-6">
        {/* Primera fila: Nombre y Correo */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Nombre */}
          <motion.div
            className="bg-white/70 shadow-lg rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre completo
            </label>
            <motion.div className="bg-white/90 shadow-xl rounded-2xl p-2 mt-1">
              <input
                type="text"
                placeholder="Escribe tu nombre completo"
                className="w-full rounded-xl px-4 py-3 outline-none border-none"
              />
            </motion.div>
          </motion.div>

          {/* Correo */}
          <motion.div
            className="bg-white/70 shadow-lg rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Correo electrónico
            </label>
            <motion.div className="bg-white/90 shadow-xl rounded-2xl p-2 mt-1">
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                className="w-full rounded-xl px-4 py-3 outline-none border-none"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Segunda fila: Teléfono y Dropdown */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Teléfono */}
          <motion.div
            className="bg-white/70 shadow-lg rounded-2xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Teléfono
            </label>
            <motion.div className="bg-white/90 shadow-xl rounded-2xl p-2 mt-1">
              <input
                type="tel"
                placeholder="(809) 123-4567"
                className="w-full rounded-xl px-4 py-3 outline-none border-none"
              />
            </motion.div>
          </motion.div>

          {/* Asunto */}
          <motion.div
            className="bg-white/70 shadow-lg rounded-2xl p-6 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Asunto
            </label>
            <motion.div className="bg-white/90 shadow-xl rounded-2xl p-2 mt-1 relative">
              <select
                className="w-full rounded-xl px-4 py-3 pr-12 outline-none border-none appearance-none"
              >
                <option value="">Selecciona un motivo</option>
                <option value="seguimiento">Seguimiento de caso</option>
                <option value="programas">Programas Educativos</option>
                <option value="inscripcion">Información de inscripción</option>
                <option value="pago">Información de pago</option>
                <option value="cita">Cómo hago una cita</option>
                <option value="problema">Reportar un problema con la página</option>
              </select>
              {/* Flecha personalizada más centrada */}
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                ▼
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Mensaje */}
        <motion.div
          className="bg-white/70 shadow-lg rounded-2xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-gray-700 font-semibold mb-2">
            Mensaje
          </label>
          <motion.div className="bg-white/90 shadow-xl rounded-2xl p-2 mt-1">
            <textarea
              rows={5}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full rounded-xl px-4 py-3 outline-none border-none resize-none"
            ></textarea>
          </motion.div>
        </motion.div>

        {/* Botón */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <button
            type="submit"
            className="inline-block px-10 py-4 text-white font-bold text-lg
                       rounded-2xl shadow-2xl hover:shadow-3xl
                       bg-gradient-to-r from-blue-600 to-indigo-700
                       transition-all duration-300 transform hover:scale-105"
          >
            Enviar Mensaje
          </button>
        </motion.div>
      </form>
    </section>
  );
}
