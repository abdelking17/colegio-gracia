import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Centro Educativo Gracia",
  description: "AppWeb 100% responsive del CEG",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0E2A47",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* valor de respaldo: 64px; el Navbar lo actualizará dinámicamente */}
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        <Navbar />
        {/* 👇 el slider queda exactamente debajo del header */}
        <main className="w-full m-0 p-0 pt-[var(--header-height)]">
          {children}
        </main>

        <footer className="mt-16 border-t py-8 text-sm text-slate-600">
          <div className="mx-auto max-w-6xl px-4">
            © {new Date().getFullYear()} CEG
          </div>
        </footer>
      </body>
    </html>
  );
}
