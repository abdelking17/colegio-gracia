'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Credenciales incorrectas');

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirigir según el rol
      switch (data.user.role) {
        case 'ADMIN':
        case 'DIRECTOR':
          router.push('/admin/dashboard');
          break;
        case 'TEACHER':
          router.push('/teacher/dashboard');
          break;
        case 'PARENT':
          router.push('/parent/dashboard');
          break;
        case 'STUDENT':
          router.push('/student/dashboard');
          break;
        case 'COMMS':
          router.push('/comms/dashboard');
          break;
        default:
          router.push('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión - CEG</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Etiquetas principales */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 focus:outline-none focus:ring-0 border-0 bg-transparent"
              placeholder="Ingresa tu email"
              required
            />
          </div>

          {/* Password Card */}
          <label className="block text-sm font-medium">Contraseña</label>
          <div className="bg-white rounded-xl shadow-md p-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 focus:outline-none focus:ring-0 border-0 bg-transparent"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Olvidó contraseña */}
          <p className="text-sm text-blue-700 hover:underline cursor-pointer text-right">
            ¿Has olvidado tu contraseña?
          </p>

          {/* Botón principal */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Ingresar
          </button>

          {/* Botón acceso directo */}
          <button
            type="button"
            onClick={() => router.push('/estudiantes')}
            className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700 transition mt-3"
          >
            Acceso Directo
          </button>
        </form>
      </motion.div>
    </div>
  );
}
