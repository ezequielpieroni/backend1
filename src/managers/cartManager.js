import fs from "fs";
import { v4 as uuid } from "uuid";

let carts = []

const path = "./src/managers/data/carts.json"


//Obtener carritos
const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(path, "utf-8")
  carts = JSON.parse(cartsJson) || []

  return carts;
}

//Crear carrito
const createCart = async () => {
  await getCarts()
  const newCart = {
    id: uuid(),
    products: []
  }

  carts.push(newCart)
  await fs.promises.writeFile(path, JSON.stringify(carts))
  return newCart
}


//Obtener carrito por ID
const getCartsById = async (cid) => {
  try {

    await getCarts()
    const cart = carts.find(c => c.id === cid)
    return cart;

  } catch (error) {
    console.log(`${error}`);
  }
}


//Agregar producto al carrito
const addProductToCart = async (cid, pid) => {
  try {

    await getCarts()
    const cart = await getCartsById(cid)


    //Verifica si el producto ya existe en el carrito
    const existingProduct = cart.products.find(p => p.product === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      //Agrega el nuevo producto al carrito
      const product = {
        product: pid,
        quantity: 1
      };
      cart.products.push(product);
    }

    await fs.promises.writeFile(path, JSON.stringify(carts))
    return carts;

  } catch (error) {
    console.log(`${error}`);
  }
}


export default {
  createCart,
  getCartsById,
  addProductToCart
}