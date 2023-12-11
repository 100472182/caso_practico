/*Formulario para el registro de los usuarios*/
//import { saveFormData, checkCookie } from "./cookies.";

$(document).ready(function() {
    //Actualizar el idioma
    cambiarIdioma_reg(localStorage.getItem("idioma"))

    /*Los botones para iniciar o registrar la sesion*/
    $("#cancelar").click(function() {
        $('input[type="text"]').val('');     
        event.preventDefault();
    });
    //Ejecuta la funcion validar
    $("#registrar").click(function() {
        event.preventDefault();
        validar_campos_r();
    });

    $("#idiomas-menu p").click(function (event) {
        // Obtener el texto del enlace seleccionado
        var selectedLanguage = $(this).text();
        
        //Cambiar de idioma
        cambiarIdioma_reg(selectedLanguage);
    
    });
});

//Funcion que cambia de idioma la pestaña registro
function cambiarIdioma_reg(selectedLanguage){
    
    if(selectedLanguage==="ES") {/*Navegacion*/
        /*El registro de sesion*/
        $("#title_registro").text("Registro");
        $("#correo").attr("placeholder", "Correo electrónico");
        $("#password").attr("placeholder", "Contraseña");
        $("#nombre_apellidos").attr("placeholder", "Nombre y apellido(s)");
        $("#telefono").attr("placeholder", "Teléfono");
        $("#direccion").attr("placeholder", "Dirección");

        /*Botones*/
        $("#registrar").text("Iniciar");
        $("#cancelar").text("Cancelar");
    }
    else if (selectedLanguage ==="EN"){
        //El registro de sesion
        $("#title_registro").text("Register");
        $("#correo").attr("placeholder", "Email");
        $("#password").attr("placeholder", "Password");
        $("#nombre_apellidos").attr("placeholder", "Name and surname(s)");
        $("#telefono").attr("placeholder", "Phone number");
        $("#direccion").attr("placeholder", "Address");

        //Botones
        $("#registrar").text("Sing up");
        $("#cancelar").text("Cancel");
    }
}

//Funcion que valida nombre y apellido(s) para el registro
function validar_nombre_apellido(){
    //Obtiene el elemento de entrada por su id
    var inputNameSurname= document.getElementById("nombre_apellidos");
    var valorNameSurname= inputNameSurname.value;

    //Expresion regular que debe seguir nombre y apellido (s)
    const pattern_name_surname= /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){0,1}(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){0,1}$/;
    
    //Comprueba si nombre y apellido(s) siguen la expresion regular
    if (!pattern_name_surname.test(valorNameSurname)){
        if ($("#idiomas-btn").text()==="ES"){
            alert("Nombre y apellido(s) incorrectos");
        }
        if ($("#idiomas-btn").text()==="EN"){
            alert("Incorrect first and last name(s)");
        }

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
        if ($("#idiomas-btn").text()==="ES"){
            alert("Número de teléfono incorrecto. Debe tener 9 dígitos.");
        }
        if ($("#idiomas-btn").text()==="EN"){
            alert("Wrong phone number. It must be 9 digits.");
        }

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
        if ($("#idiomas-btn").text()==="ES"){
            alert("Dirección incorrecta");
        }
        if ($("#idiomas-btn").text()==="EN"){
            alert("Wrong address");
        }
         return false;
    }
    return true;
}

//Funcion que revisa si todos los campos estan vacios
function revisar_campos_vacios_r() {
    //CORREO
    var correo = document.getElementById("correo").value;
    if (!campo_vacio(correo, $("#correo").attr("placeholder"))){return false;}
    //PASSWORD
    var password = document.getElementById("password").value;
    if(!campo_vacio(password, $("#password").attr("placeholder"))){return false;}
    //NOMBRE Y APELLIDO(S)
    var nameSurname = document.getElementById("nombre_apellidos").value;
    if (!campo_vacio(nameSurname, $("#nombre_apellidos").attr("placeholder"))){return false;}
    //TELEFONO
    var tlfn = document.getElementById("telefono").value;
    if (!campo_vacio(tlfn, $("#telefono").attr("placeholder"))){return false;}
    //DIRECCION
    var dir = document.getElementById("direccion").value;
    if (!campo_vacio(dir, $("#direccion").attr("placeholder"))){return false;}
    return true;
}

//Funcion que comprueba si una cuenta ya existe.
function check_account(){
//Comprobamos que la cuenta a registrar no existe en la base de datos
    correo = document.getElementById("correo").value;
    let correo_aux = getCookie(correo +"_correo");
    if (correo_aux !== ""){
        if ($("#idiomas-btn").text()==="ES"){
            alert("Esta cuenta de correo ya existe. Inicie sesión.");
        }
        else if ($("#idiomas-btn").text()==="EN"){
            alert("This email account already exists. Sign in.");
        }
        return false;
    }
    return true;
}

//Funcion que valida todos los campos a rellenar en el registro de cuenta
function validar_campos_r(){
    
    //Comprobar que se han rellenado todos los campos 
    if (!revisar_campos_vacios_r()){return false;}
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
    //Comprobamos si existe ya la cuenta a registrar
    if (!check_account()){return false;}
    
    //Guardamos los datos en cookies
    saveFormData();
    //Cambiamos de pestaña
    var variableCompartida = localStorage.getItem('enlace_siguiente')
    window.location.href= variableCompartida;
    checkCookie($("#nombre_apellidos").val());
    return true;
 }




