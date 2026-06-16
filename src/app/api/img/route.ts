import { NextRequest } from "next/server";
import { uploadTocCloudinary } from "../../helpers/uploadImg";
import Files from "@/src/database/models/files";
import { conectionDB } from "@/src/lib/database";

export async function POST(request:NextRequest){

    const formData = await request.formData();

    const title = formData.get('title') as string
    const description= formData.get('description') as string
    const img = formData.get('img') as File | null

    if(!img) return Response.json({ code: 400, error: 'No image provided' }, { status: 400 })
        const imgBuffer = Buffer.from(await img.arrayBuffer())

    //enviar a cloudinary
    const respCloudinary = await uploadTocCloudinary(imgBuffer, title)

    conectionDB()
    //Guardar en DB
    const newFile = new Files({
        title,
        description,
        fileUrl: respCloudinary
    })
    await newFile.save()
   
    return Response.json({
        code:200,
        data:{
            name:"si responde",
            title: title,
        }
    })

}