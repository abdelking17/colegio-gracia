'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaPaperPlane } from 'react-icons/fa6';
import StudentLayout from '../StudentLayout';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  fromMe: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  messages: Message[];
}

export default function StudentMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Profa. Gómez',
      avatar: 'https://i.pravatar.cc/150?img=11',
      messages: [
        { id: 'm1', sender: 'Profa. Gómez', text: 'Recuerden entregar la tarea mañana', time: '10:00', fromMe: false },
        { id: 'm2', sender: 'Juan Pérez', text: 'Entendido, profesora 👍', time: '10:05', fromMe: true },
      ],
    },
    {
      id: '2',
      name: 'Profe. Pérez',
      avatar: 'https://i.pravatar.cc/150?img=12',
      messages: [
        { id: 'm3', sender: 'Profe. Pérez', text: '¿Pudiste resolver los ejercicios?', time: '09:00', fromMe: false },
      ],
    },
    {
      id: '3',
      name: 'Profa. Ruiz',
      avatar: 'https://i.pravatar.cc/150?img=13',
      messages: [
        { id: 'm4', sender: 'Profa. Ruiz', text: 'Hay examen la próxima semana', time: '08:30', fromMe: false },
      ],
    },
  ];

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  return (
    <StudentLayout>
      <div className="mt-10 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mensajes</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Conversaciones - SOLO GRID EN MÓVIL */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden">
          {conversations.map(conv => (
            <button
              key={conv.id}
              className="flex flex-col items-center p-3 bg-white rounded-xl shadow hover:shadow-md transition"
              onClick={() => setSelectedConversation(conv.id)}
            >
              <img src={conv.avatar} alt={conv.name} className="w-16 h-16 rounded-full mb-2" />
              <span className="text-sm font-medium">{conv.name}</span>
            </button>
          ))}
        </div>

        {/* Conversaciones - Sidebar en escritorio */}
        <div className="hidden md:flex flex-col w-64 bg-white shadow-md rounded-2xl p-4">
          <h2 className="font-semibold mb-4">Conversaciones</h2>
          {conversations.map(conv => (
            <button
              key={conv.id}
              className={`flex items-center gap-2 w-full text-left p-2 rounded mb-1 ${
                selectedConversation === conv.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <img src={conv.avatar} alt={conv.name} className="w-8 h-8 rounded-full" />
              {conv.name}
            </button>
          ))}
        </div>

        {/* Panel de mensajes */}
        <div className="flex-1 bg-white shadow-md rounded-2xl flex flex-col h-[600px]">
          {currentConversation ? (
            <>
              {/* Header conversación */}
              <div className="flex items-center gap-3 border-b p-4">
                <img
                  src={currentConversation.avatar}
                  alt={currentConversation.name}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="font-semibold text-lg">{currentConversation.name}</h2>
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {currentConversation.messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.fromMe && (
                      <img
                        src={currentConversation.avatar}
                        alt={msg.sender}
                        className="w-8 h-8 rounded-full mr-2 self-end"
                      />
                    )}
                    <div
                      className={`p-3 rounded-2xl max-w-xs shadow ${
                        msg.fromMe
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-70 block mt-1">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2 border-t p-3">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                  <FaPaperPlane />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Selecciona una conversación
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
