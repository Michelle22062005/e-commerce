
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