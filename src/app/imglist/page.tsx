"use client"
import { fetchFiles } from "@/src/services/img"
import { useEffect, useState } from "react"

type todoImg={
    title:string,
    description:string,
    fileUrl:File
}

const ImgList = () => {
    const [imgList, setImgList] = useState<todoImg[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchFiles();
            setImgList(res.data)
        }
        fetchData()
    }, [])

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f4f1ec] via-[#fffefa] to-[#e1d8cf] px-4 py-10">
            <div className="mx-auto max-w-6xl rounded-[32px] border border-[#e0d5c9] bg-white/95 p-8 shadow-[0_20px_80px_rgba(156,115,80,0.14)] backdrop-blur-sm">
                <header className="mb-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9c7350]">Galería de imágenes</p>
                    <h1 className="mt-4 text-4xl font-bold text-[#5b4333]">Imágenes cargadas</h1>
                    <p className="mt-2 text-sm leading-6 text-[#6f5c50]">Revisa las imágenes que se han subido al sistema.</p>
                </header>

                {imgList.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-[#d7c8b6] bg-[#faf4ee] px-6 py-20 text-center text-[#7b6a5e]">
                        No hay imágenes para mostrar aún.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {imgList.map((img, index) => (
                            <article key={`${img.title}-${index}`} className="overflow-hidden rounded-[28px] border border-[#e4d8ca] bg-[#fff7f0] shadow-[0_12px_40px_rgba(142,108,83,0.12)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(142,108,83,0.18)]">
                                <div className="relative h-64 w-full overflow-hidden bg-[#f4ece6]">
                                    <img
                                        src={img.fileUrl}
                                        alt={img.title}
                                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-[#4f3b2f]">{img.title}</h2>
                                    <p className="mt-3 text-sm leading-6 text-[#6f5c50]">{img.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default ImgList