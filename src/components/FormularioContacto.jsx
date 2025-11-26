import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  const [errores, setErrores] = useState({ nombre: "", telefono: "", correo: "" });
  const [enviando, setEnviando] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function validarFormulario() {
    const nuevos = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) nuevos.nombre = "El nombre es obligatorio.";
    if (!form.telefono.trim()) {
      nuevos.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      nuevos.telefono = "El teléfono debe tener al menos 7 caracteres.";
    }
    if (!form.correo.trim()) {
      nuevos.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevos.correo = "El correo debe contener @.";
    }

    setErrores(nuevos);
    return !nuevos.nombre && !nuevos.telefono && !nuevos.correo;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setEnviando(true);
      await onAgregar(form);
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } finally {
      setEnviando(false);
    }
  };

  const input = "w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500";
  const label = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form className="bg-white shadow-sm rounded-2xl p-6 space-y-4 mb-8" onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Nuevo contacto</h2>

      <div>
        <label className={label}>Nombre *</label>
        <input className={input} name="nombre" placeholder="Ej: Camila Pérez"
               value={form.nombre} onChange={onChange} />
        {errores.nombre && <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>}
      </div>

      <div>
        <label className={label}>Teléfono *</label>
        <input className={input} name="telefono" placeholder="Ej: 300 123 4567"
               value={form.telefono} onChange={onChange} />
        {errores.telefono && <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>}
      </div>

      <div>
        <label className={label}>Correo *</label>
        <input className={input} name="correo" placeholder="Ej: camila@sena.edu.co"
               value={form.correo} onChange={onChange} />
        {errores.correo && <p className="mt-1 text-xs text-red-600">{errores.correo}</p>}
      </div>

      <div>
        <label className={label}>Etiqueta (opcional)</label>
        <input className={input} name="etiqueta" placeholder="Ej: Trabajo"
               value={form.etiqueta} onChange={onChange} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
                     disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando ? "Guardando..." : "Agregar contacto"}
        </button>
      </div>
    </form>
  );
}