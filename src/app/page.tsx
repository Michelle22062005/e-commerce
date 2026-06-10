"use client"
import { NavbarHome } from "../components/navbar";
import { ProductCard } from "../components/ProductCard";

export default function Home() {
  return (
    <>
   <NavbarHome/> 
    <h1>Pagina Principal</h1>
    <ProductCard/>
    
    </>
  );
}
