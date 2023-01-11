//#region Consumo de API Dollar Today
fetch("https://api.bluelytics.com.ar/v2/latest")

.then((respuesta) => respuesta.json())
.then((data) => {
    const   divDollar = d.createElement('div'),
            ulDollar = d.createElement('ul'),            
            divTiempo = d.querySelectorAll('.tiempo')[0]

            divDollar.appendChild(ulDollar)
            divTiempo.prepend(divDollar)
            ulDollar.className = 'dollar';
            divDollar.className = 'divDollar'

            dollarValue = data.blue;           
            
            ulDollar.innerHTML =            
                `<li class="titleDollar">Referencia del Dolar hoy:</li>
                <li>Valor de Compra: <span> $ ${dollarValue.value_avg} .- (ARS)</span></li>            
                <li>Valor de Venta:  <span>  $ ${dollarValue.value_buy} .- (ARS)</span></li>
                <li><img src="../img/dolar.png" class="usImg"> </li>
                `            
})

.catch((error) => ulDollar.innerHTML = `<li>${error}</li>`)
//#endregion