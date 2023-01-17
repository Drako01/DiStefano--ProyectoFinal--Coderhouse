//#region Variables
const
    formLogin = d.querySelector("#login"),
    inputUser = d.querySelector("#input-user"),
    inputPass = d.querySelector("#input-pass"),
    loginIncorrecto = d.querySelector("#logint"),
    contenedorForm = d.querySelector("#div-login"),
    textoLogout = d.querySelector("#textoLogout"),
    logout = d.querySelector("#logout"),
    login = d.querySelector("#loginBtn"),
    urlGitHub = 'https://drako01.github.io/DiStefano--ProyectoFinal--Coderhouse/';

logout.className = 'btnLogout'

const datosUsuario = [
    {
        user: "Alejandro",
        password: "1234"
    },
    {
        user: "Carola",
        password: "1234"
    }
]
    ;

const storageDates = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

const obtenerDelLs = (clave) => {
    return JSON.parse(localStorage.getItem(clave))
}

//#endregion

//#region Funciones e Implementacion de SweetAlert

function loginSucss() {
    logout.style.display = "block"
    textoLogout.style.display = "block"
    login.style.display = "none"
    contenedorForm.style.display = "none"
    let linksNav = d.querySelectorAll('nav ul li')
            linksNav.forEach((l) => {
                l.classList.add('hidden')
            })
}

function logoutSucss() {
    datosUsuario.forEach((u) => {
        localStorage.clear()
        validarLogin(obtenerDelLs(u.user))
        formLogin.reset()
        contenedorForm.style.display = "flex"
    })
}

formLogin.onsubmit = (event) => {
    event.preventDefault()
    datosUsuario.map((u) => {
        if (inputUser.value === u.user && inputPass.value === u.password) {
            storageDates(u.user, u.password)
            
            const imageURL = `${urlGitHub}/img/${u.user}.png`
            swal({
                title: `Bienvenid@ ${u.user}`,
                text: 'Desde esta pantalla puede Cerrar la Sesión.!',
                icon: imageURL,
            });
            return loginSucss()
        } else if (inputUser.value !== u.user && inputPass.value !== u.password) {
            swal('Usuario o Password Incorrecto', 'Intente Nuevamente', 'error')
        }
    })
}


function validarLogin(clave) {
    datosUsuario.map((u) => {
    if (clave !== u.user) {
        logout.style.display = "none"
    } else {
        return loginSucss()
    }
} ) }

datosUsuario.map((u) => {
    validarLogin(obtenerDelLs(u.user))
})

logout.onclick = () => {
    return logoutSucss()
}

//#endregion
