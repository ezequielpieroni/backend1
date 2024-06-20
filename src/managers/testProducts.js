import productManage from "./productManage.js";

const testProducts = async () => {

  await productManage.addProduct({
    title: "Product 1",
    description: "Description 1",
    code: "123abc",
    price: 500,
    stock: 4,
    category:"product",
    thumbnail: "https://i.imgur.com/75YDdIO.jpg",
    
  });

  await productManage.addProduct({
    title: "Product 2",
    description: "Description 2",
    code: "456abc",
    price: 600,
    stock: 6,
    category: "product",
    thumbnail: "https://i.imgur.com/tDrVHOL.jpg",
  });

  //await productManage.getProducts();

  // const product = await productManage.getProductsById(2);
  // console.log(product);

  //const updatedProduct = await productManage.updateProduct(1, {price:200, description: "Esta es una nueva descripción"});
  //console.log(updatedProduct);

  // const products = await productManage.deleteProduct(2);
  // console.log(products);

};

testProducts();


