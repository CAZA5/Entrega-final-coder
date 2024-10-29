import {Router} from "express";
import mongoose from "mongoose";
import productsModel from "../../models/products.model.js";

//conexion de base de datos
mongoose.connect("mongodb+srv://gdcaza33:coderhouse@cluster0.44duz.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Conexión exitosa con base de datos")
    })
    .catch((error)=>{
        console.error("Error al conectarse a la base de datos")
        console.log(error)
    })

const productsRouter = Router();
//rutas de producto

//ver productos
productsRouter.get("/products", async(req, res)=>{
    const productos = await productsModel.find().lean()
    res.render("index", {productos})

})

//crear un producto
productsRouter.post("/addProduct", (req, res)=>{
    const {name, descripcion, precio, sku, stock} = req.body
    let Datosproducto = {
        name,
        descripcion,
        precio,
        sku,
        stock
    }
    const producto = new productsModel(Datosproducto)
    producto.save()
    console.log("producto creado con exito")
    res.redirect("http://localhost:8080/products")
})

//ver producto por id
productsRouter.get("/products/:id", async(req, res)=>{
    const ProductId = req.params.id;
    const product = await productsModel.findById(ProductId).lean()
    const delet = req.body
    console.log(delet)
    res.send(product)
})

productsRouter.post("/products/delete", async(req, res)=>{
    const delet = req.body;
    let key = Object.keys(delet)[0]
    console.log(key)
    try{
      await productsModel.findByIdAndDelete(key)
      console.log("operacion realizada")
    }
    catch(error){
        console.log(error)
        console.log("operación no realizada")
    }
    
    res.redirect("http://localhost:8080/products")
})

//ver productos
productsRouter.get("/api/products", async(req, res)=>{
    const productos = await productsModel.find().lean()
    res.send({productos})

})

//actualizar produyctos vistas
productsRouter.get("/products/actualizar/view",(req, res)=>{
    res.render("update")
})

//actualizar prodcuto post
productsRouter.post("/products/actualizar", async(req, res)=>{
    const delet = req.body;
    let key = Object.keys(delet)[6]
    console.log(key)
    //datos de prodcuto
    const {name, descripcion, precio, sku, stock,_id} = req.body
    let Datosproducto = {
        name,
        descripcion,
        precio,
        sku,
        stock
    }
    try{
        await productsModel.findByIdAndUpdate(key, Datosproducto)
    }
    catch(error){
        console.log("No se puede actualizar")
        console.log(error)
    }
    

    
    res.redirect("http://localhost:8080/products")
})


export default productsRouter;
