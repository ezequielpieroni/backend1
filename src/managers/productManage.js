import fs from "fs"
import { v4 as uuid} from "uuid";

const path = "./src/managers/data/products.json"

let products = [];

//Agragar producto
const addProduct = async (product) => {
  try {

    await getProducts()

    const { title, description, code, price, stock, category, thumbnail } = product;
    const newProduct = {
      id: uuid(),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnail,
    }

    products.push(newProduct);
    await fs.promises.writeFile(path, JSON.stringify(products));
    console.log("Producto agregado con éxito");
    
    return newProduct

  } catch (error) {
    console.log(`${error}`);
  }
}


//Leer productos
const getProducts = async (limit) => {
  try {

    const fileJson = await fs.promises.readFile(path, "utf-8")
    const parseFile = JSON.parse(fileJson);
    products = parseFile || [];

    if (limit && !isNaN(limit)) {
      return products.slice(0, parseInt(limit));
    }
    
    return products
  } catch (error) {
    console.log(`${error}`);
  }
}


//Leer Productos por id
const getProductsById = async (id) => {
  try {
    await getProducts()
    const product = products.find(prod => prod.id === id)
    return product;
  } catch (error) {
    console.log(`${error}`);
  }
}


//Actualizar producto
const updateProduct = async (id, productData) => {
  try {
    await getProducts()
    const index = products.findIndex(prod => prod.id === id)
    products[index] = {...products[index], ...productData}

    await fs.promises.writeFile(path, JSON.stringify(products));
    return products[index];

  } catch (error) {
    console.log(`${error}`);
  }
}


//Eliminar producto
const deleteProduct = async (id) => {
  try {
    await getProducts();
    console.log(`Producto borrado:`, products);
    products = products.filter(prod => prod.id !== id)
    await fs.promises.writeFile(path, JSON.stringify(products));
    return products;

  } catch (error) {
    console.log(`${error}`);
  }
}





export default {
  addProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct
}
