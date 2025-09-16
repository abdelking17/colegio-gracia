'use client';

import StudentLayout from '../StudentLayout';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa6';

export default function ClassesPage() {
  const [activeClass, setActiveClass] = useState<string | null>(null);

  const classes = [
    { id: 'math', name: 'Matemáticas', teacher: 'Profa. Gómez' },
    { id: 'spanish', name: 'Lengua Española', teacher: 'Profe. Pérez' },
    { id: 'science', name: 'Ciencias', teacher: 'Profa. Ruiz' },
    { id: 'history', name: 'Historia', teacher: 'Profe. López' },
  ];

  return (
    <StudentLayout>
     {/* Título móvil y desktop */}
 <div className="mt-15 mb-8 md:mt-5 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mis Clases</h1>
      </div>


      <motion.h1
        className="hidden md:block text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Mis Clases
        </span> */}
      </motion.h1>

      {/* Grid de clases */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {classes.map(cls => (
          <motion.div
            key={cls.id}
            whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all duration-200 flex flex-col justify-between min-h-[180px]"
            onClick={() => setActiveClass(activeClass === cls.id ? null : cls.id)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                <FaBookOpen size={20} className="text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">
                {cls.name}
              </h2>
            </div>
            <div className="mt-auto">
              <p className="text-gray-600 text-sm sm:text-base mb-3">{cls.teacher}</p>
              <div className="flex justify-between items-center">
                <span className={`inline-block text-xs sm:text-sm px-3 py-1 rounded-full ${
                  activeClass === cls.id
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {activeClass === cls.id ? 'Seleccionada' : 'Disponible'}
                </span>
                <motion.span
                  animate={{
                    scale: activeClass === cls.id ? 1.1 : 1,
                    color: activeClass === cls.id ? '#2563eb' : '#9ca3af'
                  }}
                  className="text-sm"
                >
                  ▶
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Panel de detalles */}
      {activeClass && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white shadow-xl rounded-2xl border border-gray-100"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Detalles de la Clase</h2>
            <button
              onClick={() => setActiveClass(null)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📚 Materiales</h3>
              <p className="text-sm text-blue-600">Libros y recursos digitales</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">📝 Tareas</h3>
              <p className="text-sm text-green-600">Próximas asignaciones</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">🎥 Videos</h3>
              <p className="text-sm text-purple-600">Clases grabadas</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-700 text-sm sm:text-base">
              Contenido interactivo de la clase seleccionada: materiales de estudio, 
              tareas pendientes, notas importantes y recursos multimedia disponibles.
            </p>
          </div>
        </motion.div>
      )}
    </StudentLayout>
  );
}
