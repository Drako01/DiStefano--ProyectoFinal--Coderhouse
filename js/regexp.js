//#region Variables y recorrido de datos del Formulario
const
    formControls = d.querySelectorAll('#contact input'),
    valid = d.querySelectorAll('.validation');

formControls.forEach(input => {
    input.addEventListener('input', (e) => {
        const
            validar = validation(e.target.value, e.target.type),
            inputName = d.querySelector('#inputName'),
            inputTel = d.querySelector('#inputTel'),
            inputMail = d.querySelector('#inputMail');

        if (!validar) {
            inputName.style.border = "1px solid red"
            inputTel.style.border = "1px solid red"
            inputMail.style.border = "1px solid red"
        } else {
            inputName.style.border = "1px solid green"
            inputTel.style.border = "1px solid green"
            inputMail.style.border = "1px solid green"
        }

    })
});
//#endregion

//#region Aquí hago uso de un Regex para validar con JS los Inputs
function validation(args, type) {
    let regexp;
    switch (type) {
        case 'text':
            regexp = /[a-z A-Z]+/;
            break;
        case 'tel':
            regexp = /\+*\(\d{2,5}\)(\d{2,4}\-){1,4}\d{4}/;
            break;
        case 'email':
            regexp = new RegExp(/\w{2,}@\w{2,}(\.[a-zA-Z]{2,})+/);
            break;
    }
    return regexp.test(args)
};
//#endregion

//#region Funcion Principal
function guardarDatos() {
    const
        nombre = d.forms["formulario"]["nombre"].value
        telefono = d.forms["formulario"]["telefono"].value,
        email = d.forms["formulario"]["email"].value,
        datos = { 'nombre': nombre, 'telefono': telefono, 'email': email };

    localStorage.setItem('Nuevo Contacto', JSON.stringify(datos))

    swal(datos['nombre'].toUpperCase(), 'Contacto Agregado Correctamente al LocalStorage', 'success')
}

/*
    Con la funcion guardarDatos() simplemente hago un LocalStorage del Contacto que
    se acaba de agregar y manda un SweetAlert del Contacto agregado en caso exitoso.
    No profundicé en el concepto de LocalStorage, ni en armar una Lista para que se guarden
    varios contactos, ni en la recuperación, ni en la eliminación; porque eso ya lo hice
    con el Carrito de compras. Acá solamente muestro la Implementacions del SweetAlert.
*/

//#endregion
