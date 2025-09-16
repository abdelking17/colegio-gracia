'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaClipboardList, FaCheck, FaSpinner, FaXmark } from 'react-icons/fa6';
import StudentLayout from './StudentLayout';

import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function StudentDashboard() {
  const [studentName] = useState('Juan Pérez');

  const performanceData = [
    { name: 'Matemáticas', value: 85 },
    { name: 'Lengua Española', value: 90 },
    { name: 'Ciencias', value: 78 },
    { name: 'Historia', value: 88 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const progressData = [
    { name: 'Ene', promedio: 80 },
    { name: 'Feb', promedio: 82 },
    { name: 'Mar', promedio: 85 },
    { name: 'Abr', promedio: 87 },
    { name: 'May', promedio: 89 },
  ];

  return (
    <StudentLayout>
      {/* Título móvil y desktop */}
      <div className="mt-20 mb-8 md:mt-5 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Bienvenido, {studentName}
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Estado Académico */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Estado Académico</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={performanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Progreso Mensual */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Progreso Mensual</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="promedio" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tareas Pendientes */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Tareas Pendientes</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Matemáticas - Ejercicios pág. 45</span> <span className="text-red-500">Hoy</span></li>
            <li className="flex justify-between"><span>Ciencias - Proyecto Solar</span> <span className="text-yellow-500">Mañana</span></li>
            <li className="flex justify-between"><span>Historia - Ensayo</span> <span className="text-green-500">En 3 días</span></li>
          </ul>
        </motion.div>
      </div>

      {/* Sección Inferior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:mt-8">
        {/* Calendario */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Calendario Escolar</h2>
          <p className="text-gray-500">Aquí irá un calendario interactivo (FullCalendar o similar).</p>
        </motion.div>

        {/* Anuncios */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Anuncios Importantes</h2>
          <ul className="space-y-3 text-sm">
            <li className="border-l-4 border-blue-500 pl-2">📢 Semana de exámenes: 15 - 20 de Septiembre</li>
            <li className="border-l-4 border-green-500 pl-2">✅ Feria de Ciencias - Inscripción abierta</li>
            <li className="border-l-4 border-red-500 pl-2">⚠️ Recordatorio de pago mensual</li>
          </ul>
        </motion.div>
      </div>
    </StudentLayout>
  );
}
