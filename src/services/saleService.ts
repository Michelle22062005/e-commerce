interface ISaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export const createSale = async (
  userId: string,
  items:ISaleItem[],
  total:number
) => {
  try {
    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items, total }),
    });
    const data = await res.json();
     if (!res.ok) throw new Error(data.error);
     return data.data
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const getSale = async(userId:string)=>{
    try{
        const res = await fetch(`/api/sales?userId=${userId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.data;
    }catch(error){
        console.error("Error al traer el historial de ventas", error);
    throw error;
    }
}
