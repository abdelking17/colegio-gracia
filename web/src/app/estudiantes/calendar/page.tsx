'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StudentLayout from '../StudentLayout';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function StudentCalendar() {
  const [studentName] = useState('Juan Pérez');

  const events: EventInput[] = [
    { title: 'Examen Matemáticas', date: '2025-09-10', color: '#3b82f6' },
    { title: 'Feria de Ciencias', date: '2025-09-15', color: '#10b981' },
    { title: 'Entrega Proyecto Historia', date: '2025-09-20', color: '#f59e0b' },
    { title: 'Reunión Padres', date: '2025-09-25', color: '#ef4444' },
  ];

  return (
    <StudentLayout>
      {/* Título móvil y desktop */}
      <div className="mt-15 mb-8 md:mt-5 md:mb-6 px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Calendario Escolar
        </h1>
      </div>

      {/* Contenedor responsive del calendario */}
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        className="bg-white shadow-md rounded-2xl p-4 md:p-6 w-full overflow-auto"
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          height="auto"
          contentHeight="auto"
        />
      </motion.div>
    </StudentLayout>
  );
}
