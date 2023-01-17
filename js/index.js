//#region Defino las Variables (Utilizando todas las formas vistas)
let nombre = 'Alejandro Daniel Di Stefano',
    comision = 44555,
    links = [
            {
                page: 'index',
                link: 'Inicio'
            },
            {
                page: 'products',
                link: 'Tienda'
            },
            {
                page: 'contacts',
                link: 'Contacto'
            },
            {
                page: 'maps',
                link: 'Ubicación'
            },
            {
                page: 'finantiations',
                link: 'Préstamos Personales'
            }
            

        ],    
    formulario = [
        {
            id: 'monto',
            label: 'Monto',
            type: 'text'
        },
        {
            id: 'cantCuotas',
            label: 'Cantidad de Cuotas',
            type: 'text'
        },
        {
            id: 'modalidad',
            label: 'Modalidad de Crédito',
            type: 'select',
            options: ['Frances', 'Aleman']
        },
        {
            id: 'tasaInteres',
            label: 'Tasa de Interés (%)',
            type: 'text'
        },
        {
            id: 'calcular',
            label: 'Calcular',
            type: 'submit'
        }
    ];
const
    d = document,
    copy = d.querySelector('#footer .copy')

const timer = () => {
    const dateTime = new Date();
    return `
    ${  dateTime.getDate() < 10 ? 
        '0'+ (dateTime.getDate() ) : 
        dateTime.getDate() }/
        ${  dateTime.getMonth() < 9 ? 
            '0'+ (dateTime.getMonth() + 1) : 
            dateTime.getMonth() + 1 }/${dateTime.getFullYear()} 
        ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
}

let clock = setInterval(
    () => copy.innerHTML = `&copy;${timer()} | Entrega Final | Curso de JavaScript en CoderHouse | ${nombre} de la Comisión #${comision}`, 
    1000
);

//#endregion

//#region ********** Manejo del DOM **********//

// Defino la Navbar utilizando una Iteracion con forEach
const navBar = () => {
    let nav = d.createElement('nav'),
        ul = d.createElement('ul'),
        btnLog = d.createElement('button'),
        btnLogOut = d.createElement('button'),
        darkMode = d.createElement('button');        

    ul.className = 'menu';
    btnLog.className = 'btnLog';
    darkMode.className = 'darkModeSwitch';    
    btnLog.id = 'loginBtn';
    btnLogOut.id = 'logout';
    darkMode.id = 'switch';       
    
    btnLog.innerHTML  = `<a href="login.html">
                        Inicio de Sesión
                        </a> `
    btnLogOut.innerHTML = `<a href="">Cerrar sesión</a>`   
    darkMode.innerHTML = `  <span></span>   
                            <span></span>`
    links.forEach((name) => {
        ul.innerHTML += `<li class="link-item"><a href="./${name.page}.html">${name.link}</a></li>`;
    })
    nav.appendChild(ul)        
    ul.appendChild(btnLog)
    ul.appendChild(btnLogOut)
    ul.appendChild(darkMode)
    header.appendChild(nav)    
}
navBar(links);

const switchButton = d.getElementById('switch');

switchButton.addEventListener('click', () => {
    d.body.classList.toggle('dark');
    switchButton.classList.toggle('active');
});
//#endregion

/*
    Autor: Alejandro Daniel Di Stefano
*/ 