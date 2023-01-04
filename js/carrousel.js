const
    className = 'active',
    slides = document.getElementsByClassName('carrousel'),
    itemLi = document.querySelectorAll('.tienda'),
    prev = document.querySelectorAll('.carrousel .prev'),
    next = document.querySelectorAll('.carrousel .next'),
    tienda = document.getElementById('index'),
    tiendaDiv = document.createElement('div');

tiendaDiv.className = ('tiendaBtn')
tiendaDiv.id = 'xhr'
tiendaDiv.innerHTML = `<button class="ajax boton-agregar" 
                                data-target="stock"
                                format=".json"
                                style="height: 3rem; 
                                font-size: 1.1rem;
                                line-height: 1.2rem;">
                                Detalle de los Artículos
                            </button>
                            <button class="promise boton-agregar"                             
                                fetch-type="promises"
                                id="promises" 
                                style="height: 3rem; 
                                font-size: 1.1rem;
                                line-height: 1.2rem;">
                                Listado de los Artículos
                            </button>`
tienda.appendChild(tiendaDiv)

/* GALERIA CARROUSEL */
const searchElementInArray = function (array) {
    for (item of array) {
        if (item.classList.contains('active')) {
            item.classList.remove('active')
            return item;
        }
    }
}

const setActiveElement = (array, buttonType) => {
    let lastActiveItem = searchElementInArray(array);
    if (buttonType == 'prev') {
        lastActiveItem = lastActiveItem.previousElementSibling || lastActiveItem.parentNode.lastElementChild;
    } else if (buttonType == 'next') {
        lastActiveItem = lastActiveItem.nextElementSibling || lastActiveItem.parentNode.firstElementChild;
    } else {
        lastActiveItem = array[buttonType];
    }
    lastActiveItem.classList.add('active');
}

prev.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        let imageList = slides[i].querySelectorAll('.slide .item');
        setActiveElement(imageList, 'prev');
    })
})
next.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        let imageList = slides[i].querySelectorAll('.slide .item');
        setActiveElement(imageList, 'next');
    })
})

function btnReload() {
    const btnTest = document.createElement('button')
    btnTest.innerHTML = `Cerrar`
    btnTest.className = 'test btnTest'
    btnTest.id = 'test-butn'
    tiendaDiv.appendChild(btnTest)
    btnTest.addEventListener(
        'click', () => {
            location.reload();
        }
    )
}

// AJAX (Asynchronous Javascript AND XML)
function AJAX(req) {
    const xhr = new XMLHttpRequest;
    xhr.open(req.method || 'get', req.url);
    xhr.send();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const response = (
                JSON.parse(xhr.response)
            )
            req.callBack(response)
        }
    })
    xhr.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            tiendaDiv.innerHTML = `<div class="carga-test">                                    
                                        <h4>Se cargaron ${e.loaded} 
                                        de ${e.total} bytes</h4>                                    
                                    </div>
                                    `
            btnReload()
        }
    })
}

// Botones de Accion
const
    ajaxButtons = document.querySelector('#xhr'),
    xhrResponse = document.getElementById('xhrResponse');

ajaxButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('ajax')) {
        const urlData = e.target.attributes['data-target'].value
        AJAX({
            url: `${urlData}${e.target.attributes['format'].value}`,
            callBack: (res) => {
                xhrResponse.innerHTML = '';
                let ul = document.createElement('ul')
                res.map(r => {
                    ul.innerHTML +=
                        `<li id="item_${r.item_}">
                            <div>                            
                                <h3>
                                    Item Nro: ${r.item_} - ${r.nombre} 
                                </h3>
                                <h4>
                                    Sólo queda en Talle <span>${r.talle} </span>
                                </h4>
                                <h4>
                                    Valor: $<span>${r.precio}</span>
                                </h4> 
                                <div class="imagen-min">                       
                                    <img src="${r.img}" alt="${r.nombre}">  
                                </div>  
                                <h4>
                                    Cantidad en Stock: <span>${r.cantidad}</span>
                                </h4> 
                                <h4> 
                                    Descripción: <span>${r.desc}</span>
                                </h4> 
                                <button class="btn-comprar boton-agregar">Comprar</button> 
                            </div>
                        </li>`
                })
                xhrResponse.appendChild(ul);
                callAcctions()
            }
        })
    }
});


