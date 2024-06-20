export const checkProductData = async (req, res, next) => {
    try {
      const { title, description, code, price, status, stock, category} = req.body
      const newProduct = {
        title, 
        description, 
        code, 
        price,
        status,
        stock, 
        category, 
      }
  
      if(Object.values(newProduct).includes(undefined))
        return res.status(400).json({ status: "error", msg: "Campos de producto incompleto" })
      next(); //continúa la ejecución
  
    } catch (error) {
      console.log(`${error}`);
      res.status(500).json({ status: "error", msg: "Error interno del servidor" })
    }
  }