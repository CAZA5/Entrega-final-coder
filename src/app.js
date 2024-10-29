import express from "express";
import exphbs from "express-handlebars"

const PORT = 8080;
//Routers
import productsRouter from "./routes/prodcuts.routes.js";


const app = express();

app.use(express.static("public"));
//handlebars
//motores de plantillas
//configurar handlebars
app.engine("handlebars", exphbs.engine())
//renderizar con handlebars
app.set("view engine", "handlebars")
//ubicación de archivos handlebars
app.set("views", "views")
//recibir json
app.use(express.json())
//recibir datos complejos
app.use(express.urlencoded({extended:true}))
app.get("/", (req, res)=>{
    res.send("App running");
})

//Routers
app.use("/", productsRouter);

app.listen(PORT, ()=>{
    console.log(`Corriendoe en puerto http://localhost:${PORT}`);
})



//creado por guillermo cázares ramos caza5





