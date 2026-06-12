"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CloseButton, TextArea } from "@heroui/react";
import { IProductDetail } from "@/src/types/product";


// eslint-disable-next-line @next/next/no-async-client-component
const DetailsProducts = () => {
   const [todo, setTodo] = useState<IProductDetail | null>(null);
   const { _id } = useParams();
   const router=useRouter()
   
  


  const fetchData = async () => {
    const res = await fetch(`/api/product/${_id}`);
    
    console.log("status", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("error", errorText);
      return;
    }
    const data = await res.json();

    console.log("data", data.data);

    setTodo(data.data);
  };
  const backTo=()=>{
    router.push("/")
  }

  useEffect(() => {
    if (!_id) return;
    fetchData();
  }, [_id]);

  console.log("muestra", todo);

 

  return (
    <div className="flex flex-col gap-5 m-5 max-w-3xl mx-auto">

  {/* Botón volver */}
  <button
    onClick={backTo}
    className="self-start text-sm font-medium px-4 py-2 rounded-xl transition-transform active:scale-[0.97]"
    style={{ background: "#f7c5a0", color: "#7a3e1e", border: "none" }}
  >
    ← Volver
  </button>

  <Card
    style={{
      background: "#fdf6f0",
      borderRadius: "20px",
      border: "0.5px solid #f0d9cc",
      padding: "24px",
      gap: "20px",
    }}
  >
    {/* Imagen grande */}
    <div className="relative w-full h-[320px] rounded-[16px] overflow-hidden">
      <img
        alt={todo?.name}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        loading="lazy"
        src={todo?.imageUrl}
      />
    </div>

    {/* Info principal */}
    <Card.Header className="px-0 py-0 flex flex-col gap-1">
      <Card.Title style={{ fontSize: "26px", color: "#6b4f3a" }}>
        {todo?.name}
      </Card.Title>
      <p style={{ fontSize: "13px", color: "#c4a98a" }}>{todo?.slug}</p>
      <p style={{ fontSize: "22px", fontWeight: "600", color: "#b07850" }}>
        ${todo?.price?.toLocaleString("es-CO")}
      </p>
    </Card.Header>

    {/* Divider */}
    <div style={{ borderTop: "1px solid #f0d9cc" }} />

    {/* Descripción corta */}
    <div className="flex flex-col gap-1">
      <p style={{ fontSize: "13px", fontWeight: "600", color: "#6b4f3a" }}>
        Descripción
      </p>
      <p style={{ fontSize: "13px", color: "#b07850", lineHeight: "1.6" }}>
        {todo?.shortDescription}
      </p>
    </div>

    {/* Descripción larga */}
    <div className="flex flex-col gap-1">
      <p style={{ fontSize: "13px", fontWeight: "600", color: "#6b4f3a" }}>
        Detalles
      </p>
      <p style={{ fontSize: "13px", color: "#b07850", lineHeight: "1.6" }}>
        {todo?.longDescription}
      </p>
    </div>

    {/* Divider */}
    <div style={{ borderTop: "1px solid #f0d9cc" }} />

    {/* Specs */}
    <div className="flex flex-col gap-2">
      <p style={{ fontSize: "13px", fontWeight: "600", color: "#6b4f3a" }}>
        Especificaciones
      </p>
      {todo?.specs &&
        Object.entries(todo.specs).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span style={{ color: "#6b4f3a", textTransform: "capitalize" }}>
              {key.replace(/_/g, " ")}
            </span>
            <span style={{ color: "#b07850" }}>{value}</span>
          </div>
        ))}
    </div>

    {/* Divider */}
    <div style={{ borderTop: "1px solid #f0d9cc" }} />

    {/* Footer: stock + botón */}
    <div className="flex items-center justify-between">
      <span style={{ fontSize: "13px", color: "#c4a98a" }}>
        Stock disponible:{" "}
        <strong style={{ color: "#6b4f3a" }}>{todo?.stock}</strong>
      </span>
      
    </div>
  </Card>
</div>
  );
};

export default DetailsProducts;