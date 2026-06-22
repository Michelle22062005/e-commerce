export const createFavorite = async (
  userId: string,
  productId: string,
) => {
  try {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.data;
  } catch (error) {
    console.error("No se pudieron guardar los favoritos", error);
    throw error
  }
};

export const deleteFavorite = async (userId: string, productId:string) =>{
  try{
    const res = await fetch(`/api/favorites?userId=${userId}&productId=${productId}`,
      {method:"DELETE"}
    );
    const data = res.json();
    //if (!res.ok) throw new Error(data.error)
      return data
  }catch(error){
    console.error("No se pudo eliminar el producto favorito", error)
    throw error
  }
}

export const getFavorite = async (userId: string)=>{
  try{
    const res = await fetch(`/api/favorites?userId=${userId}`);
    const data = await res.json()
    return data.data

  }catch(error){
    console.error("No se pudieron traer los productos favoritos")
    return [];
  }
}
