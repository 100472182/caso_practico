
$(document).ready(function() {
    if (localStorage.getItem('idioma') === null){
    localStorage.setItem('idioma', $("#idiomas-btn").text())
    }
    cambiarIdioma_nav(localStorage.getItem('idioma'));
    /*Asigna direccion de la siguiente pestaña para el inicio o registro de sesion*/
    $("#hacer_pedido").click(function(){
            localStorage.setItem('enlace_siguiente', "./pedidos.html");
    })

    $("#hacer_reserva").click(function(){
            localStorage.setItem('enlace_siguiente', "./reserva.html");
    })

    /*Menu de hamburguesa para seleccionar el idioma*/
    $("#idiomas-btn").click(function () {
        $("#idiomas-menu").slideToggle();
    });

    $("#idiomas-menu p").click(function (event) {
        event.preventDefault();
        // Obtener el texto del enlace seleccionado
        var selectedLanguage = $(this).text();
        
        // Actualizar el texto del botón de idiomas
        $("#idiomas-btn").text(selectedLanguage);
        
        // Actualizar el valor de la variable local idioma para el resto de ventanas
        localStorage.setItem('idioma', selectedLanguage);
        
        // Cerrar el menú desplegable
        $("#idiomas-menu").slideUp();
        
        //Conversion al ingles
        cambiarIdioma_nav(selectedLanguage);

})});

function cambiarIdioma_nav(selectedLanguage){
    $("#idiomas-btn").text(localStorage.getItem('idioma'));
    if(selectedLanguage==="ES") {/*Navegacion*/
    /*Navegacion*/
    $("#hacer_pedido").text("Haz tu pedido");
    $("#hacer_reserva").text("Reserva tu mesa");
    $("#nuestra_carta").text("Nuestra carta");
}
else if (selectedLanguage ==="EN"){
    /*Navegacion*/
    $("#hacer_pedido").text("Make your order");
    $("#hacer_reserva").text("Reserve your table");
    $("#nuestra_carta").text("Our menu");
}
};

/*Funciones compartidas por registro e inicio de sesion*/
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
        if ($("#idiomas-btn").text()==="ES"){
            alert("Correo electrónico incorrecto.")
        }
        else if ($("#idiomas-btn").text()==="EN"){
            alert("Incorrect email.")
        }
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
        if ($("#idiomas-btn").text()==="ES"){
            alert("La contraseña no cumple con los requisitos. Debe tener al menos una letra mayúscula, al menos un número y 8 caracteres");
        }
        else if ($("#idiomas-btn").text()==="ES"){
            alert("The password does not meet the requirements. Must have at least one capital letter, at least one number and 8 characters");
        }
            return false;
    }
    return true;
}

//Funcion que comprueba si un campo esta vacio
function campo_vacio(clave, nombre){
    if (clave==""){
        if ($("#idiomas-btn").text()==="ES"){
            alert(nombre + " debe estar rellenado");
        }
        else if ($("#idiomas-btn").text()==="EN"){
            alert(nombre + " must be filled");
        }
        return false;
    }
    return true;
}


 //-------------------------------------------------COOKIES-------------------------------------------------
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
function checkCookie(user) {    
    if (user != "") {
        if ($("#idiomas-btn").text()==="ES"){
            alert('Bienvenido ' + user);
        }
        else if ($("#idiomas-btn").text()==="EN"){
            alert('Welcome ' + user);
        }
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