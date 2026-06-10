"use client";

import { login } from "@/src/services/authService";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function PageLogin(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError ]= useState("")

  const handleSubmit =async ()=>{
    setLoading(true);
    if(!email || !password){
        setError("Todos los campos son obligatorios")
        return
      }
      if(password.length < 6){
        setError("La contraseña debe tener 6 caracteres")
      }
    try{
      const result =await login(email, password);
      console.log(result)
      // if(!result.user)
      router.push("/")
    }catch(error){
        setError("Error al iniciar sesión");
        console.error(error)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cfefed]">
  <div className="w-full max-w-md">
    {/* Título */}
    <div className="text-center mb-10">
      <h1 className="text-5xl font-bold text-gray-900">
        Bienvenido de nuevo
      </h1>
      <p className="mt-3 text-gray-500">
        Accede a tu cuenta de DHB-TECH SHOP
      </p>
    </div>

    {/* Card */}
    <div className="bg-white rounded-3xl p-10 shadow-sm">
      <Form
        className="flex flex-col gap-6"
        render={(props) => <form {...props} />}
        onSubmit={onSubmit}
      >
        <TextField isRequired name="email" type="email">
          <Label className="text-gray-600 font-medium">
            Email
          </Label>
          <Input
            placeholder="nombre@ejemplo.com"
            value={email}
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            className="mt-2 h-14 rounded-xl bg-gray-100 border-0"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          type="password"
        >
          <div className="flex justify-between">
            <Label className="text-gray-600 font-medium">
              Contraseña
            </Label>

            <button
              type="button"
              className="text-indigo-500 text-sm font-medium"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Input
            placeholder="••••••••"
            value={password}
            type="text"
            onChange={(e)=> setPassword(e.target.value)}
            className="mt-2 h-14 rounded-xl bg-gray-100 border-0"
          />

          <FieldError />
        </TextField>

        <Button
          type="submit"
          onClick={handleSubmit}
        isDisabled={loading}
          className="mt-4 h-14 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          {loading ? "Cargando..." : "Iniciar Sesión →"}
          
        </Button>

        {/* Separador */}
        <div className="flex items-center gap-4 my-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">
            O CONTINUAR CON
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Login social */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            className="h-14 rounded-xl bg-green-50 text-green-700"
          >
            Google
          </Button>

        </div>

        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="font-semibold text-indigo-600"
          >
            Crear una cuenta
          </a>
        </p>
      </Form>
    </div>
  </div>
</div>
  );
}