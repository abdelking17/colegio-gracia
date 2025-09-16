'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Definir rutas donde queremos ocultar los menus
  const isDashboard = pathname?.startsWith("/estudiantes");

  return (
    <header className="fixed top-0 z-50 bg-[#0069ea] text-white w-full">
      <nav className="relative w-full h-16 flex items-center justify-between px-6">
        {/* Menú lado izquierdo */}
        {!isDashboard && (
          <ul className="hidden md:flex items-center gap-6 text-base">
            <li><Link href="/admisiones" className="hover:text-blue-200">Admisiones</Link></li>
            <li><Link href="/programas" className="hover:text-blue-200">Programas</Link></li>
          </ul>
        )}

        {/* Logo centrado */}
        <div className="absolute left-1/2 top-2 transform -translate-x-1/2">
          <Link href="/" className="flex items-center justify-center">
            <div className="w-26 h-26 rounded-full bg-white flex items-center justify-center shadow-2xl border-2 border-white">
              <img
                src="/logotransparente.png"
                alt="Logo CEG"
                className="w-50 h-50 object-contain rounded-full"
              />
            </div>
          </Link>
        </div>

        {/* Menú lado derecho */}
        {!isDashboard && (
          <ul className="hidden md:flex items-center gap-6 text-base">
            <li><Link href="/noticias" className="hover:text-blue-200">Noticias</Link></li>
            <li><Link href="/contacto" className="hover:text-blue-200">Contacto</Link></li>
            <li><Link href="/login" className="hover:text-blue-200 font-semibold">Iniciar Sesión</Link></li>
          </ul>
        )}

        {/* Botón menú móvil */}
        {!isDashboard && (
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>

      {/* Drawer móvil */}
      {!isDashboard && isOpen && (
        <div className="md:hidden bg-white text-[#003b9f] border-t px-4 py-4 space-y-4">
          <Link href="/admisiones" className="block hover:text-blue-600">Admisiones</Link>
          <Link href="/programas" className="block hover:text-blue-600">Programas</Link>
          <Link href="/noticias" className="block hover:text-blue-600">Noticias</Link>
          <Link href="/contacto" className="block hover:text-blue-600">Contacto</Link>
          <Link href="/login" className="block hover:text-blue-600 font-semibold">Iniciar Sesión</Link>
        </div>
      )}
    </header>
  );
}
