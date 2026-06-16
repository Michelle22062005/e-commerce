import { NextRequest } from "next/server";

export async function POST(request:NextRequest){

    const formData = await request.formData();

    const title = formData.get('title') as string
    const description= formData.get('description') as string
    const img =formData.get('img') as File | null

    console.log(title);
    console.log(description);
    console.log(img)
    return Response.json({
        code:200,
        data:{
            name:"si responde",
            title: title,
        }
    })

}