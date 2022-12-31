const 
        contenedorModal = document.getElementsByClassName('modal-contenedor')[0],
        botonAbrir = document.getElementById('boton-carrito'),
        botonCerrar = document.getElementById('carritoCerrar'),
        modalCarrito = document.getElementsByClassName('modal-carrito')[0];


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', () =>{
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})