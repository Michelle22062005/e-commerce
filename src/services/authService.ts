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
                "Content-Type":"aplication/json"
            },
            body:JSON.stringify({email,password})
        })
    }catch(error){
        console.error(error)
    }
}