"use client"
import { postImg } from "@/src/services/img"
import { useState, useRef } from "react"

const LoadImg = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await postImg(title, description, file);
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6f0] via-[#fff8f4] to-[#f2e8dc] px-4 py-10">
      <div className="w-full max-w-2xl rounded-[32px] border border-[#e8d8c8] bg-white/95 p-8 shadow-[0_20px_80px_rgba(156,115,80,0.12)] backdrop-blur-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9c7350]">Carga tu imagen</p>
          <h1 className="mt-4 text-3xl font-bold text-[#5b4333]">Sube tu imagen con estilo</h1>
          <p className="mt-3 text-sm leading-6 text-[#6f5c50]">
            Completa los campos y selecciona un archivo para ver una vista previa antes de subir.
          </p>
        </div>

        <form onSubmit={submitForm} className="grid gap-6">
          <label className="grid gap-2 text-sm font-medium text-[#5b4b40]">
            Título
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Escribe un título"
              className="h-14 rounded-3xl border border-[#e2d6c8] bg-[#faf3ed] px-4 text-sm text-[#3f352c] outline-none transition focus:border-[#b8916e] focus:ring-2 focus:ring-[#edd5c2]/70"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#5b4b40]">
            Descripción
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe la imagen"
              rows={5}
              className="min-h-[120px] rounded-3xl border border-[#e2d6c8] bg-[#faf3ed] px-4 py-3 text-sm text-[#3f352c] outline-none transition focus:border-[#b8916e] focus:ring-2 focus:ring-[#edd5c2]/70"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#5b4b40]">
            Imagen
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-[#5b4b40] file:mr-4 file:rounded-full file:border-0 file:bg-[#9c7350] file:px-4 file:py-2 file:text-sm file:text-white file:font-semibold file:hover:bg-[#8d624a]"
            />
          </label>

          {preview && (
            <div className="rounded-3xl border border-[#e2d6c8] bg-[#fff7f1] p-3 shadow-sm">
              <p className="mb-3 text-sm font-medium text-[#5b4b40]">Vista previa</p>
              <img src={preview} alt="Vista previa" className="h-[260px] w-full rounded-3xl object-cover" />
            </div>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-3xl bg-[#9c7350] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#9c7350]/20 transition hover:bg-[#8d624a] active:scale-[0.98]"
          >
            Subir imagen
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoadImg
