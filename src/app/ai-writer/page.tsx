"use client"
import { useState } from "react"
import { generarBorradorBlog } from "@/src/services/ai"

export default function AiWritePage() {
    const [titulo, setTitulo] = useState("");
    const [borrador, setBorrador] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [copiado, setCopiado] = useState(false);

    const generar = async () => {
        if (!titulo.trim()) return

        setCargando(true);
        setBorrador("");
        setError("");
        try {
            const texto = await generarBorradorBlog(titulo);
            setBorrador(texto)
        } catch {
            setError("No se pudo conectar con la IA. Verifica que OPEN_AI esté configurado")
        } finally {
            setCargando(false)
        }
    };

    const copiar = () => {
        navigator.clipboard.writeText(borrador);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <main className="min-h-screen" style={{ background: "#fdf0e8" }}>

            {/* Header */}
            <header style={{ background: "#fdf6f0", borderBottom: "1px solid #f0d9cc" }}>
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <span
                        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide"
                        style={{ background: "#f7c5a0", color: "#7a3e1e" }}
                    >
                        ✨ IA · Streaming · OpenAI
                    </span>
                    <h1 className="text-4xl font-bold mb-2" style={{ color: "#6b4f3a" }}>
                        Asistente de escritura
                    </h1>
                    <p className="text-base" style={{ color: "#b07850" }}>
                        Escribe un título y la IA genera un borrador completo en markdown — en tiempo real.
                    </p>
                </div>
            </header>

            <section className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">

                {/* Input + botón */}
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !cargando && generar()}
                        disabled={cargando}
                        placeholder="Ej: Los beneficios del retinol en la rutina facial"
                        className="flex-1 rounded-xl px-4 py-3 outline-none transition-opacity disabled:opacity-50"
                        style={{
                            background: "#fff8f4",
                            border: "1px solid #f0d9cc",
                            color: "#6b4f3a",
                        }}
                    />

                    <button
                        onClick={generar}
                        disabled={cargando || !titulo.trim()}
                        className="font-semibold px-6 py-3 rounded-xl transition-transform active:scale-[0.97] disabled:cursor-not-allowed"
                        style={{
                            background: cargando || !titulo.trim() ? "#f0d9cc" : "#f7c5a0",
                            color: "#7a3e1e",
                            border: "none",
                        }}
                    >
                        {cargando ? "Generando..." : "Generar"}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div
                        className="rounded-xl px-4 py-3 text-sm"
                        style={{ background: "#fbe4e0", border: "1px solid #f0c3bb", color: "#a14b3a" }}
                    >
                        {error}
                    </div>
                )}

                {/* Loader */}
                {cargando && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#b07850" }}>
                        <span
                            className="inline-block w-4 h-4 rounded-full border-2 animate-spin"
                            style={{ borderColor: "#f0d9cc", borderTopColor: "#f7c5a0" }}
                        />
                        Generando borrador...
                    </div>
                )}

                {/* Resultado */}
                {borrador && (
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{ background: "#fdf6f0", border: "1px solid #f0d9cc" }}
                    >
                        <div
                            className="flex items-center justify-between px-5 py-3"
                            style={{ background: "#f7c5a0", borderBottom: "1px solid #f0d9cc" }}
                        >
                            <span
                                className="text-xs font-semibold uppercase tracking-wide"
                                style={{ color: "#7a3e1e" }}
                            >
                                Borrador generado
                            </span>
                            <button
                                onClick={copiar}
                                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-transform active:scale-[0.97]"
                                style={{ background: "#fff8f4", color: "#7a3e1e", border: "none" }}
                            >
                                {copiado ? "✓ Copiado" : "Copiar markdown"}
                            </button>
                        </div>

                        <pre
                            className="px-5 py-5 whitespace-pre-wrap text-sm overflow-x-auto"
                            style={{ color: "#6b4f3a", lineHeight: "1.7" }}
                        >
                            {borrador}
                        </pre>
                    </div>
                )}

            </section>
        </main>
    )
}