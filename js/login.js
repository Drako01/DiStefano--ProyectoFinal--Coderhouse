
const   
        formLogin = document.querySelector("#login"),
        inputUser = document.querySelector("#input-user"),
        inputPass = document.querySelector("#input-pass"),
        loginIncorrecto = document.querySelector("#logint"),
        contenedorForm = document.querySelector("#div-login"),
        textoLogout = document.querySelector("#textoLogout"),
        logout = document.querySelector("#logout"),
        login = document.querySelector("#loginBtn");       
    
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
        const imageURL = '../img/alejandro.png'
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
        return loginSucss()
    } else {         
        loginIncorrecto.style.display = "block"
        loginIncorrecto.style.color = "red"
        inputPass.style.border = "1px solid red"
        inputUser.style.border = "1px solid red" 
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
    window.location.href = 'index.html';
}

