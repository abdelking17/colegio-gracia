'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBook, FaClipboardList, FaCalendar, FaGear, FaEnvelope,
  FaRightFromBracket, FaHouse, FaBars
} from 'react-icons/fa6';

interface Props {
  children: ReactNode;
}

export default function StudentLayout({ children }: Props) {
  const router = useRouter();
  const studentName = 'Juan Pérez';
  const studentAvatar = 'https://i.pravatar.cc/150?img=3';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <FaHouse />, label: 'Home', path: '/estudiantes/' },
    { icon: <FaBook />, label: 'Clases', path: '/estudiantes/classes' },
    { icon: <FaClipboardList />, label: 'Tareas', path: '/estudiantes/task' },
    { icon: <FaCalendar />, label: 'Calendario', path: '/estudiantes/calendar' },
    { icon: <FaEnvelope />, label: 'Mensajes', path: '/estudiantes/mensajes' },
    { icon: <FaGear />, label: 'Configuración', path: '/estudiantes/configuracion'},
    { icon: <FaRightFromBracket />, label: 'Cerrar Sesión', path: '#' },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar escritorio */}
      <aside className="hidden md:flex w-64 bg-gradient-to-b from-blue-700 to-indigo-900 text-white flex-col p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-10">
          <img
            src={studentAvatar}
            alt={studentName}
            className="w-15 h-15 rounded-full border-2 border-white shadow-md"
          />
          <span className="text-lg font-semibold">{studentName}</span>
        </div>
        <nav className="space-y-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className="flex items-center space-x-2 hover:text-blue-300 w-full text-left"
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Botón Hamburger móvil */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-blue-600 text-white shadow-lg"
          aria-label="Abrir menú"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar móvil */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-indigo-900 text-white flex flex-col p-6 shadow-lg z-50"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center space-x-3 mb-10">
                <img
                  src={studentAvatar}
                  alt={studentName}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <span className="text-lg font-semibold">{studentName}</span>
              </div>
              <nav className="space-y-4">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      router.push(item.path);
                      setSidebarOpen(false); // cierra al seleccionar
                    }}
                    className="flex items-center space-x-2 hover:text-blue-300 w-full text-left"
                  >
                    {item.icon} <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
