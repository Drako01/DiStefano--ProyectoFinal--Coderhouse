const
    contenedorProductos = d.getElementById('contenedor-productos'),
    contenedorCarrito = d.getElementById('carrito-contenedor'),
    botonVaciar = d.getElementById('vaciar-carrito'),
    contadorCarrito = d.getElementById('contadorCarrito'),
    cantidad = d.getElementById('cantidad'),
    precioTotal = d.getElementById('precioTotal'),
    cantidadTotal = d.getElementById('cantidadTotal');


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

function callToAcctions() {
    carrito.forEach((prod) => {
        let comprarCarrito = d.getElementById('comprar-carrito');
        let itemComprado = d.getElementById(`item_${prod.id}`);
        
        comprarCarrito.addEventListener('click', e =>{
        productId = itemComprado.id.split("_")[1]
        
        carrito.forEach((producto) => {
            let resoult = carrito.filter(e => e.id == producto.id)[0],
                ids = resoult.id;
                if (ids == productId){
                    let stockCarrito = localStorage.getItem('carrito', JSON.stringify(carrito))
                    const stock = (
                        JSON.parse(stockCarrito)
                    )                   
                        stock.forEach((s) => {      
                            return swal('Compra Realizada con Éxito', 'Usted acaba de Comprar: ' + s.cantidad + ' Unidad de: ' + s.nombre + 
                            ', Talle: ' + s.talle + ', por un total de: $' + (s.precio * s.cantidad) + '.- (ARS)', 'success')      
                    })                   
                }  
        })
        
    })})
}

//Implementacion de la Libreria SwiperJS 
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});