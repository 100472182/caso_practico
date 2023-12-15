/*
// No deja que se escriba con el teclado la fecha
$(".readonly").keydown(function(e) {
  e.preventDefault();
});
*/

// Actualizacion de la fecha minima y maxima en el calendario
var fechaHoy = new Date();
var fechaMax = new Date();
var dia = ("0" + fechaHoy.getDate()).slice(-2);
var mes = ("0" + (fechaHoy.getMonth() + 1)).slice(-2);
var fechaHoyFormato = fechaHoy.getFullYear()+"-"+(mes)+"-"+(dia);
$("#input-calendario").attr("minDate", fechaHoyFormato);
fechaMax.setFullYear(fechaHoy.getFullYear() + 1);
var fechaMaxFormato = fechaMax.getFullYear()+"-"+(mes)+"-"+(dia) ;
$("#input-calendario").attr("maxDate", fechaMaxFormato);

// Inicializa flatpickr en el input deseado
flatpickr("#input-calendario", {
  minDate: fechaHoyFormato,
  maxDate: fechaMaxFormato,

"disable": [
  function(date) {
    // deshabilita los lunes
    return (date.getDay() === 1);
  }
  ],
  // empieza en los lunes
  "locale": {
      "firstDayOfWeek": 2
  }
});    

$(document).ready(function(){
  cambiarClases();
  // Actualizar el idioma 
  cambiarIdioma_reserva(localStorage.getItem("idioma"));
  // Se cambia también en caso de que decidan cambiar de idioma
  $("#idiomas-menu p").click(function (event) {
    // Obtener el texto del enlace seleccionado
    selectedLanguage = $(this).text();
    //Cambiar de idioma 
    cambiarIdioma_reserva(selectedLanguage);
});

  //parte del encabezado
  //Cambiar el fondo del enlace a hacer pedidos y reserva
  $("#hacer_pedido").css("background-color", "");
  $("#hacer_reserva").css("background-color", "#c5681c");

  // Al cargar la página se oculta el contenedor de reserva realizada
  $("#contenedor-reserva-realizada").hide();
  
  // Desplegable de los horarios
  $(".panel").hide()
  $("#flip").click(function(){
    $(".panel").slideToggle("slow");
    if ($("#flecha-horarios").css('transform')=='none'){
      // se invierte la flecha, para indicar que se muestra información
      $("#flecha-horarios").css('transform', 'scaleY(-1)');
    } else{
      $("#flecha-horarios").css('transform', 'none')
    }
  });

  /*
  // Actualizacion de la fecha minima y maxima en el calendario
  var fechaHoy = new Date();
  var fechaMax = new Date();
  var dia = ("0" + fechaHoy.getDate()).slice(-2);
  var mes = ("0" + (fechaHoy.getMonth() + 1)).slice(-2);
  var fechaHoyFormato = fechaHoy.getFullYear()+"-"+(mes)+"-"+(dia);
  $("#input-calendario").attr("minDate", fechaHoyFormato);
  fechaMax.setFullYear(fechaHoy.getFullYear() + 1);
  var fechaMaxFormato = fechaMax.getFullYear()+"-"+(mes)+"-"+(dia) ;
  $("#input-calendario").attr("maxDate", fechaMaxFormato);
*/

  // Actualización de la horas disponibles a seleccionar
  cambiarHorasDisponibles();

  // Deshabilita el selector de horas disponibles y el boton de reserva
  $("#selector-horas-disponibles").prop("disabled", true);
  $("#boton-reserva").prop("disabled", true);

  $("#selector-personas").change(manejarCambio);
  $("#input-calendario").change(manejarCambio);
  $("#selector-horas-disponibles").change(comprobar_boton_reserva);

});


function manejarCambio() {
  // Si los valores seleccionados no son "", habilita el selector de horas disponibles
  if (($("#selector-personas").val() != "") && ($("#input-calendario").val() != "")){
    $("#selector-horas-disponibles").prop("disabled", false);
  } else{
    $("#selector-horas-disponibles").prop("disabled", true);
    $("#selector-horas-disponibles").val("");
  }
  comprobar_boton_reserva()
}

function comprobar_boton_reserva(){
  // Comprueba si se tiene que deshabilitar el boton
  if ($("#selector-horas-disponibles").val() != ""){
    $("#boton-reserva").prop("disabled", false);
  } else{
    $("#boton-reserva").prop("disabled", true);
  }
}


