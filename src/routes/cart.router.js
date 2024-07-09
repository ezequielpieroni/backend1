import { Router } from "express";
import cartManager from "../managers/cartManager.js";
import productManage from "../managers/productManage.js";

const router = Router();

router.post("/carts", async (req, res) => {
  try {

    const cart = await cartManager.createCart()
    res.status(201).json({ status: "ok", cart })

  } catch (error) {

    console.log(`${error}`);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" })
  }
})


router.get("/carts/:cid", async (req, res) => {
  try {

    const { cid } = req.params
    const cart = await cartManager.getCartsById(cid)

    if (!cart) return res.status(404).json({ status: "error", msg: "Carrito no encontrado" })

    res.status(201).json({ status: "ok", cart })

  } catch (error) {

    console.log(`${error}`);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" })
  }
})



//Agregar producto al carrito
router.post("/carts/:cid/product/:pid", async (req, res) => {
  try {

    const { cid, pid } = req.params
    
    // Verifica si el carrito existe
    const cart = await cartManager.getCartsById(cid)
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ status: "error", msg: "Carrito no encontrado" });
    }

    // Verifica si el producto existe
    const product = await productManage.getProductsById(pid);
    if (!product) {
      return res.status(404).json({ status: "error", msg: "Producto no encontrado" });
    }

    const cartAdd = await cartManager.addProductToCart(cid, pid)
    res.status(201).json({ status: "ok", cartAdd })

  } catch (error) {

    console.log(`${error}`);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" })
  }
})

export default router;