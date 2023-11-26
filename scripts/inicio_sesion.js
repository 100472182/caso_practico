// Importo las funciones necesarias de registro.js
//import { validar_correo, validar_password, campo_vacio } from './registro';

$(document).ready(function () {

    $("#enviar").click(function () {
        validar_campos();
        event.preventDefault();
    });

    $("#registrar").click(function (event) {
        event.preventDefault();
        $("body").fadeOut(500, function () {
            window.location.href = "../source/registro.html";
        });
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

//Funcion que comprueba si un campo esta vacio
function campo_vacio(clave, nombre){
    if (clave==""){
        alert(nombre + " debe estar rellenado")
        return false;
    }
    return true;
}

// Función que revisa si todos los campos están vacíos
function revisar_campos_vacios() {
    // CORREO
    var correo = document.getElementById("correo").value;
    if (!campo_vacio(correo, "Correo")) {
        return false;
    }
    // PASSWORD
    var password = document.getElementById("password").value;
    if (!campo_vacio(password, "Contraseña")) {
        return false;
    }

    return true;
}

// Función que valida todos los campos a rellenar en el inicio de sesión de la cuenta
function validar_campos() {
    // Comprobar que se han rellenado todos los campos
    if (!revisar_campos_vacios()) {
        return false;
    }

    // Comprobar que los valores insertados son correctos
    // CORREO
    let bool_correo = validar_correo();
    if (!bool_correo) {
        return false;
    }
    // PASSWORD
    let bool_password = validar_password();
    if (!bool_password) {
        return false;
    }

    return true;
}


