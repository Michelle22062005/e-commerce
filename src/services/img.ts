import axios from "axios"

export interface imgProps{
  title: string;
  description: string;
  img: File | null;
}
export const postImg = async (title:string, description:string, img: File | null)=>{
    try{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("img", img);

        const res = await axios.post("/api/img", formData)

        return res
        
    }catch(error){
        console.error(error)
    }

}