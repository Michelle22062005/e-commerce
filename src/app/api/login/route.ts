import { conectionDB } from "@/src/lib/database";
import { User } from "@/src/database/models/user";

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