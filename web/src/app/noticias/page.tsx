"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface NewsPost {
  id: number;
  title: string;
  date: string;
  author: string;
  image: string;
  content: string;
  likes: number;
  comments: CommentType[];
}

interface CommentType {
  id: number;
  name: string;
  text: string;
}

export default function Noticias() {
  const [posts, setPosts] = useState<NewsPost[]>([
    {
      id: 1,
      title: "Daniel Orante, estudiante meritorio",
      date: "5 de Septiembre, 2025",
      author: "Centro Educativo La Gracia",
      image: "/slider.jpg",
      content:
        "Daniel Orante es un estudiante ejemplar y meritorio, promovido al Nivel de Bachillerato, ha crecido con nosotros en CEG; muy a pasar de algunas providencias aflictivas ha mantenido su constancia académica y conductual...Muchas felicitaciones y que Dios en su gracia y amor te de plena salud. Estamos contigo muy amado Daniel.",
      likes: 0,
      comments: [],
    },
    {
      id: 2,
      title: "Ana, estudiante estrella de CELEGRA",
      date: "1 de Septiembre, 2025",
      author: "Centro Educativo La Gracia",
      image: "/slider2.jpg",
      content:
        "Ana, una estudiante estrella de CELEGRA super proactiva aprendió Mandarín en medio de la pandemia, hoy en día es maestra del idioma Mandarín. Ella evidencia el perfil del egresado CELEGRA: Equipando una generación de líderes felices en el temor de Dios.",
      likes: 0,
      comments: [],
    },
    {
      id: 3,
      title: "¡Misión cumplida! 'Mis Primeros Pasos' y 'Ya Sé Leer' 2024-2025",
      date: "30 de Agosto, 2025",
      author: "Centro Educativo La Gracia",
      image: "/fotonoticia.jpg",
      content:
        "Equipando una generación de líderes felices en el temor de Dios. Nuestros estudiantes lograron grandes avances durante el año escolar 2024-2025.",
      likes: 0,
      comments: [],
    },
    {
      id: 4,
      title: "Visión año escolar 2024-2025 CEG-CELEGRA",
      date: "30 de Agosto, 2025",
      author: "Centro Educativo La Gracia",
      image: "/fotoFamilia.jpg",
      content:
        "Con la integración de todos los que aman la visión CELEGRA lograremos extraer el mayor potencial de nuestros muy amados estudiantes, y serán tan motivados que no tendrán tiempo para pensar en lo que no edifica; los padres estarán tan impactados que aportarán a favor de los estudiantes sus conocimientos y dones que los enriquecerán a tal punto que se convertirán en entes productivos. Amarán como nunca las matemáticas, la historia, los idiomas, las artes, los deportes, las ciencias… y se gozarán en Dios y su maravillosa creación. Será tan emocionante que no querrán que el tiempo se agote y que el fin de semana pase pronto para reencontrarse nuevamente con aquellos que están aprendiendo a amar a Dios y a ser libres por medio de la verdad verdadera. Será tan glorioso que no solamente disfrutarán la meta sino también todo el viaje hasta llegar al final.",
      likes: 0,
      comments: [],
    },
  ]);

  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleLike = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return;
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              { id: Date.now(), name: "Anónimo", text: commentText },
            ],
          }
        : post
    ));
    setCommentText("");
  };

  return (
    <section
      className="py-16 px-6 md:px-12 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondoNoticias.jpeg')" }}
    >
      {/* Header con estilo */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Sección de Noticias
        </motion.h1>
        <p className="text-gray-700 md:text-lg bg-white/70 p-4 rounded-2xl inline-block">
          Mantente informado sobre los logros, eventos y actividades de nuestro colegio. Comenta, da like y participa en nuestra comunidad educativa.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        {/* Columna izquierda: Noticias Destacadas */}
        <div className="hidden md:block col-span-1 space-y-6">
          <h3 className="text-xl font-bold mb-4">Noticias Destacadas</h3>
          {posts.map(post => (
            <div key={post.id} className="bg-white/90 shadow rounded-xl overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-32 object-contain" />
              <div className="p-3">
                <h4 className="text-gray-800 font-semibold text-sm">{post.title}</h4>
                <p className="text-gray-500 text-xs">{post.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Columna central: Noticias principales */}
        <div className="md:col-span-2 space-y-10">
          {posts.map(post => (
            <motion.div
              key={post.id}
              className="bg-white/90 shadow-xl rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={post.image} alt={post.title} className="w-full h-auto object-contain" />

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{post.date} | {post.author}</p>
                <p className="text-gray-700 mb-4">{post.content}</p>

                {/* Botones estilo redes sociales */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:scale-110 transition-transform"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-7.828-7.828a4 4 0 010-5.656z" />
                    </svg>
                    {post.likes}
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-110 transition-transform"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPostId(post.id)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 6.5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2v-9zM5 4h14a4 4 0 014 4v9a4 4 0 01-4 4H5a4 4 0 01-4-4V8a4 4 0 014-4z" />
                    </svg>
                    Comentar
                  </motion.button>
                </div>

                {/* Comentarios */}
                {selectedPostId === post.id && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Comentarios</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {post.comments.map(comment => (
                        <motion.div
                          key={comment.id}
                          className="bg-white/70 shadow rounded-xl p-3"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                        >
                          <p className="text-gray-800 font-semibold">{comment.name}:</p>
                          <p className="text-gray-700">{comment.text}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 mt-3">
                      <input
                        type="text"
                        placeholder="Escribe tu comentario..."
                        className="flex-1 px-4 py-3 rounded-2xl outline-none border-none shadow-md bg-white/90"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold hover:scale-105 transform transition-all"
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Columna derecha: Últimas Noticias */}
        <div className="hidden md:block col-span-1 space-y-6">
          <h3 className="text-xl font-bold mb-4">Últimas Noticias</h3>
          {posts.map(post => (
            <div key={post.id} className="bg-white/90 shadow rounded-xl overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-32 object-contain" />
              <div className="p-3">
                <h4 className="text-gray-800 font-semibold text-sm">{post.title}</h4>
                <p className="text-gray-500 text-xs">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
