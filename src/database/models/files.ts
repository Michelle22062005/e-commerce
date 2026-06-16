import { Schema, model, Model } from "mongoose";

const filesSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title is required"],
    },
    description: {
        type: String,
        required: [true, "The state is required"],
    },
    fileUrl: {
        type: String,
        required: [true, "The state is required"],
    },
   
}, { collection: "productsFile" });



// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Files: Model<any>;
try {
    // Intenta compilar el modelo solo una vez
    Files = model("productsFile");
} catch (error) {
    // Si el modelo ya está compilado, úsalo
    console.error(error)
    Files = model("productsFile", filesSchema, "productsFile");
}

export default Files;