function cambiarHorasDisponibles(){
  // Esta función muestra en el selector de horas disponibles las horas que se pueden seleccionar en función del día

  // Obtener el selector de horas disponibles
  let selectorHorasDisponibles = document.getElementById('selector-horas-disponibles');

  // Obtener el input de fecha
  let inputFecha = document.getElementById('input-calendario');

  // Añadir un evento 'change' al input de fecha. Se detecta cuando cambia su valor
  inputFecha.addEventListener('change', function() {
    // Obtener la fecha seleccionada
    let fechaSeleccionada = this.value;

    // Crear un objeto de fecha a partir de la fecha seleccionada
    let fecha = new Date(fechaSeleccionada);

    // Obtener el día de la semana (0 es domingo, 1 es lunes, etc.)
    let diaDeLaSemana = fecha.getDay();

    // Obtener la agenda del almacenamiento local. Si no existe se crea vacía
    let agenda = JSON.parse(localStorage.getItem('agenda')) || {};

    // Si la fecha seleccionada no está en la agenda, crearla
    if (!agenda[fechaSeleccionada]) {
      agenda[fechaSeleccionada] = {
        // contiene las horas disponibles y las reservas hechas para esa fecha
        horasDisponibles: [],
        reservas: []
      };

      // Si el día de la semana es lunes, no añadir horas disponibles, en caso contrario de 12:00 a 16:00
      if (diaDeLaSemana !== 1) {
        for (let i = 12; i < 16; i++) {
          let horaInicio = i;
          let horaFin = i + 1;
          agenda[fechaSeleccionada].horasDisponibles.push(horaInicio + ':00 - ' + horaFin + ':00');
        }
        // Si el día de la semana no es domingo, añadir horas disponibles de 20:00 a 23:00
        if (diaDeLaSemana !== 0) {
          for (let i = 20; i < 23; i++) {
            let horaInicio = i;
            let horaFin = i + 1;
            agenda[fechaSeleccionada].horasDisponibles.push(horaInicio + ':00 - ' + horaFin + ':00');
          }
        }
      }

      // Guardar la agenda en el almacenamiento local
      localStorage.setItem('agenda', JSON.stringify(agenda));
    }

    // Obtener las horas disponibles para la fecha seleccionada
    let horasDisponibles = agenda[fechaSeleccionada].horasDisponibles;

    // Limpiar las opciones actuales del selector, y ponerlo en el idioma correspondiente
    var selectedLanguage = localStorage.getItem("idioma");
    if(selectedLanguage === "ES") {
      selectorHorasDisponibles.innerHTML = '<option value="" selected>Horas Disponibles</option>';
    } else if (selectedLanguage === "EN"){
      selectorHorasDisponibles.innerHTML = '<option value="" selected>Available Hours</option>';
    }
    // Comprobar si quedan horas disponibles
    if (horasDisponibles.length > 0) {
      // Añadir una opción por cada hora disponible
      horasDisponibles.forEach(function(hora) {
        // Crear un nuevo elemento de opción
        let opcion = document.createElement('option');
        opcion.value = hora;
        opcion.text = hora;

        // Añadir la opción al selector
        selectorHorasDisponibles.add(opcion);
      });
    } else {
      // Si no quedan horas disponibles, añadir una opción indicándolo. Ponerlo en el idioma correspondiente
      if(selectedLanguage === "ES") {
        selectorHorasDisponibles.innerHTML = '<option value="" selected>No quedan horas</option>';
      } else if (selectedLanguage === "EN"){
        selectorHorasDisponibles.innerHTML = '<option value="" selected>No hours left</option>';
      }
    }
  });
}

//Acciones cuando se pulse el boton para hacer la reserva
$("#boton-reserva").click(function() {
  // Obtener la fecha seleccionada
  let fechaSeleccionada = $("#input-calendario").val();

  // Obtener la hora seleccionada
  let horaSeleccionada = $("#selector-horas-disponibles").val();

  // Obtener el número de personas seleccionadas
  let numeroPersonas = $("#selector-personas").val();

  // Obtener la agenda del almacenamiento local
  let agenda = JSON.parse(localStorage.getItem('agenda')) || {};

  // Si la fecha seleccionada está en la agenda
  if (agenda[fechaSeleccionada]) {
    // Añadir la reserva a la fecha seleccionada
    let reserva = {
      hora: horaSeleccionada,
      personas: numeroPersonas
    };
    agenda[fechaSeleccionada].reservas.push(reserva);

    // Quitar la hora de las horas disponibles
    let index = agenda[fechaSeleccionada].horasDisponibles.indexOf(horaSeleccionada);
    if (index > -1) {
      agenda[fechaSeleccionada].horasDisponibles.splice(index, 1);
    }

    // Guardar la agenda en el almacenamiento local
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }
  
  // Oculto el contenedor en el que se ha hecho la reserva
  $("#contenedor").hide();
  // Muestro el contenedor de reserva hecha
  $("#contenedor-reserva-realizada").show();
  //cambio el fondo a rayas
  cambiarFondo();
});

