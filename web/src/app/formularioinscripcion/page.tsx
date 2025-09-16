"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiUpload } from "react-icons/fi"; // Icono de carga


interface FormData {
  // Datos del estudiante
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  nacionalidad: string;
  sexo: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  pais: string;
  telefono: string;
  email: string;

  // Padres/Tutores
  nombrePadre: string;
  tipoDocumentoPadre: string;      // <--- agregar
  documentoPadre: string;          // <--- agregar
  telefonoPadre: string;
  emailPadre: string;
  direccionPadre?: string;
  ciudadPadre?: string;
  provinciaPadre?: string;
  paisPadre?: string;
  ocupacionPadre?: string;
  empresaPadre?: string;

  nombreMadre: string;
  tipoDocumentoMadre: string;      // <--- agregar
  documentoMadre: string;          // <--- agregar
  telefonoMadre: string;
  emailMadre: string;
  direccionMadre?: string;
  ciudadMadre?: string;
  provinciaMadre?: string;
  paisMadre?: string;
  ocupacionMadre?: string;
  empresaMadre?: string;

  // Académicos
  cursoAnterior: string;
  colegioAnterior: string;
  promedioAnterior: string;
  observaciones: string;

  // Documentos
  fotos: File | null;
  certificadoMedico: File | null;
  cartonesNotas: File | null;
  historicoPlataforma: File | null;
  recordVacunacion: File | null;
  cartaSaldo: File | null;
  formularioInscripcion: File | null;
  cartaPastoral: File | null;
  otrosDocumentos: File | null;
}


