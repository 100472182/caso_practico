$(document).ready(function() {


    /*Menu de hamburguesa para seleccionar el idioma*/
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
            /*Navegacion*/
            $("#hacer_pedido").text("Haz tu reserva");
            $("#hacer_reserva").text("Reserva tu mesa");
            $("#nuestra_carta").text("Nuestra carta");
        }
        else if (selectedLanguage ==="EN"){
            /*Navegacion*/
            $("#hacer_pedido").text("Make your order");
            $("#hacer_reserva").text("Reserve your table");
            $("#nuestra_carta").text("Our menu");
        }
    });
});