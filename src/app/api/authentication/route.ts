import { conectionDB } from "@/src/lib/database";
import  { User } from "@/src/database/models/user";
import bcrypt from "bcryptjs";

export async function GET(){
    try{
        await conectionDB();
        const datas = await User.find().select("-password -__v")
        console.log(datas)
        return Response.json({
            data:datas,
            code:200,
            message:"El servicio contesto"
        })
    }catch(error){
        console.error("[GET /users]", error);
    return Response.json(      // ← siempre retornar algo
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    }
}

export async function POST(req:Request){
    try{
        await conectionDB();
        const body = await req.json();
        console.log("BODY RECIBIDO", body)
        const hashedPassword = await bcrypt.hash(body.password, 10)
        // const {name, email, password} = body;
        const newUser=await User.create({
            // id:body.id,
            name:body.name,
            email:body.email,
            password:hashedPassword
        })

        // const user = await User.find({email})
        // if(!user){
        //     return Response.json({error:"Credenciales incorrectas email"},{status:401})
        // }

        return Response.json({
            data:newUser,
            code:200,
            message:"El usuario fue creado correctamente"
        })
    }catch(error){
         console.error("[POST /authentication]", error);
        return Response.json({error:"Error al crear el usuario"},{status:500})
    }
}