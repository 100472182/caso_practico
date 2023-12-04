// Importo las funciones necesarias de registro.js

//El idioma por defecto
var selectedLanguage= "ES"

$(document).ready(function () {
    /*Oculta los caracteres insertados en la password*/ 
    $("#password").on("input", function() {
        var valor = $(this).val();
        var mascara = "*".repeat(valor.length);
        /*var mascara= valor;*/
        $(this).val(mascara).attr("data-real-value", valor);
    });


    /*Los botones para iniciar o registrar la sesion*/
    $("#iniciar").click(function () {
        event.preventDefault();
        validar_campos_i();
    });

    $("#registrar").click(function () {
        event.preventDefault();
        $("body").fadeOut(500, function () {
            //Comprobar si la siguiente ventana debe estar en castellano o en ingles
            if (selectedLanguage==="ES"){
                window.location.href = "../source/registro.html";
            }
            else if (selectedLanguage==="EN") {
                window.location.href = "../source/registro_en.html";
            }

        });
    });

    $("#idiomas-menu a").click(function (event) {
        event.preventDefault();
        // Obtener el texto del enlace seleccionado
        selectedLanguage = $(this).text();
        
        // Actualizar el texto del botón de idiomas
        $("#idiomas-btn").text(selectedLanguage);
        
        // Cerrar el menú desplegable
        $("#idiomas-menu").slideUp();

        //Conversion al ingles
        
        if(selectedLanguage==="ES") {/*Navegacion*/
            /*El inicio de sesion*/
            $("#title_iniciar").text("Iniciar sesión");
            $("#correo").attr("placeholder", "Correo electrónico");
            $("#password").attr("placeholder", "Contraseña");

            /*Botones*/
            $("#iniciar").text("Iniciar");
            $("#registrar").text("Registrar");
        }
        else if (selectedLanguage ==="EN"){
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


//Funcion que valida la password para el registro
function validar_password_i(){
    //Obtiene el elemento de entrada por su id
    var valorPassword =  $("#password").attr("data-real-value");
    //Expresion regular que debe seguir la password del usuario
    const pattern_password= /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    //Comprueba si las password sigue la expresion regular
    if (!pattern_password.test(valorPassword)){
        alert("La contraseña no cumple con los requisitos. Debe tener al menos una letra mayúscula, al menos un número y 8 caracteres");
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
function revisar_campos_vacios_i() {
    // CORREO
    var correo = document.getElementById("correo").value;
    if (!campo_vacio(correo, "Correo")) {
        return false;
    }
    // PASSWORD
    var password =  $("#password").attr("data-real-value");
    if (!campo_vacio(password, "Contraseña")) {
        return false;
    }

    return true;
}

// Función que valida todos los campos a rellenar en el inicio de sesión de la cuenta
function validar_campos_i() {
    // Comprobar que se han rellenado todos los campos
    if (!revisar_campos_vacios_i()) {
        return false;
    }

    // Comprobar que los valores insertados son correctos
    // CORREO
    let bool_correo = validar_correo();
    if (!bool_correo) {
        return false;
    }
    // PASSWORD
    let bool_password = validar_password_i();
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
    let password= $("#password").attr("data-real-value");

    //Valores en la base de datos
    let correo_bd= getCookie(correo + "_correo");
    let password_bd= getCookie(correo + "_password");

    //Compruebo si coinciden
    if (correo_bd !== ""){
        if (correo === correo_bd , password === password_bd){
            let user= getCookie(correo + "_name_surname");
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

