import { Product } from "@/src/database/models/product";
import { conectionDB } from "@/src/lib/database";

export async function GET(
    request:Request,
    {params}:{ params:Promise<{_id:string}>}
){
    await conectionDB();
    const {_id}= await params;

    const datos = await Product.findById(_id).lean();
    console.log("Resultado: ",datos);

    return Response.json({
        data:{
            ...datos,
            _id: datos?._id.toString()
        },
        code:200,
        message:"El servidor contesto"
    })
}