function cambiarFondo(){
  // Esta función cambia el fondo en función de si la reserva ha sido completada
  if ($("#contenedor-reserva-realizada").is(":visible")){
    // cambio el fondo del body
    document.body.style.background = "repeating-linear-gradient(-45deg, #F9D7A0, #F9D7A0 80px, #C0732BE5 80px, #C0732BE5 160px)";
  } else {
    // vuelve al fondo normal
    document.body.style.background = "#F9D7A0";
  }
}

// Funcion que cambia de idioma en la pagina
function cambiarIdioma_reserva(selectedLanguage){
  if(selectedLanguage==="ES") {
    // Calendario
    var calendario = document.getElementById('input-calendario');
    calendario.placeholder = 'Seleccione una fecha';
    
    // Selector de personas, se accede a su primera opción y se cambia su texto
    var select = document.getElementById('selector-personas');
    var option = select.options[0];
    option.text = 'Personas';

    // Selector de horas disponibles
    var select = document.getElementById('selector-horas-disponibles');
    var option = select.options[0];
    if (option.text==="Horas Disponibles" || option.text==="Available Hours"){
      option.text = 'Horas Disponibles';
    } else {
      option.text = 'No quedan horas';
    }

    // Horarios
    // Accede al elemento h5 dentro de #flip y cambia su texto
    var h5 = document.querySelector('#flip h5');
    // Guarda span en una variable, para no perderlo
    var spanHTML = h5.querySelector('span').outerHTML;
    // Cambia h5, manteniendo el span
    h5.innerHTML = 'Horarios' + spanHTML;
    // Para cada div de panel
    // Accede al primer span dentro de .panel y cambia su texto
    // Accede al segundo span dentro de .panel y cambia su texto
    document.querySelector('.panel div:first-child span:first-child').textContent = 'Martes a Sábado';
    document.querySelector('.panel div:first-child span:last-child').textContent = 'De 12:00 a 16:00 y 20:00 a 23:00';
    document.querySelector('.panel div:last-child span:first-child').textContent = 'Domingo';
    document.querySelector('.panel div:last-child span:last-child').textContent = 'De 12:00 a 16:00';


    // Botón reserva
    $("#boton-reserva").text("Hacer reserva");
    
    // Contenedor reserva realizada
    document.querySelector('#contenedor-reserva-realizada div').textContent = '¡Reserva realizada!';
  }
  // En inglés
  else if (selectedLanguage ==="EN"){
    // Calendario
    var calendario = document.getElementById('input-calendario');
    calendario.placeholder = 'Select a Date';

    // Selector de personas
    var select = document.getElementById('selector-personas');
    var option = select.options[0];
    option.text = 'People';

    // Selector de horas disponibles
    var select = document.getElementById('selector-horas-disponibles');
    var option = select.options[0];
    if (option.text==="Horas Disponibles" || option.text==="Available Hours"){
      option.text = 'Available Hours';
    } else {
      option.text = 'No hours left';
    }

    // Horarios
    var h5 = document.querySelector('#flip h5');
    var spanHTML = h5.querySelector('span').outerHTML;
    h5.innerHTML = 'Schedules' + spanHTML;
    document.querySelector('.panel div:first-child span:first-child').textContent = 'Tuesday to Saturday';
    document.querySelector('.panel div:first-child span:last-child').textContent = 'From 12:00 to 16:00 and 20:00 to 23:00';
    document.querySelector('.panel div:last-child span:first-child').textContent = 'Sunday';
    document.querySelector('.panel div:last-child span:last-child').textContent = 'From 12:00 to 16:00';

    // Botón reserva
    $("#boton-reserva").text("Make reservation");

    // Contenedor reserva realizada
    document.querySelector('#contenedor-reserva-realizada div').textContent = 'Reservation made!';
  }
}

function cambiarClases(){
  /* Esta función cambia de clase a los elementos del contenedor en función de lo que les corresponda
  debido a la version móvil, tablet o desktop que haya */
  /*En caso de que se inicie la pagina en tamaño de movil*/
  if ($(window).width() <= 768){
    // Los elementos del contenedor deben ocupar dos columnas
    $(".elemento-contenedor").addClass("dos-columnas");
  }
  else{
    // vuelta a como eran inicialmente
    $("#elemento-personas").removeClass("dos-columnas")
    $("#elemento-horas").removeClass("dos-columnas")
  }

  /*Cuando se detecte cambio de tamaño*/
  $(window).resize(function() {
    if ($(window).width() <= 768){
      $(".elemento-contenedor").addClass("dos-columnas");
    }
    else{
      $("#elemento-personas").removeClass("dos-columnas")
      $("#elemento-horas").removeClass("dos-columnas")
    }
  });
}

