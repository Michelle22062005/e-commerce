import { Favorite } from "@/src/database/models/favorite";
import { conectionDB } from "@/src/lib/database";
import { error } from "console";

await conectionDB();

export async function GET(req: Request){
    try{
        const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId")

     if (!userId) {
      return Response.json({ error: "userId es requerido" }, { status: 400 });
    }

    const data = await  Favorite.find({ userId}).populate("productId");
    return Response.json({
        data:data,
        code:200,
        message:"El servicio contesto"
    })

    }catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req:Request){
    try{

        const body= await req.json();
        const {userId, productId} = body;

        if(!userId || !productId ){
            return Response.json(
                {error:"Error al guardar los productos favoritos"},
                {status:400}
            )
        }
        const favorite = await Favorite.create({userId, productId, savedAt: new Date()});
        return Response.json({
            data:favorite,
            code: 201,
            message: "Registro de favorito guardado"
        },{status:201});

    }catch(error){
        console.error(error);
        return Response.json(
            {error: "Error interno del servidor"},
            {status: 500}
        )
    }
}

export async function DELETE (req: Request){
    try{
        const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");
        if (!userId || !productId) {
      return Response.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

        //const {_id} = await req.json()
        await Favorite.deleteOne({userId, productId})
        return Response.json({
            code:200, message:"Producto favorito eleminado"
        })

    }catch(error){
        console.error(error)
        return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    }
}