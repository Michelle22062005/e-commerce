// ProductList.tsx — el padre hace el fetch y renderiza la lista
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getProduct } from "../services/productService";
import { IProductCard } from "../types/product";

export const ProductList = () => {
  const [products, setProducts] = useState<IProductCard[]>([]);

  useEffect(() => {
    getProduct().then((data) => setProducts(data ?? []));
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}