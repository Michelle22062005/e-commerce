"use client"
import { NavbarHome } from "../components/navbar";
import { ProductList } from "../components/ProductList";

export default function Home() {
  return (
    <>
   <NavbarHome/> 
    <h1>Pagina Principal</h1>
    <ProductList/>
    
    </>
  );
}
