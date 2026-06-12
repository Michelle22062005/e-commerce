import { Star } from "@gravity-ui/icons"
import { Avatar, Card, ToggleButton } from "@heroui/react"
import { getProduct } from "../services/productService"
import { useEffect, useState } from "react"
import { IProductCard } from "../types/product"

// interface productProps{
//   name: string,
//   imageUrl:string
//   price:string
// }

export const ProductCard= ({name,imageUrl,price}:IProductCard)=>{
  // const [productList, setProductList ]= useState<IProductCard>()
  const [isFav, setIsFav] = useState(false);

  // const fetchData= async()=>{
  //   const product=await getProduct()
  //   setProductList(product)
  //   console.log(product.name)
  // }
  // useEffect(()=>{
  //   fetchData()
  //   console.log("cargo la carta")
  //   console.log(productList)
  // },[])
  
    return(
        <div>
  <Card className="w-[200px] gap-2" style={{ background: "#fdf6f0", borderRadius: "20px", border: "0.5px solid #f0d9cc", padding: "14px" }}>
    
    {/* Imagen + estrella */}
    <div className="relative">
      <img
        alt={name}
        className="w-full h-[150px] rounded-[14px] object-cover pointer-events-none select-none"
        loading="lazy"
        src={imageUrl}
      />
      <div className="absolute top-2 right-2">
       <ToggleButton
  isIconOnly
  isSelected={isFav}
            onChange={setIsFav}
  aria-label="Agregar a favoritos"
  className="w-8 h-8 rounded-full border-none"
  style={{ background: "rgba(255,255,255,0.85)" }}
>
  {({ isSelected }) => (
    <Star
      className="w-[18px] h-[18px]"
      style={{ color: isSelected ? "#e8a44a" : "#c4a98a" }}
    />
  )}
</ToggleButton>
      </div>
    </div>

    {/* Info */}
    <Card.Header className="px-0.5 py-0 flex flex-col items-start gap-0.5">
      <Card.Title style={{ fontSize: "15px", color: "#6b4f3a" }}>
        {name}
      </Card.Title>
      <Card.Description style={{ fontSize: "13px", color: "#b07850" }}>
        {/* ${price.toLocaleString("es-CO")} */}
        {price}
      </Card.Description>
    </Card.Header>

    {/* Botón */}
    <button
      className="w-full py-2 text-sm font-medium rounded-xl transition-transform active:scale-[0.97]"
      style={{ background: "#f7c5a0", color: "#7a3e1e", border: "none" }}
    >
      Agregar al carrito
    </button>

  </Card>
</div>
    )
}
