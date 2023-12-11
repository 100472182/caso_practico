
const imagenes = document.querySelectorAll('.img-galeria-grande');
const imagenesPlatos = document.querySelectorAll('.img-galeria-platos')
const platos = document.querySelectorAll('.platos-img')
let indiceActual = 0;
let indiceActualPlatos = 0;

$(document).ready(function () {
  /*Actualizar el idioma*/ 
  cambiarIdioma_home(localStorage.getItem("idioma"));
  $("#idiomas-menu p").click(function (event) {
      event.preventDefault();
      // Obtener el texto del enlace seleccionado
      selectedLanguage = $(this).text();
      
      //Cambiar de idioma 
      cambiarIdioma_home(selectedLanguage);

  });
});

function mostrarImagen(indice1, indice2) {
  imagenes.forEach((imagen, index) => {
    if (index === indice1) {
      imagen.style.display = 'block';
    } else {
      imagen.style.display = 'none';
    }
  });
  imagenesPlatos.forEach((imagen, index) => {
    if (index === indice2) {
      imagen.style.display = 'block';
    } else {
      imagen.style.display = 'none';
    }
  });
}

function nextImagen() {
  indiceActual = (indiceActual + 1) % imagenes.length;
  mostrarImagen(indiceActual, indiceActualPlatos);

}

function prevImagen() {
    indiceActual = indiceActual - 1;
    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }
    mostrarImagen(indiceActual, indiceActualPlatos);
  }

function nextImagenPlatos() {
  indiceActualPlatos = (indiceActualPlatos + 1) % imagenesPlatos.length;
  mostrarImagen(indiceActual, indiceActualPlatos);

}

function prevImagenPlatos() {
    indiceActualPlatos = indiceActualPlatos - 1;
    if (indiceActualPlatos < 0) {
        indiceActualPlatos = imagenesPlatos.length - 1;
    }
    mostrarImagen(indiceActual, indiceActualPlatos);
  }


  function bajarBoton(idBoton) {
    const boton = document.getElementById(idBoton);
    const estiloActual = getComputedStyle(boton);
    let topValue = parseFloat(estiloActual.top);
    boton.addEventListener('click', function() {
      topValue += 5;
      boton.style.top = topValue + 'px';
      setTimeout(function() {
        topValue -= 5;
        boton.style.top = topValue + 'px';
      }, 100);
    });
  }

function abrirGaleriaPlatos(index){
  let galeria = document.getElementById('galeria-platos');
  galeria.style.display = 'block';
  indiceActualPlatos = index;
  mostrarImagen(indiceActual, index);
}

function cerrarGaleriaPlatos(){
  let galeria = document.getElementById('galeria-platos');
  galeria.style.display = 'none';
}

function abrirReserva(){
  localStorage.setItem('enlace_siguiente', "./reserva.html");
}

function abrirPedidos(){
  localStorage.setItem('enlace_siguiente', "./pedidos.html");
}



function cambiarIdioma_home(selectedLanguage){
  if(selectedLanguage==="ES") {/*Navegacion*/
      $("#txt4").text("Vive una verdadera experiencia italiana en Bartolomeo.")
      $("#txt5").text("Aquí podrás deleitarte con una gran variedad de platos")
      $("#txt6").text("Haz tu pedido")
      $("#txt7").text("¡Haz tu pedido aquí!")
      $("#txt8").text("¡Haz tu pedido aquí!")
      $("#txt9").text("Haz tu reserva")
      $("#txt10").text("¡Haz tu reserva aquí!")
      $("#txt11").text("¡Haz tu reserva aquí!")
      $("#txt12").text("¡Prueba nuestros nuevos platos!")
      $("#txt13").text("Nuestros mejores platos")
      $("#txt14").text("Ver la carta")
      $("#txt15").text("Ver la carta")
      $("#txt16").text("Contáctanos")
      $("#txt17").text("Comparte tu opinión")
      $("#txt18").text("Política de Privacidad")
      $("#caja-opinion").attr("placeholder", "Déjanos aquí tu reseña/duda/problema/petición")
  }
  else if (selectedLanguage ==="EN"){
      $("#txt4").text("Live a true Italian experience in Bartolomeo.")
      $("#txt5").text("Here you can delight yourself with a wide variety of dishes")
      $("#txt6").text("Make your order")
      $("#txt7").text("Make your order here!")
      $("#txt8").text("Make your order here!")
      $("#txt9").text("Reserve your table")
      $("#txt10").text("Reserve your table here!")
      $("#txt11").text("Reserve your table here!")
      $("#txt12").text("Try our new dishes!")
      $("#txt13").text("Our best dishes")
      $("#txt14").text("Open our menu")
      $("#txt15").text("Open our menu")
      $("#txt16").text("Contact us")
      $("#txt17").text("Share your opinion")
      $("#txt18").text("Privacy Policy")
      $("#caja-opinion").attr("placeholder", "Leave us here your review/question/problem/request.")
  }
}

mostrarImagen(indiceActual, indiceActualPlatos);
setInterval(nextImagen, 6000);
document.getElementById('flecha-left').onclick = prevImagen;
document.getElementById('flecha-right').onclick = nextImagen;
bajarBoton('boton-pedido');
bajarBoton('boton-reserva');
bajarBoton('boton-carta');
document.getElementById('x-cerrar').onclick = cerrarGaleriaPlatos;
document.getElementById('flecha-left-platos').onclick = prevImagenPlatos;
document.getElementById('flecha-right-platos').onclick = nextImagenPlatos;
for (let imagen of platos) {
  let index = parseInt(imagen.id);
  imagen.onclick = function() {
    abrirGaleriaPlatos(index);
  };
}
document.getElementById('boton-pedido').onclick = abrirPedidos;
document.getElementById('boton-reserva').onclick = abrirReserva;