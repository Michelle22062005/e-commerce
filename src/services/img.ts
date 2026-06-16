import axios from "axios"

export const postImg = async (title:string, description:string, file: File)=>{
    try{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("img", file);

        const res = await axios.post("/api/img", formData)

        return res
        
    }catch(error){
        console.error(error)
    }

}