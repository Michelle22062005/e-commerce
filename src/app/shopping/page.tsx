"use client";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShoppingPage() {
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const router = useRouter();

  // Proteger la ruta
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  const handleCompra = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: cart.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      if (!res.ok) throw new Error("Error al registrar la venta");

      clearCart();
      alert("¡Compra realizada con éxito!");
      router.push("/products");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar la compra");
    }
  };

  return (
    <div className="flex flex-col gap-5 m-5 max-w-2xl mx-auto">
      <h1 className="text-2xl" style={{ color: "#6b4f3a" }}>
        Mi carrito
      </h1>
      <Button onPress={()=>{router.push("/")}}>Volver</Button>
      {cart.length === 0 ? (
        <p style={{ color: "#b07850" }}>Tu carrito está vacío.</p>
      ) : (
        <>
          {/* Lista de items */}
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 p-4 rounded-[16px]"
                style={{ background: "#fdf6f0", border: "0.5px solid #f0d9cc" }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-[10px] object-cover"
                />

                <div className="flex flex-col flex-1 gap-1">
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#6b4f3a" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "13px", color: "#b07850" }}>
                    ${item.price.toLocaleString("es-CO")}
                  </p>
                </div>

                {/* Cantidad */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-7 h-7 rounded-full text-sm font-bold"
                    style={{ background: "#f7c5a0", color: "#7a3e1e", border: "none" }}
                  >
                    −
                  </button>
                  <span style={{ color: "#6b4f3a", minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 rounded-full text-sm font-bold"
                    style={{ background: "#f7c5a0", color: "#7a3e1e", border: "none" }}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#6b4f3a", minWidth: "70px", textAlign: "right" }}>
                  ${(item.price * item.quantity).toLocaleString("es-CO")}
                </p>

                {/* Eliminar */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ background: "#f0d9cc", color: "#7a3e1e", border: "none" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #f0d9cc" }} />

          {/* Total y botones */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p style={{ fontSize: "13px", color: "#c4a98a" }}>Total</p>
              <p style={{ fontSize: "20px", fontWeight: "700", color: "#6b4f3a" }}>
                ${total.toLocaleString("es-CO")}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="px-4 py-2 text-sm rounded-xl"
                style={{ background: "#f0d9cc", color: "#7a3e1e", border: "none" }}
              >
                Vaciar carrito
              </button>
              <button
                onClick={handleCompra}
                className="px-6 py-2 text-sm font-medium rounded-xl transition-transform active:scale-[0.97]"
                style={{ background: "#f7c5a0", color: "#7a3e1e", border: "none" }}
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}