import axios from "axios";

export const generarBorradorBlog = async (titulo: string): Promise<string> =>{
    const res = await axios.post("/api/ai/blog-draft", {titulo})

    if(res.status != 200){
        throw new Error("Error al conectar la IA")
    }
    const data = await res.data;
    return data.borrador
}