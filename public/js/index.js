const socket = io();

const productsList = document.getElementById("productsList");
const addForm = document.getElementById("addForm");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const deleteForm = document.getElementById("deleteForm");

//-------------Recibir productos---------------

socket.on("products", (data) => {

  console.log(data);
  productsList.innerHTML = "";

  data.forEach((product) => {

    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("m-4");
    card.innerHTML = `
      <div class="card-body m-2">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">ID: ${product.id}</p>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.price}</p>
      </div>
    `;

    productsList.appendChild(card);

  });
});

//------------Enviar producto------------------

addForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title.value, price: price.value, description: description.value }),
  });

});

//-----------Eliminar productos--------------------

deleteForm.addEventListener("submit", async (event) => {

  event.preventDefault();
  const id = document.getElementById("id");
  console.log(id.value);
  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id.value }),
  });

});




























// //---------CHAT------------
// let message= document.getElementById("message")
// let messageLog= document.getElementById("messageLog")
// let user
// Swal.fire({
//   title: "Identificate",
//   input: "text",
//   text: "Ingresa el usuario para identificarse en el chat",
//   inputValidator: (value) => {
//     return !value && "Por favor ingrese el nombre de usuario"
//   },
//   allowOutsideClick: false
// }).then((result) => {
//   user = result.value
//   socket.emit("newUser", user) // Enviamos el usuario conectado al servidor
// })

// message.addEventListener("keyup", (event) => {
//   if (event.key === "Enter" && message.value.trim().length > 0) {
//     socket.emit("message", { user: user, message: message.value})
//     message.value = ""
//   }
// })

// socket.on("messageLog", (data) => {

//   let messages = ""

//   data.forEach( userMessage => {
//     messages = messages + `${userMessage.user} dice: ${userMessage.message} </br>`
//   })

//   messageLog.innerHTML = messages

// })

// socket.on("newUser", (data) => {
//   Swal.fire ({
//     text: `Se conectó ${data}`,
//     toast: true,
//     position: "top-right",
//     timer: 2000
//   })
// })


// //--------AGREGAR PRODUCTOS-----------------


// const form = document.getElementById("form")
// const productList = document.getElementById("productList")


// form.addEventListener("submit", (event) => {

//   event.preventDefault()
//   const title = event.target.elements.title.value
//   const price = event.target.elements.price.value
//   const stock = event.target.elements.stock.value

//   const newProduct = {
//     title,
//     price,
//     stock
//   }

//   socket.emit("product", newProduct)
// })

// socket.on("products", (data) => {
//   productList.innerHTML = "";
//   data.forEach((product, i) => {
//     const div = document.createElement("div")
//     div.classList.add("card")
//     div.innerHTML = `
//       <p>Título: ${product.title}</p>
//       <p>Precio: ${product.price}</p>
//       <p>Stock: ${product.stock}</p>
//     `
//     productList.append(div)

//     const btn = document.createElement("button")
//     btn.innerText = "Comprar"
//     btn.onclick = () => {
//       console.log("comprando");
//       data[i].stock = data[i].stock - 1
//       socket.emit("changeStock", data)
//     }
//     div.append(btn)
//   });
// })



