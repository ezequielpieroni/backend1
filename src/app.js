import express from "express"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import handlebars from "express-handlebars"
import __dirname from "./dirname.js"
import viewRoutes from "./routes/views.routes.js"
import { Server } from "socket.io"

const port = 8080;
const app = express();

//Handlebars
app.engine("handlebars", handlebars.engine()) //Inicia el motor de la plantilla
app.set("views", __dirname + "/views")//Indica la ruta de las vistas
app.set("view engine", "handlebars")//Indica que motor de plantilla vamos a usar

//Middleware
app.use(express.json())  //archivos json
app.use(express.urlencoded({ extended: true })) //caracteres especiales como acentos  
app.use(express.static("public")) // archivos estáticos

app.use("/api", productsRouter)
app.use("/api", cartRouter)
app.use("/", viewRoutes)

const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
})

//Websocket
  //on: escuchar
  //emit: enviar

export const io = new Server(httpServer)



io.on("connection", (socket) => {
  // console.log(`Nuevo cliente conectado ${socket.id}`);
}) 
 



























































// let messages = []
// let products = []

// //---------------CHAT----------

//   socket.on("newUser", (data) => {
//     console.log(data);
//     socket.broadcast.emit("newUser", data)
//   })

//   socket.on("message", (data) => {
//     //Recibimos el mensaje del usuario
//     messages.push(data)
//     //Enviar a todos los usuarios
//     io.emit("messageLog", messages)
//   })


// //-----------AGREGAR PRODUCTOS-------------------


//   socket.on("product", (data) => {
//     products.push(data)
//     io.emit("products", products)
//   })

//   socket.on("changeStock", (data) => {
//     products = data
//     io.emit("products", products)
//   })

// })












