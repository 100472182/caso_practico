/*Formulario para el registro de los usuarios*/


$(document).ready(function() {
    $("body").fadeIn(500) 


    $("#cancelar").click(function() {
        $('input[type="text"]').val('');     
        event.preventDefault();
    });
    //Ejecuta la funcion validar
    $("#enviar").click(function() {
        validar_campos();
        event.preventDefault();
    });
});

//Funcion que valida el correo electronico para el registro
function validar_correo (){
    //Obtiene el elemento de entrada por su id
    var inputcorreo= document.getElementById("correo");
    var valorcorreo= inputcorreo.value;

    //Expresion regular que debe seguir el correo
    const pattern_correo = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9+_.-]+\.[A-Za-z]{2,3}$/;

    //Comprueba si el correo sigue la expresion regular
    if (!pattern_correo.test(valorcorreo)){
        //Notifica al usuario
        alert("correo electrónico incorrecto.")
        return false;
    }
    return True
}

//Funcion que valida la password para el registro
function validar_password(){
    //Obtiene el elemento de entrada por su id
    var inputPassword= document.getElementById("password");
    var valorPassword = inputPassword.value;

    //Expresion regular que debe seguir la password del usuario
    const pattern_password= /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    //Comprueba si las password sigue la expresion regular
    if (!pattern_password.test(valorPassword)){
        alert("La contraseña no cumple con los requisitos. Debe tener al menos una letra \
        mayúscula, al menos un número y 8 caracteres");
        return false;
    }
    return true;
}

//Funcion que valida nombre y apellido(s) para el registro
function validar_nombre_apellido(){
    //Obtiene el elemento de entrada por su id
    var inputNameSurname= document.getElementById("nombre_apellidos");
    var valorNameSurname= inputNameSurname.value;

    //Expresion regular que debe seguir nombre y apellido (s)
    const pattern_name_surname= /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){0,1}(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){0,1}$/;
    
    //Comprueba si nombre y apellido(s) siguen la expresion regular
    if (!pattern_name_surname.test()){
        alert("Nombre y apellido(s) incorrectos");
        return false;
    }
    return true;

}
//Funcion que valida el telefono para el registro
function validar_tlfn(){
    //Obtiene el elemento de entrada por su id
    var inputTlfn= document.getElementById("telefono");
    var valorTlfn= inputTlfn.value;

    //Expresion regular que debe seguir el nº de telefono
    const patter_tlfn=  /^\d{9}$/;

    //Comprueba si el nº de telefono sigue la expresion regular
    if(!patter_tlfn.test(inputTlfn)){
        alert("Número de teléfono incorrecto. Debe tener 9 dígitos.")
        return false;
    }
    return True;
}

//Funcion que valida la direccion para el registro
function validar_direccion(){
     //Obtiene el elemento de entrada por su id
     var inputDir= document.getElementById("telefono");
     var valorDir= inputDir.value;
 
     //Expresion regular que debe seguir la direccion
     const patter_dir= /^[a-zA-Z0-9\s,'.-]+$/;
 
     //Comprueba si la direccion sigue la expresion regular
     if(!patter_dir.test(inputDir)){
         alert("Dirección incorrecta")
         return false;
     }
     return True;
 }

//Funcion que comprueba si un campo esta vacio
function campo_vacio(clave, nombre){
    if (clave==""){
        alert(nombre + " debe estar rellenado")
        return false;
    }
    return true;
}

//Funcion que revisa si todos los campos estan vacios
function revisar_campos_vacios() {
    //CORREO
    var correo = document.getElementById("correo").value;
    if (!campo_vacio(correo, "Correo")){return false;}
    //PASSWORD
    var password = document.getElementById("password").value;
    if(!campo_vacio(password, "Contraseña")){return false;}
    //NOMBRE Y APELLIDO(S)
    var nameSurname = document.getElementById("nombre_apellidos").value;
    if (!campo_vacio(nameSurname, "Nombre y Apellido(s)")){return false;}
    //TELEFONO
    var tlfn = document.getElementById("telefono").value;
    if (!campo_vacio(tlfn, "Telefono")){return false;}
    //DIRECCION
    var dir = document.getElementById("direccion").value;
    if (!campo_vacio(dir, "Direccion")){return false;}
}

//Funcion que valida todos los campos a rellenar en el registro de cuenta
 function validar_campos(){
    
    //Comprobar que se han rellenado todos los campos 
    if (!revisar_campos_vacios()){return false}
    
    //Comprobar que los valores insertados son correctos
    //CORREO
    let bool_correo = validar_correo();
    if (!bool_correo) {
        return false;
    }
    //PASSWORD
    let bool_password = validar_password();
    if (!bool_password) {
        return false;
    }
    //NOMBRE Y APELLIDO(S)
    let bool_nameSurname = validar_nombre_apellido();
    if (!bool_nameSurname) {
        return false;
    }
    //TELEFONO
    let bool_tlfn = validar_tlfn();
    if (!bool_tlfn) {
        return false;
    }
    //DIRECCION
    let bool_dir = validar_direccion();
    if (!bool_dir) {
        return false;
    }
    return true;
 }


