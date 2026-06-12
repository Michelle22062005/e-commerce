export const getUser=async()=>{
    try{
        const res= await fetch("/api/login");
        const data = res.json()
        return data
    }catch(error){
        console.error(error)
    }
}

export const login = async (email:string, password:string)=>{
    try{
        const res=await fetch("/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const data = await res.json();
        // if(res.ok){
        //     localStorage.setItem("user", JSON.stringify(data.user))
        //     return true
        // }
        // return false
         if (!res.ok) {
            throw new Error(data.error || "Credenciales incorrectas");
        }

        return data;
    }catch(error){
        console.error(error)
        throw error
    }
}

export const  createUser = async(name:string, email:string, password:string)=>{
    try{
        const res= await fetch("/api/authentication",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name,email,password})
        });
        const data = await res.json();  // ← agregar esto

        if (!res.ok) {
            throw new Error(data.error || "Error al crear el usuario");
        }

        return data;
    }catch(error){
        console.error("Error al crear el usuario", error)
    }
}