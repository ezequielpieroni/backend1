import { Router } from "express";
import productManage from "../managers/productManage.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";

const router = Router();


//Obtener productos
router.get("/products", async (req, res) => {
  const limit = req.query.limit
  const products = await productManage.getProducts(limit)
  //console.log(products);
  res.send(products)
})


//Obtener productos por ID 
router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const product = await productManage.getProductsById(pid)
    if (!product) return res.status(404).json({ status: "error", msg: "Producto no encontrado" })

    res.status(200).json({ status: "ok", msg: product })
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" })
  }
})

//Update productos
router.put("/products/:pid", async (req, res) => {
  try {

    const { pid } = req.params
    const body = req.body

    const products = await productManage.getProducts()
    const product = products.find(prod => prod.id === pid)

    if (!product) return res.status(404).json({ status: "error", msg: "Producto no encontrado" })

    const productUpdated = await productManage.updateProduct(pid, body)

    res.status(200).json({ status: "ok", msg: productUpdated })
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" })
  }

})

//Agregar productos
router.post("/products", checkProductData, async (req, res) => {
  try {
    const body = req.body
    const product = await productManage.addProduct(body)

    res.status(201).json({ status: "ok", product })

  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" })
  }
})

//Borrar productos
router.delete("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const product = await productManage.getProductsById(pid)

    if (!product) return res.status(404).json({ status: "error", msg: "Producto no encontrado" })

    await productManage.deleteProduct(pid)
    res.status(200).json({ status: "ok", msg: `Producto id: ${pid} eliminado con éxito` })

  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" })
  }
})


export default router;