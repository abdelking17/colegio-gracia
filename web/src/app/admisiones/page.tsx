"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

 

export default function AdmisionesPage() {
  const router = useRouter(); 
  const cursos = [
    {
      id: 1,
      nivel: "Preescolar",
      grados: ["Inicial", "Pre-Kínder", "Kínder"],
      icono: "🎨",
      descripcion:
        "Estimulación temprana y desarrollo de habilidades básicas en un ambiente lúdico y seguro.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      nivel: "Primaria",
      grados: ["1ro", "2do", "3ro", "4to", "5to", "6to"],
      icono: "📚",
      descripcion:
        "Formación integral con bases sólidas en matemáticas, ciencias, lenguaje y valores.",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      nivel: "Secundaria",
      grados: ["1ro", "2do", "3ro", "4to", "5to", "6to"],
      icono: "🔬",
      descripcion:
        "Educación especializada con enfoque en ciencias, tecnología y preparación universitaria.",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      nivel: "Bachillerato",
      grados: ["Ciencias", "Humanidades", "Técnico"],
      icono: "🎓",
      descripcion:
        "Programas avanzados con orientación vocacional y preparación para educación superior.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sección de Cursos */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Nuestros Programas Educativos
            </span>
          </motion.h2>

   


          {/* Grid de Cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cursos.map((curso, index) => (
              <motion.div
                key={curso.id}
                className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-100 hover:shadow-3xl transition-all duration-300 flex flex-col min-h-[520px]`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -22,
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${curso.color} p-6 text-center`}>
                  <div className="text-4xl mb-4">{curso.icono}</div>
                  <h3 className="text-xl font-bold text-white">{curso.nivel}</h3>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <p className="text-gray-600 mb-4 text-sm">{curso.descripcion}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Grados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {curso.grados.map((grado) => (
                          <span
                            key={grado}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {grado}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botón fijo abajo */}
                  <motion.button
                    className={`w-full bg-gradient-to-r ${curso.color} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all mt-auto`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                    if (curso.nivel === "Preescolar") {
                      router.push("/formularioinscripcion"); // ruta de la nueva página
                    } else {
                      alert("Próximamente disponible para este nivel"); // opcional
                    }
                  }}
                  >
                    Solicitar Información
                  </motion.button>
                </div>
              </motion.div>

              
            ))}
          </div>
        </div>
        <div className=" mb-10"></div>

            {/* Documentos Requeridos */}
<div className="mb-20">
  <motion.h3
    className="text-lg md:text-xl font-bold mb-6 text-left"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
      Documentos Requeridos para Inscripción
    </span>
  </motion.h3>

  <ul className="list-disc list-inside space-y-3 text-gray-700 text-sm md:text-base">
    {[
      "2 fotos 2x2 ",
      "Certificación médica ",
      "Cartón de nota del curso anterior ",
      "Histórico de la plataforma ",
      "Copia del récord de vacunación ",
      "Carta de saldo del colegio anterior ",
      "Formulario de inscripción ",
      "Carta pastoral (si es cristiano) ",
      // "Si el estudiante viene del exterior (otro país), los documentos deben ser evaluados por el Ministerio de Educación de la República Dominicana.",
    ].map((texto, index) => (
      <motion.li
        key={index}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        {texto}
      </motion.li>
      
    )
    )}
  </ul>
  <span className="bottom-[15%] mb-4 block">
  {/* contenido del primer span */}
</span>
   <span className="bg-gradient-to-r from-red-800 to-red-800 bg-clip-text mb-10 text-transparent">
      Si el estudiante viene del exterior (otro país), los documentos deben ser evaluados por el Ministerio de Educación de la República Dominicana.
    </span>
</div>

      </section>


    </div>
  );
}
