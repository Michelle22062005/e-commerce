"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/src/components/ProductCard";
import { IProductCard } from "@/src/types/product";
import { getProduct } from "@/src/services/productService";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";

export default function PageFavorites(){
  const { favorites} = useAuth()
  const { data:session } = useSession();
    const router= useRouter();
    const [products, setProducts]= useState<IProductCard[]>([])
    //Proteger la ruta
    useEffect(()=>{
        if(!session){
            router.push("/login")
        }
    },[session])
    

    //Traer productos y filtrar favoritos
    useEffect(()=>{
        if(!session) return;


        getProduct().then((data: IProductCard[])=>{
            const favProducts = data.filter((p) => favorites.includes(p._id));
            setProducts(favProducts)
        })
    },[favorites, session])

    const back=()=>{
        router.back()
    }
    if(!session) return null
    return(
         <div className="flex flex-col gap-5 m-5">
      <h1 className="text-2xl" style={{ color: "#6b4f3a" }}>Mis favoritos</h1>
      <Button onPress={back}>Volver</Button>

      {products.length === 0 ? (
        <p style={{ color: "#b07850" }}>No tienes productos en favoritos aún.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
    )
}