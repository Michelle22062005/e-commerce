import { conectionDB } from "@/src/lib/database";
import { Product } from "@/src/database/models/product";

export async function GET(){
    try{
        await conectionDB();
    const data = await Product.find();
    console.log(data)

    return Response.json({
        data:data,
        code:200,
        message:"El servicio contesto"
    })
    }catch(error){
        console.error("[GET /products]", error);
    return Response.json(      // ← siempre retornar algo
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    }
}