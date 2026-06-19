import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI,
})

export async function POST(request: Request){
    const {titulo} = await request.json()

    if(!titulo?.trim()){
        return Response.json({error: "El titulo es requerido"}, {status:400})
    }

    const completion = await openai.chat.completions.create({
        model:"gpt-4o-mini",
        messages:[
            {
                role: "system",
                content: "Eres un escritor experto en blogs de productos de maquillaje. Genera borradores completos y bien estructurados con formatos markdown",
            },
            {
                role: "user",
                content: `Escribe un borrador completo de blog en markdown para el titulo: "${titulo}".
                Incluye: introduccion atractiva, al menos 3 secciones con subtitulos H2, ejemplos practicos y una conclusion`
            },
        ],
    });

    console.log(completion)

    const borrador = completion.choices[0].message.content ?? "";
     return Response.json({borrador})
}