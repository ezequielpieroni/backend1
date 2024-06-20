import express from "express";
import productsRouter from "./router/products.router.js";
import cartRouter from "./router/cart.router.js";

const port = 8080;
const app = express();

//Middleware
app.use(express.json())  //archivos json
app.use(express.urlencoded({ extended: true })) //caracteres especiales como acentos  
app.use(express.static("public")) // archivos estáticos

app.use("/api", productsRouter)  
app.use("/api", cartRouter)  

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
})















// app.get("/saludo", (req, res) => {
//   res.send("hola");
// })

// app.get("/usuario", (req, res) => {
//   const user = {
//     name: "Carlos",
//     age: "32",
//     email: "carlos@gmail.com"
//   }
//   res.send(user)
// })

// const usuarios = [
//   { id: 2, nombre: "Juan", edad: 30 },
//   { id: 3, nombre: "Miguel", edad: 42 },
//   { id: 4, nombre: "Jose", edad: 61 }
// ]

// app.get("/usuarios/:id", (req, res) => {
//   const { id } = req.params;
//   const usuario = usuarios.find(user => user.id === Number(id))
//   if (!usuario) return res.send(`No existe usuario con id: ${id}`)
//   res.send(usuario)
// })

// app.get("/parametro/:dato", (req, res) => {
//   const parametro = req.params.dato
//   res.send(`El parametro es: ${parametro}`)
// })


// app.get("/parametros/:nombre/:apellido", (req, res) => {
//   const nombre = req.params.nombre
//   const apellido = req.params.apellido
//   res.send(`Nombre: ${nombre} ${apellido}`)
// })

// app.get("/queries", (req, res) => {
//   const consulta = req.query
//   res.send(consulta)
// })


// app.get("/queries2", (req, res) => {
//   const { nombre, apellido, pais } = req.query
//   const datos = {
//     nombre,
//     apellido,
//     pais
//   }
//   if (Object.values(datos).includes(undefined)) {
//     return res.send("Faltan datos")
//   }

//   res.send(`Bienvenido ${nombre} ${apellido} de ${pais}`)
// })


// const usuarios2 = [
//   { id: 2, nombre: "Juan", edad: 30, genero: "M" },
//   { id: 3, nombre: "Miguel", edad: 42, genero: "M" },
//   { id: 4, nombre: "Jose", edad: 61, genero: "M" },
//   { id: 5, nombre: "Esteban", edad: 70, genero: "M" },
//   { id: 6, nombre: "Marcos", edad: 8, genero: "F" },
//   { id: 7, nombre: "Martin", edad: 15, genero: "F" }
// ]

// app.get("/usuarios2", (req, res) => {

//   const { genero } = req.query;
//   if (!genero || (genero !== "M" && genero !== "F")) {
//     return res.send(usuarios2)
//   }
//   const usuariosFiltrados = usuarios2.filter(usuario => usuario.genero === genero)
//   res.send(usuariosFiltrados)
// })