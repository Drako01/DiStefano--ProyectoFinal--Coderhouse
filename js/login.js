
const   
        formLogin = d.querySelector("#login"),
        inputUser = d.querySelector("#input-user"),
        inputPass = d.querySelector("#input-pass"),
        loginIncorrecto = d.querySelector("#logint"),
        contenedorForm = d.querySelector("#div-login"),
        textoLogout = d.querySelector("#textoLogout"),
        logout = d.querySelector("#logout"),
        login = d.querySelector("#loginBtn");    
    
        logout.className = 'btnLogout'

const datosUsuario = 
                    {
                        user: "Alejandro",
                        password: "1234"
                    };

const storageDates = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

const obtenerDelLs = (clave) => {
    return JSON.parse(localStorage.getItem(clave))
}

function loginSucss(){         
    logout.style.display = "block"              
    textoLogout.style.display = "block"     
        const imageURL = './img/alejandro.png'
        swal({
            title: `Bienvenido ${datosUsuario.user}`,
            text: 'Desde esta pantalla puede Cerrar la Sesión.!',
            icon: imageURL,
        });    
    
    login.style.display = "none" 
    contenedorForm.style.display = "none" 
}


formLogin.onsubmit = (event) => {
    event.preventDefault()
    if (inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password) {        
        storageDates(datosUsuario.user, datosUsuario.password)  
        loginIncorrecto.style.display = "none" 
        let linksNav = d.querySelectorAll('nav ul li')
        linksNav.forEach((l) => {
            l.classList.add('hidden')
        })        
        return loginSucss()
    } else {     
        swal('Usuario o Password Incorrecto', 'Intente Nuevamente', 'error')
    }
}


function validarLogin(clave) {
    if (clave !==  datosUsuario.user) {
        logout.style.display = "none"
    } else { 
        return loginSucss()              
    }
}

validarLogin(obtenerDelLs(datosUsuario.user))

logout.onclick = () => {
    localStorage.removeItem(datosUsuario.user)
    validarLogin(obtenerDelLs(datosUsuario.user))      
    formLogin.reset()   
    contenedorForm.style.display = "flex"
}

