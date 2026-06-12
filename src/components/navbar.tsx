import { Button, Card } from "@heroui/react"
import Link from "next/link"
import {ShoppingCart} from '@gravity-ui/icons';
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";




export const NavbarHome = ()=>{
  const {user, logout}=useAuth()
  const router= useRouter()

  const login=()=>{
    router.push("/login")
  }
  return(
 <nav className="flex items-center justify-between px-10 py-3 bg-white border-b border-gray-200">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">
          DHB-TECH SHOP
        </h1>
      </div>

      {/* Menú */}
      <ul className="flex gap-10 text-gray-600 font-medium">
        <li>
          <Link
            href="/"
            className="text-blue-600 border-b-2 border-blue-600 pb-1"
          >
            Catalog
          </Link>
        </li>
        <li>
          <Link href="/favorites">Favorites</Link>
        </li>
        {/* <li>
          <Link href="/orders">Orders</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li> */}
      </ul>

      {/* Acciones */}
      <div className="flex items-center gap-6">
        {/* Idioma */}
        <button className="text-blue-600 text-xl">
          🌐Idioma
        </button>

        {/* Carrito */}
        <ShoppingCart width={40} height={40} className="text-blue-600" />
        {user ? (
          <div className="flex items-center gap-4">
           <span className="text-black">Hola, {user.name}</span>
          <ShoppingCart width={40} height={40} className="text-blue-600" />
          <Button variant="danger" onClick={logout}>Salir</Button>
        </div>
        ) : (
          <Button onPress={login}>Iniciar sesion</Button>
        )}
        
{/* 
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
              
              

            </div> */}
        {/* Usuario */}
        {/* <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-blue-600 text-blue-600">
            👤
          </div>
          <span className="text-gray-700">Alex Dev</span>
        </div> */}
      </div>
    </nav>
  
  )
}

