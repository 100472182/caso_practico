// Importo las funciones necesarias de registro.js
//import { validar_correo, validar_password, campo_vacio } from './registro';

$(document).ready(function () {

    $("#enviar").click(function () {
        event.preventDefault();
        validar_campos();
    });

    $("#registrar").click(function () {
        event.preventDefault();
        $("body").fadeOut(500, function () {
            window.location.href = "../source/registro.html";
        });
    });

    
    $("#idiomas-btn").click(function () {
        $("#idiomas-menu").slideToggle();
    });

    $("#idiomas-menu a").click(function (event) {
        event.preventDefault();
        // Obtener el texto del enlace seleccionado
        var selectedLanguage = $(this).text();
        
        // Actualizar el texto del botón de idiomas
        $("#idiomas-btn").text(selectedLanguage);
        
        // Cerrar el menú desplegable
        $("#idiomas-menu").slideUp();

        // Aquí puedes agregar la lógica para cambiar el contenido de la página según la opción seleccionada
        //alert("Seleccionaste: " + selectedLanguage);
        
        //Conversion al ingles
        
        if(selectedLanguage==="ES") {/*Navegacion*/
            $("#hacer_pedido").text("Haz tu pedido");
            $("#hacer_reserva").text("Reserva tu mesa");
            $("#nuestra_carta").text("Nuestra carta");

            /*El inicio de sesion*/
            $("#title_iniciar").text("Iniciar sesión");
            $("#correo").attr("placeholder", "Correo electrónico");
            $("#password").attr("placeholder", "Contraseña");

            /*Botones*/
            $("#iniciar").text("Iniciar");
            $("#registrar").text("Registrar");
        }
        else if (selectedLanguage ==="EN"){
            /*Navegacion*/
            $("#hacer_pedido").text("Make your order");
            $("#hacer_reserva").text("Reserve your table");
            $("#nuestra_carta").text("Our menu");

            /*El inicio de sesion*/
            $("#title_iniciar").text("Start session");
            $("#correo").attr("placeholder", "Email");
            $("#password").attr("placeholder", "Password");

            /*Botones*/
            $("#iniciar").text("Log in");
            $("#registrar").text("Sign up");
        }
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
    validar_inicio_sesion();

    return true;
}

//Esta funcion comprueba si el usuario y la password insertada son correctas
function validar_inicio_sesion(){
    //Valores insertados en los campos
    let correo= document.getElementById("correo").value;
    let password= document.getElementById("password").value;

    //Valores en la base de datos
    let correo_bd= getCookie(correo + "_correo");
    let password_bd= getCookie(correo + "_password");

    //Compruebo si coinciden
    if (correo_bd !== ""){
        if (correo === correo_bd , password === password_bd){
            let user= getCookie(correo + "_name_surname");
            alert("Bienbenido " + user);
            //Cambiamos a la pestaña registro
            window.location.href="../source/reserva.html"
            return true;
        }

        alert("Usuario y/o contraseña incorreco(s)");
        return false;
    }
    alert("Esta cuenta no existe. Regístrese");
    return false;
}


//-----------------------------------COOKIES----------------------------------------------

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

//----------------------------------Menu de hamburguesa-------------------------



/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function change_language() {
    var x = document.getElementById("idiomas");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
    alert("Termino")
}