export default function FormularioInscripcion() {
const [formData, setFormData] = useState<FormData>({
  nombres: "", apellidos: "", fechaNacimiento: "", lugarNacimiento: "", nacionalidad: "", sexo: "",
  direccion: "", ciudad: "", provincia: "", pais: "", telefono: "", email: "",

  nombrePadre: "", tipoDocumentoPadre: "", documentoPadre: "", telefonoPadre: "", emailPadre: "",
  direccionPadre: "", ciudadPadre: "", provinciaPadre: "", paisPadre: "", ocupacionPadre: "", empresaPadre: "",

  nombreMadre: "", tipoDocumentoMadre: "", documentoMadre: "", telefonoMadre: "", emailMadre: "",
  direccionMadre: "", ciudadMadre: "", provinciaMadre: "", paisMadre: "", ocupacionMadre: "", empresaMadre: "",

  cursoAnterior: "", colegioAnterior: "", promedioAnterior: "", observaciones: "",

  fotos: null, certificadoMedico: null, cartonesNotas: null, historicoPlataforma: null,
  recordVacunacion: null, cartaSaldo: null, formularioInscripcion: null, cartaPastoral: null, otrosDocumentos: null,
});


  const [step, setStep] = useState(1); // Paso actual (1-4)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Formulario enviado!");
  };

  // Círculos del progreso
  const steps = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6 md:px-12">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-l from-blue-600 to-indigo-700 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Formulario de Inscripción
      </motion.h1>

      {/* Indicador de pasos */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between relative">
          {/* Barra de progreso */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2 rounded-full">
            <motion.div
              className="h-1 bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {/* Círculos */}
          {steps.map((s) => (
            <div
              key={s}
              className={`z-10 w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-white text-lg font-bold ${
                s <= step ? "bg-blue-600 border-blue-600" : "bg-gray-300"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto grid gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Step 1: Datos del estudiante */}
        {step === 1 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Datos del Estudiante</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {["nombres", "apellidos", "fechaNacimiento", "lugarNacimiento", "nacionalidad", "sexo", "direccion", "ciudad", "provincia", "pais", "telefono", "email"].map((field) => (
                <div key={field} className="bg-white p-4 rounded-xl shadow-md">
                  {field === "sexo" ? (
                    <select name="sexo" className="inputStyle w-full" onChange={handleChange}>
                      <option value="">Sexo</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </select>
                  ) : field === "fechaNacimiento" ? (
                    <input type="date" name="fechaNacimiento" className="inputStyle w-full" onChange={handleChange} />
                  ) : (
                    <input type="text" name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="inputStyle w-full" onChange={handleChange} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

{/* Step 2: Padres/Tutores */}
{step === 2 && (
  <section>
    <h2 className="text-xl font-semibold mb-4">Información de los Padres / Tutores</h2>
    
    {/* Información del Padre */}
    <h3 className="text-lg font-medium mb-2">Información del Padre</h3>
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      {/* Nombre del Padre */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <input
          type="text"
          name="nombrePadre"
          placeholder="Nombre"
          className="inputStyle w-full"
          onChange={handleChange}
        />
      </div>

      {/* Tipo de Documento del Padre */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <select
          name="tipoDocumentoPadre"
          className="inputStyle w-full"
          onChange={handleChange}
          value={formData.tipoDocumentoPadre || ""}
        >
          <option value="">Selecciona Tipo de Documento</option>
          <option value="cedula">Cédula</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Número de Documento del Padre (solo si se seleccionó un tipo) */}
      {formData.tipoDocumentoPadre && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <input
            type="text"
            name="documentoPadre"
            placeholder="Número de Documento del Padre"
            className="inputStyle w-full"
            onChange={handleChange}
          />
        </div>
      )}

      {/* Resto de campos del Padre */}
      {["Direccion", "Ciudad", "Provincia", "Pais", "Telefono", "Email", "Ocupacion", "Trabajo"].map((field) => (
        <div key={field} className="bg-white p-4 rounded-xl shadow-md">
          <input
            type={field.includes("telefono") ? "tel" : field.includes("email") ? "email" : "text"}
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            className="inputStyle w-full"
            onChange={handleChange}
          />
        </div>
      ))}
    </div>

    {/* Información de la Madre */}
    <h3 className="text-lg font-medium mb-2">Información de la Madre</h3>
    <div className="grid md:grid-cols-2 gap-4">
      {/* Nombre de la Madre */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <input
          type="text"
          name="nombreMadre"
          placeholder="Nombre de la Madre"
          className="inputStyle w-full"
          onChange={handleChange}
        />
      </div>

      {/* Tipo de Documento de la Madre */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <select
          name="tipoDocumentoMadre"
          className="inputStyle w-full"
          onChange={handleChange}
          value={formData.tipoDocumentoMadre || ""}
        >
          <option value="">Selecciona Tipo de Documento</option>
          <option value="cedula">Cédula</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Número de Documento de la Madre (solo si se seleccionó un tipo) */}
      {formData.tipoDocumentoMadre && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <input
            type="text"
            name="documentoMadre"
            placeholder="Número de Documento de la Madre"
            className="inputStyle w-full"
            onChange={handleChange}
          />
        </div>
      )}

      {/* Resto de campos de la Madre */}
      {["Direccion", "Ciudad", "Provincia", "Pais", "Telefono", "Email", "Ocupacion", "Trabajo"].map((field) => (
        <div key={field} className="bg-white p-4 rounded-xl shadow-md">
          <input
            type={field.includes("telefono") ? "tel" : field.includes("email") ? "email" : "text"}
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            className="inputStyle w-full"
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  </section>
)}




      {/* Step 3: Académicos */}
{step === 3 && (
  <section>
    <h2 className="text-xl font-semibold mb-4">Información Académica</h2>
    <div className="grid md:grid-cols-2 gap-4">
      {/* Curso Anterior como Dropdown */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <select
          name="cursoAnterior"
          className="inputStyle w-full"
          value={formData.cursoAnterior}
          onChange={handleChange}
        >
          <option value="">Selecciona Curso Anterior</option>
          <option value="Tolder">Tolder</option>
          <option value="Pre-Kínder">Pre-Kínder</option>
          <option value="Kínder">Kínder</option>
          <option value="1er Grado">1er Grado</option>
          <option value="2do Grado">2do Grado</option>
          <option value="3er Grado">3er Grado</option>
          <option value="4to Grado">4to Grado</option>
          <option value="5to Grado">5to Grado</option>
          <option value="6to Grado">6to Grado</option>
          <option value="7mo Grado">7mo Grado</option>
          <option value="8vo Grado">8vo Grado</option>
          <option value="9no Grado">9no Grado</option>
          <option value="1ro de Bachillerato">1ro de Bachillerato</option>
          <option value="2do de Bachillerato">2do de Bachillerato</option>
          <option value="3ro de Bachillerato">3ro de Bachillerato</option>
          <option value="4to de Bachillerato">4to de Bachillerato</option>
        </select>
      </div>

      {/* Colegio Anterior */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <input
          type="text"
          name="colegioAnterior"
          placeholder="Colegio Anterior"
          className="inputStyle w-full"
          onChange={handleChange}
        />
      </div>

      {/* Promedio Anterior */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <input
          type="text"
          name="promedioAnterior"
          placeholder="Promedio Anterior"
          className="inputStyle w-full"
          onChange={handleChange}
        />
      </div>

      {/* Observaciones */}
      <div className="bg-white p-4 rounded-xl shadow-md col-span-full">
        <textarea
          name="observaciones"
          placeholder="Observaciones"
          className="inputStyle w-full"
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  </section>
)}


        {/* Step 4: Documentos */}
        {step === 4 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Documentos Requeridos</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "fotos", label: "Fotos del Estudiante" },
                { name: "certificadoMedico", label: "Certificado Médico" },
                { name: "cartonesNotas", label: "Cartones de Notas" },
                { name: "historicoPlataforma", label: "Histórico Plataforma" },
                { name: "recordVacunacion", label: "Record de Vacunación" },
                { name: "cartaSaldo", label: "Carta de Saldo" },
                { name: "formularioInscripcion", label: "Formulario de Inscripción" },
                { name: "cartaPastoral", label: "Carta Pastoral" },
                { name: "otrosDocumentos", label: "Otros Documentos" },
              ].map((doc) => (
                <div key={doc.name} className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
            <FiUpload size={28} color="#2563EB" />
            <label className="flex-1 cursor-pointer">
                {doc.label}
                <input type="file" name={doc.name} onChange={handleFileChange} className="hidden" />
            </label>
            </div>

              ))}
            </div>
          </section>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
              onClick={handlePrev}
            >
              Anterior
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ml-auto"
              onClick={handleNext}
            >
              Continuar
            </button>
          ) : (
            <motion.button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ml-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar Inscripción
            </motion.button>
          )}
        </div>
      </motion.form>
    </div>
  );
}

/* Tailwind inputStyle recomendado
.inputStyle {
  @apply border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}
*/
