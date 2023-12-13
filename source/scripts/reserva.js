// No deja que se escriba con el teclado la fecha
$(".readonly").keydown(function(e) {
  e.preventDefault();
});

$(document).ready(function(){

  $(".container").hide();
  //Cambiar el fondo del enlace a a hacer pedidos y reserva
  $("#hacer_pedido").css("background-color", "");
  $("#hacer_reserva").css("background-color", "#c5681c");
  
  // Desplegable de los horarios
  $(".panel").hide()
  $("#flip").click(function(){
    $(".panel").slideToggle("slow");
    if ($("#flecha-horarios").css('transform')=='none'){
      $("#flecha-horarios").css('transform', 'scaleY(-1)');
    } else{
      $("#flecha-horarios").css('transform', 'none')
    }
  });

  // Actualizacion de la fecha minima y maxima en el calendario
  var fechaHoy = new Date();
  var fechaMax = new Date();
  var dia = ("0" + fechaHoy.getDate()).slice(-2);
  var mes = ("0" + (fechaHoy.getMonth() + 1)).slice(-2);
  var fechaHoyFormato = fechaHoy.getFullYear()+"-"+(mes)+"-"+(dia);
  $("#input-calendario").attr("min", fechaHoyFormato);
  fechaMax.setFullYear(fechaHoy.getFullYear() + 1);
  var fechaMaxFormato = fechaMax.getFullYear()+"-"+(mes)+"-"+(dia) ;
  $("#input-calendario").attr("max", fechaMaxFormato);

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
  cambiarFondo();
  // Obtener el elemento del selector de horas disponibles
  let selectorHorasDisponibles = document.getElementById('selector-horas-disponibles');

  // Obtener el elemento del input de fecha
  let inputFecha = document.getElementById('input-calendario');

  // Añadir un evento 'change' al input de fecha
  inputFecha.addEventListener('change', function() {
    // Obtener la fecha seleccionada
    let fechaSeleccionada = this.value;

    // Crear un objeto de fecha a partir de la fecha seleccionada
    let fecha = new Date(fechaSeleccionada);

    // Obtener el día de la semana (0 es domingo, 1 es lunes, etc.)
    let diaDeLaSemana = fecha.getDay();

    // Obtener la agenda del almacenamiento local
    let agenda = JSON.parse(localStorage.getItem('agenda')) || {};

    // Si la fecha seleccionada no está en la agenda, crearla
    if (!agenda[fechaSeleccionada]) {
      agenda[fechaSeleccionada] = {
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

    // Limpiar las opciones actuales del selector
    selectorHorasDisponibles.innerHTML = '<option value="" selected>Horas Disponibles</option>';

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
      // Si no quedan horas disponibles, añadir una opción indicándolo
      selectorHorasDisponibles.innerHTML = '<option value="" selected>No quedan horas</option>';
    }
  });
}

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
  $(".contenedor").hide();
  // Muestro el contenedor de reserva hecha
  $(".container").show();
  cambiarFondo();
});

function cambiarFondo(){
  if ($(".container").is(":visible")){
    // cambio el fondo del body
    document.body.style.background = "repeating-linear-gradient(-45deg, #F9D7A0, #F9D7A0 80px, #C0732BE5 80px, #C0732BE5 160px)";
  } else {
    document.body.style.background = "#F9D7A0";
  }
}