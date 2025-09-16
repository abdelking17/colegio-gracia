'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaBell,
  FaRightFromBracket,
  FaMoon,
  FaSun,
  FaLanguage,
  FaLock,
} from 'react-icons/fa6';
import StudentLayout from '../StudentLayout';

export default function StudentSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const student = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  };

  return (
    <StudentLayout>
      {/* Título */}
     
       <div className="mt-15 mb-8 md:mt-5 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Configuración</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar SOLO en escritorio */}
        <div className="hidden md:flex flex-col w-64 bg-white shadow-md rounded-2xl p-4">
          <h2 className="font-semibold mb-4">Menú</h2>
          <button className="w-full text-left p-2 rounded mb-1 hover:bg-gray-100">
            Perfil
          </button>
          <button className="w-full text-left p-2 rounded mb-1 hover:bg-gray-100">
            Seguridad
          </button>
          <button className="w-full text-left p-2 rounded mb-1 hover:bg-gray-100">
            Notificaciones
          </button>
          <button className="w-full text-left p-2 rounded mb-1 hover:bg-gray-100">
            Preferencias
          </button>
          <button className="w-full text-left p-2 rounded mt-4 text-red-600 hover:bg-red-50">
            Cerrar sesión
          </button>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 bg-white shadow-md rounded-2xl p-6 flex flex-col gap-6">
          {/* Perfil */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-4 border rounded-xl"
          >
            <img
              src={student.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-gray-500">{student.email}</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Editar Perfil
              </button>
            </div>
          </motion.div>

          {/* Menú de configuración horizontal SOLO en móvil */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            <div className="p-4 border rounded-xl text-center hover:bg-gray-50 transition">
              <FaUser className="mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-sm">Perfil</p>
            </div>
            <div className="p-4 border rounded-xl text-center hover:bg-gray-50 transition">
              <FaLock className="mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-sm">Seguridad</p>
            </div>
            <div className="p-4 border rounded-xl text-center hover:bg-gray-50 transition">
              <FaBell className="mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-sm">Notificaciones</p>
            </div>
            <div className="p-4 border rounded-xl text-center hover:bg-gray-50 transition">
              <FaMoon className="mx-auto mb-2 text-blue-600" />
              <p className="font-semibold text-sm">Preferencias</p>
            </div>
            <div className="col-span-2 p-4 border rounded-xl text-center text-red-600 hover:bg-red-50 transition">
              <FaRightFromBracket className="mx-auto mb-2" />
              <p className="font-semibold text-sm">Cerrar Sesión</p>
            </div>
          </div>

          {/* Seguridad */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 border rounded-xl"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaLock /> Seguridad
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="password"
                placeholder="Contraseña actual"
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                Cambiar
              </button>
            </div>
          </motion.div>

          {/* Notificaciones */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 border rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <FaBell className="text-gray-600" />
              <span className="font-semibold">Notificaciones</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 transition-all"></div>
            </label>
          </motion.div>

          {/* Preferencias */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 border rounded-xl flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaMoon /> Preferencias
            </h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-2 md:mt-0">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition"
              >
                {darkMode ? <FaSun /> : <FaMoon />}{' '}
                {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition">
                <FaLanguage /> Cambiar Idioma
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </StudentLayout>
  );
}
