// No deja que se escriba con el teclado la fecha
$(".readonly").keydown(function(e) {
  e.preventDefault();
});


$(document).ready(function(){
  //Cambiar el fondo del enlace a a hacer pedidos y reserva
  $("#hacer_pedido").css("background-color", "");
  $("#hacer_reserva").css("background-color", "#c5681c");

  // Crear un objeto para almacenar las fechas
  let agenda = JSON.parse(localStorage.getItem('agenda')) || {};
  localStorage.setItem('agenda', JSON.stringify(agenda));

  // Deshabilita el selector de horas disponibles y el boton de reserva
  $("#selector-horas-disponibles").prop("disabled", true);
  $("#boton-reserva").prop("disabled", true);

  $("#selector-personas").change(manejarCambio);
  $("#input-calendario").change(manejarCambio);
  $("#selector-horas-disponibles").change(comprobar_boton_reserva);

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