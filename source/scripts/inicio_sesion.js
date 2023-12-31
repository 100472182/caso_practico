// Importo las funciones necesarias de registro.js

$(document).ready(function () {
    //Actualizar el idioma 
    cambiarIdioma_ini(localStorage.getItem("idioma"))

    //Los botones para iniciar o registrar la sesion
    $("#iniciar").click(function () {
        event.preventDefault();
        validar_campos_i();
    });

    $("#registrar").click(function () {
        event.preventDefault();
        $("body").fadeOut(500, function () {
                window.location.href = "../source/registro.html";
        });
    });

    $("#idiomas-menu p").click(function (event) {
        // Obtener el texto del enlace seleccionado
        selectedLanguage = $(this).text();
        //Cambiar de idioma 
        cambiarIdioma_ini(selectedLanguage);

    });
});

//Funcion que cambia de idioma la pestaña inicio_sesion
function cambiarIdioma_ini(selectedLanguage){
    if(selectedLanguage==="ES") {
        //El inicio de sesion
        $("#title_iniciar").text("Iniciar sesión");
        $("#correo").attr("placeholder", "Correo electrónico");
        $("#password").attr("placeholder", "Contraseña");

        //Botones
        $("#iniciar").text("Iniciar");
        $("#registrar").text("Registrar");
    }
    else if (selectedLanguage ==="EN"){
        //El inicio de sesion
        $("#title_iniciar").text("Log in");
        $("#correo").attr("placeholder", "Email");
        $("#password").attr("placeholder", "Password");

        //Botones
        $("#iniciar").text("Log in");
        $("#registrar").text("Sign up");
    }
}

// Función que revisa si todos los campos están vacíos
function revisar_campos_vacios_i() {
    // CORREO
    var correo = document.getElementById("correo").value;
    if (!campo_vacio(correo,$("#correo").attr("placeholder"))) {
        return false;
    }
    // PASSWORD
    var password =  $("#password").val();
    if (!campo_vacio(password, $("#password").attr("placeholder"))) {
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
    let bool_password = validar_password();
    if (!bool_password) {
        return false;
    }
    validar_inicio_sesion();

    return true;
}

//Esta funcion comprueba si el usuario y la password insertada son correctas
function validar_inicio_sesion(){
    //Cambiar el fondo del enlace a a hacer pedidos y reserva
    $("#hacer_pedido").css("background-color", "");
    $("#hacer_reserva").css("background-color", "");

    //Valores insertados en los campos
    let correo= $("#correo").val();
    let password= $("#password").val();

    //Valores en la base de datos
    let correo_bd= getCookie(correo + "_correo");
    let password_bd= getCookie(correo + "_password");

    //Compruebo si coinciden
    if (correo_bd !== ""){
        if (correo === correo_bd , password === password_bd){
            let user= getCookie(correo + "_name_surname");
            
            //Cambiamos a la pestaña
            var variableCompartida = localStorage.getItem('enlace_siguiente');
            window.location.href= variableCompartida;
            localStorage.setItem('inicio_sesion', true);
            checkCookie(user);
            return true;
        }
        if ($("#idiomas-btn").text()==="ES"){
            alert("Usuario y/o contraseña incorrecto(s)");
        }
        else if($("#idiomas-btn").text()==="EN"){
            alert("Incorrect username and/or password(s)");
        }
        return false;
    }
    if ($("#idiomas-btn").text()==="ES"){
        alert("Esta cuenta no existe. Regístrese");
    }
    else if($("#idiomas-btn").text()==="EN"){
        alert("This account does not exist. Sign up");
    }
    return false;
}

