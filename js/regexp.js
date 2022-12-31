const 
        formControls = d.querySelectorAll('#contact input'),
        valid = d.querySelectorAll('.validation');
        
formControls.forEach( input => {
    input.addEventListener('input', (e) => {        
        const 
            validar  = validation(e.target.value, e.target.type),
            inputName = d.querySelector('#inputName'),
            inputTel = d.querySelector('#inputTel');
            inputMail = d.querySelector('#inputMail')
            
        if (!validar){
            inputName.style.border = "1px solid red"
            inputTel.style.border = "1px solid red"
            inputMail.style.border = "1px solid red"
        }  else{
            inputName.style.border = "1px solid green"
            inputTel.style.border = "1px solid green"
            inputMail.style.border = "1px solid green"
        } 
    
} ) } );


function validation(args, type){
    let regexp;
    switch(type){
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