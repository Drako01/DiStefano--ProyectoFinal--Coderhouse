//#region Variables principales y Botones
const
    contenedorProductos = d.getElementById('contenedor-productos'),
    contenedorCarrito = d.getElementById('carrito-contenedor'),
    botonVaciar = d.getElementById('vaciar-carrito'),
    contadorCarrito = d.getElementById('contadorCarrito'),
    cantidad = d.getElementById('cantidad'),
    precioTotal = d.getElementById('precioTotal'),
    cantidadTotal = d.getElementById('cantidadTotal'),
    contenedorModal = d.getElementsByClassName('modal-contenedor')[0],
    botonAbrir = d.getElementById('boton-carrito'),
    botonCerrar = d.getElementById('carritoCerrar'),
    modalCarrito = d.getElementsByClassName('modal-carrito')[0];


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')    
})

function botonCerrarFc(){
    contenedorModal.classList.toggle('modal-active')
}


contenedorModal.addEventListener('click', () =>{
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})

let carrito = []

d.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.removeItem('carrito')
    actualizarCarrito()
})

stockProductos.forEach((producto) => {
    const div = d.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
                    <div class="imagen-prod">
                        <img src="${producto.img}" alt= "${producto.nombre}">
                    </div>
                    <h3>${producto.nombre}</h3>
                    <p>${producto.desc}</p>
                    <p>Talle: ${producto.talle}</p>
                    <p class="precioProducto">Precio:$ ${producto.precio}</p>
                    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
                    `

    contenedorProductos.appendChild(div)

    const boton = d.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})
//#endregion

//#region Funciones principales

const agregarAlCarrito = (prodId) => {
    const productExist = carrito.some(prod => prod.id === prodId)

    if (productExist) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}
const eliminarDelCarrito = (prodId) => {
    const
        item = carrito.find((prod) => prod.id === prodId),
        indice = carrito.indexOf(item);

    carrito.splice(indice, 1)
    localStorage.removeItem("carrito")
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = d.createElement('div')
        div.className = ('productoEnCarrito')
        div.id = `item_${prod.id}`
        div.innerHTML = `
                        <p>${prod.nombre}</p>
                        <p>Precio:$${prod.precio}</p>
                        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
                        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

function refresh(){
    botonCerrarFc()
    location.reload();
}

function callToAcctions() {
    carrito.forEach((prod) => {
        let
            itemComprado = d.getElementById(`item_${prod.id}`),
            productId = itemComprado.id.split("_")[1],
            resoult = carrito.filter(e => e.id == prod.id)[0],
            ids = resoult.id;

        if (ids == productId) {

            const 
                felicitaciones = `¡¡felicitaciones!!`
                
            swal({ title: '¡Compra Realizada con Éxito!', 
                    text: felicitaciones.toUpperCase(), 
                    icon: 'success' , 
                    button: 'Cerrar'})
                    .then(() => {
                        swal(`¡Gracias por su Compra!`);
                        });
            localStorage.clear()
            setTimeout(refresh, 4000);
        }
    })
    if (carrito.length == 0) {
        swal('¡El Carrito está vacío!', '', 'error')
    }

}

let comprarCarrito = d.getElementById('comprar-carrito');
comprarCarrito.addEventListener('click', () => {
    return callToAcctions()
})
//#endregion

//#region Implementacion de la Libreria SwiperJS 
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    }
});
//#endregion