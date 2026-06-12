
export const getProduct= async () =>{
    try{
        const res = await fetch("/api/product");
        const data = await res.json()
        console.log("TRAE LOS PRODUCTOS------------", data.data)
        return data.data
    }catch(error){
        console.error("No se pudireron traer los productos", error)
    }
}

export const getProductById =async(_id:string)=>{
    try{
        const res = await fetch(`/api/product/${_id}`);
        const data =await res.json()

        console.log("data", data)
        return data
    }catch(error){
        console.error(error)
    }
}