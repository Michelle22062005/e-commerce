import { Sale } from "@/src/database/models/sales";
import { conectionDB } from "@/src/lib/database";

export async function POST (req:Request ){
    try{
        await conectionDB();

        const body = await req.json();
        const {userId, items, total} = body;

        if(!userId || !items || !total){
            return Response.json(
                   { error: "Faltan datos requeridos" },
        { status: 400 }
            )
        }
        const sale = await Sale.create({userId, items, total });
          return Response.json({
      data: sale,
      code: 201,
      message: "Venta registrada correctamente",
    }, { status: 201 });
    }catch(error){
        console.error(error);
        return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    }
}

export async function GET(req: Request) {
  try {
    await conectionDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { error: "userId es requerido" },
        { status: 400 }
      );
    }

    const sales = await Sale.find({ userId }).sort({ createdAt: -1 });

    return Response.json({
      data: sales,
      code: 200,
      message: "Historial de ventas",
    });

  } catch (error) {
    console.error("[GET /sales]", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}