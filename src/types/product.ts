export interface IProductCard {
 _id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  createdAt: string;
}

// Vista de detalle — incluye campos adicionales no visibles en el listado
export interface IProductDetail extends IProductCard {
  longDescription: string;
  specs: Map<string, string>;
  stock: number;
}