import mongoose from "mongoose";
export const conectionDB= async ()=>{
    try{
        console.log("URI:", process.env.DATABASE);
        const DBConection = process.env.DATABASE
        await mongoose.connect(`${DBConection}`)
    }catch(error){
        console.error(error)
    }
}