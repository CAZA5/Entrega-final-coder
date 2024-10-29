import mongoose from "mongoose";

//Esquema de producto
const productSchema = new mongoose.Schema({
    name: String,
    descripcion: String,
    precio: Number,
    thumbnail: String,
    sku: Number,
    stock: Number
})

//modelo
const productsModel = mongoose.model("products", productSchema);

export default productsModel;