/*
En un Proyecto Real usaría o éste Formato o el Formato Array, 
pero en éste proyecto en particular, decidí poner ambas opciones 
asi muestro como trabajarlas desde tanto desde leer un Array como un JSON.
Por eso desde acá llamo al Archivo "stock.json" y lo manejo con AJAX.
*/

//Uso de Promises

const
    page = 'stock.json',
    root = document.getElementById('root'),
    promise = document.getElementsByClassName('promise');

async function fetchData(request) {
    try {
        let data = await fetch(request.url);
        if (data.status >= 400) throw new Error(data.status)
        return await data.json();
    }
    catch (e) {
        renderError(e)
    }
}

// Encabezados de Tabla
function stockTableHeadings() {
    return `
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Tipo Producto</td>
                <td>Cantidad</td>
                <td>Descripción</td>
                <td>Talle</td>
                <td>Acciones</td>
            </tr>
        </thead>`
}

// Celdas por Fila
// Uso || para evitar que detenga el código en caso que no exista el Ítem.
function stockTableRows(stock) {
    return `
        <tr id="item_${stock.id}">
            <td>${stock.nombre || 'Nombre'}</td> 
            <td>${stock.tipo.toUpperCase() || 'indefinido'}</td>
            <td>${stock.cantidad || '0'}</td>
            <td>${stock.desc || 'Descripción'}</td>
            <td>${stock.talle || 'N/Ex'}</td>
            <td>                
                <button class="btn-comprar btn btn-outline-light">Comprar</button>                
            </td>
        </tr>`
}
// Tabla de Usuarios
function stockTable(stocks) {
    const table = document.createElement('table');
    Object.assign(table, {
        className: 'table table-dark table-striped',
        id: 'stock_table',
        innerHTML: `
            ${stockTableHeadings()} 
            <tbody>
                ${stocks.map(stock => stockTableRows(stock))}
            </tbody>
            `
    })
    root.appendChild(table);
    callAcctions()
}

// Resultado No encontrado
function renderError(error) {
    const errorMessage = document.createElement('div')
    Object.assign(errorMessage, {
        className: 'card',
        id: 'error_message',
        innerHTML: `
            <h2 class="card-header">${error}</h2>
            <p class="card-body">Lo sentimos, hubo un problema</p>`
    })
    root.appendChild(errorMessage);
}

// Acciones del usuario
const btnPromise = document.getElementById('promises')
btnPromise.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const results = await fetchData({ url: `./${page}` })
    if (promise) {
        root.innerHTML = '';
        stockTable(results)
        btnReload()   
    }
})


function callAcctions() {
    const botones = d.querySelectorAll('.btn-comprar')
    botones.forEach(b => {
        b.addEventListener('click', async (e) => {
            const results = await fetchData({ url: `./${page}` }),
                productId = e.target.parentNode.parentNode.id.split("_")[1];
                
            results.map((producto) => {
                let res = results.filter(e => e.id == producto.id)[0].id,
                    name = results.filter(e => e.id == producto.id)[0].nombre,
                    size = results.filter(e => e.id == producto.id)[0].talle,
                    cant = results.filter(e => e.id == producto.id)[0].cantidad,
                    price = results.filter(e => e.id == producto.id)[0].precio;
                    if (res == productId){
                        // Dentro de este IF va la Accion de comprar
                        swal('Compra Realizada con Éxito', 'Usted acaba de Comprar: ' + cant + ' Unidad de: ' + name + 
                            ' Talle: ' + size + ', por un total de: $' + price + '.- (ARS)', 'success')                         
                    }  
            })
        })
    })
}
