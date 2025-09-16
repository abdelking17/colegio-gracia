'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaCheck, FaSpinner, FaXmark } from 'react-icons/fa6';
import StudentLayout from '../StudentLayout'; // Layout que ya tiene el botón Hamburger

interface Task {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pendiente' | 'en-progreso' | 'completada';
}

export default function StudentTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', subject: 'Matemáticas', title: 'Ejercicios pág. 45', dueDate: 'Hoy', status: 'pendiente' },
    { id: '2', subject: 'Ciencias', title: 'Proyecto Solar', dueDate: 'Mañana', status: 'en-progreso' },
    { id: '3', subject: 'Historia', title: 'Ensayo sobre la Revolución', dueDate: 'En 3 días', status: 'pendiente' },
    { id: '4', subject: 'Lengua Española', title: 'Redacción sobre lectura', dueDate: 'En 2 días', status: 'completada' },
  ]);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          let newStatus: Task['status'];
          if (task.status === 'pendiente') newStatus = 'en-progreso';
          else if (task.status === 'en-progreso') newStatus = 'completada';
          else newStatus = 'pendiente';
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const getStatusIcon = (status: Task['status']) => {
    if (status === 'pendiente') return <FaXmark className="text-red-500" />;
    if (status === 'en-progreso') return <FaSpinner className="text-yellow-500 animate-spin" />;
    return <FaCheck className="text-green-500" />;
  };

  return (
    <StudentLayout>
      {/* Título móvil y desktop */}
      <div className="mt-15 mb-8 md:mt-5 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tareas</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-6 cursor-pointer flex flex-col justify-between"
            onClick={() => toggleTaskStatus(task.id)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <FaClipboardList size={28} className="text-blue-600" />
              <h2 className="text-xl font-semibold">{task.subject}</h2>
            </div>
            <p className="text-gray-500">{task.title}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">{task.dueDate}</span>
              <span>{getStatusIcon(task.status)}</span>
            </div>
            <span
              className={`mt-4 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                task.status === 'pendiente'
                  ? 'bg-red-100 text-red-800'
                  : task.status === 'en-progreso'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {task.status === 'pendiente'
                ? 'Pendiente'
                : task.status === 'en-progreso'
                ? 'En progreso'
                : 'Completada'}
            </span>
          </motion.div>
        ))}
      </div>
    </StudentLayout>
  );
}
