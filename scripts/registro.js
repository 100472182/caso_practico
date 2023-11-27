/*Formulario para el registro de los usuarios*/
//import { saveFormData, checkCookie } from "./cookies.";

$(document).ready(function() {
    $("body").fadeIn(500) 


    $("#cancelar").click(function() {
        $('input[type="text"]').val('');     
        event.preventDefault();
    });
    //Ejecuta la funcion validar
    $("#enviar").click(function() {
        event.preventDefault();
        validar_campos();
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
    return true;
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
        alert("La contraseña no cumple con los requisitos. Debe tener al menos una letra\
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
// Funcion que valida el telefono para el registro
function validar_tlfn() {
    // Obtiene el elemento de entrada por su id
    var inputTlfn = document.getElementById("telefono");
    var valorTlfn = inputTlfn.value;

    // Expresion regular que debe seguir el nº de telefono
    const pattern_tlfn = /^\d{9}$/;

    // Comprueba si el nº de telefono sigue la expresion regular
    if (!pattern_tlfn.test(valorTlfn)) {
        alert("Número de teléfono incorrecto. Debe tener 9 dígitos.");
        return false;
    }
    return true;
}

//Funcion que valida la direccion para el registro
function validar_direccion(){
     //Obtiene el elemento de entrada por su id
     var inputDir= document.getElementById("telefono");
     var valorDir= inputDir.value;
     //Expresion regular que debe seguir la direccion
     const pattern_dir= /^[a-zA-Z0-9\s,'.-]+$/;
     //Comprueba si la direccion sigue la expresion regular
    if(!pattern_dir.test(valorDir)){
         alert("Dirección incorrecta");
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
    return true;
}

//Funcion que comprueba si una cuenta ya existe.
function check_account(){
//Comprobamos que la cuenta a registrar no existe en la base de datos
    correo = document.getElementById("correo").value;
    let correo_aux = getCookie(correo +"_correo");
    if (correo_aux !== ""){
        alert("Esta cuenta de correo ya existe. Inicie sesión.")
        return false;
    }
    return true;
}

//Funcion que valida todos los campos a rellenar en el registro de cuenta
function validar_campos(){
    
    //Comprobar que se han rellenado todos los campos 
    if (!revisar_campos_vacios()){return false;}
    //Comprobar que los valores insertados son correctos
    //CORREO
    //alert("antes de correo")
    let bool_correo = validar_correo();
    if (!bool_correo) {
        return false;
    }
    //PASSWORD
    //alert("antes de password")
    let bool_password = validar_password();
    if (!bool_password) {
        return false;
    }
    //NOMBRE Y APELLIDO(S)
    //alert("antes de name surname")
    let bool_nameSurname = validar_nombre_apellido();
    if (!bool_nameSurname) {
        return false;
    }
    //TELEFONO
    //alert("antes de telefono")
    let bool_tlfn = validar_tlfn();
    if (!bool_tlfn) {
        return false;
    }
    //DIRECCION
    let bool_dir = validar_direccion();
    if (!bool_dir) {
        return false;
    }
    //Comprobamos si existe ya la cuenta a registrar
    if (!check_account()){return false;}
    
    //Guardamos los datos en cookies
    saveFormData();
    window.location.href="../source/reserva.html"
    checkCookie();//-----------------Esto debe ir en reservar----------------------
    return true;
 }

 //---------------------------------COOKIES----------------------------------------------------------------------
//Funcion para almacenar las cookies
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Funcion para guardar las cookies en el formato correcto
function saveFormData() {
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;
    let name_surname = document.getElementById("nombre_apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;

    // Guardar los datos en cookies
    setCookie(correo + "_password", password, 7);
    setCookie(correo + "_telefono", telefono, 7);
    setCookie(correo + "_direccion", direccion, 7);
    setCookie(correo + "_name_surname", name_surname, 7);
    setCookie(correo + "_correo", correo, 7);
    return true; // Esto permite que el formulario se envíe
}


//Funcion que comprueba si existe al menos un usuario y si existe, recibe al ultimo usuario que se haya registrado
function checkCookie() {    
    let user = getNameCookie();
    if (user != "") {
        alert('Bienvenido ' + user);
    }
}

//Funcion que obtiene informacion de las cookies, en concreto el nombre del ultimo usuario registrado
function getNameCookie() {
    const cookies = document.cookie.split(';'); // separa las cookies
    const last_cookie = cookies.pop(); // Obtiene la última cookie
    
    if (last_cookie) {
        const cookie_correo = last_cookie.split('_')[0].trim(); // Extrae el correo de la cookie
        let user = getCookie(cookie_correo+"_name_surname");
        return user;
    }
    return ""; // Si no hay cookies, devuelve null
}

//Funcion que obtiene las cookies de la base de datos
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


