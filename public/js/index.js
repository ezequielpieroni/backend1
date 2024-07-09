const socket = io()

//---------CHAT------------
let message= document.getElementById("message")
let messageLog= document.getElementById("messageLog")
let user
Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa el usuario para identificarse en el chat",
  inputValidator: (value) => {
    return !value && "Por favor ingrese el nombre de usuario"
  },
  allowOutsideClick: false
}).then((result) => {
  user = result.value
  socket.emit("newUser", user) // Enviamos el usuario conectado al servidor
})

message.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && message.value.trim().length > 0) {
    socket.emit("message", { user: user, message: message.value})
    message.value = ""
  }
})

socket.on("messageLog", (data) => {

  let messages = ""

  data.forEach( userMessage => {
    messages = messages + `${userMessage.user} dice: ${userMessage.message} </br>`
  })

  messageLog.innerHTML = messages

})

socket.on("newUser", (data) => {
  Swal.fire ({
    text: `Se conectó ${data}`,
    toast: true,
    position: "top-right",
    timer: 2000
  })
})


//-------------------------


const form = document.getElementById("form")
const productList = document.getElementById("productList")


form.addEventListener("submit", (event) => {

  event.preventDefault()
  const title = event.target.elements.title.value
  const price = event.target.elements.price.value
  const stock = event.target.elements.stock.value

  const newProduct = {
    title,
    price,
    stock
  }

  socket.emit("product", newProduct)
})

socket.on("products", (data) => {
  productList.innerHTML = "";
  data.forEach((product, i) => {
    const div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = `
      <p>Título: ${product.title}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: ${product.stock}</p>
    `
    productList.append(div)

    const btn = document.createElement("button")
    btn.innerText = "Comprar"
    btn.onclick = () => {
      console.log("comprando");
      data[i].stock = data[i].stock - 1
      socket.emit("changeStock", data)
    }
    div.append(btn)
  });
})



