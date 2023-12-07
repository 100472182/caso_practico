
const imagenes = document.querySelectorAll('.img-galeria-grande');
const imagenesPlatos = document.querySelectorAll('.img-galeria-platos')
const platos = document.querySelectorAll('.platos-img')
let indiceActual = 0;
let indiceActualPlatos = 0;

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


mostrarImagen(indiceActual, indiceActualPlatos);
setInterval(nextImagen, 6000);
document.getElementById('flecha-left').onclick = prevImagen;
document.getElementById('flecha-right').onclick = nextImagen;
bajarBoton('boton-pedido');
bajarBoton('boton-reserva');
bajarBoton('boton-carta');
document.getElementById('x-cerrar').onclick = cerrarGaleriaPlatos
document.getElementById('flecha-left-platos').onclick = prevImagenPlatos;
document.getElementById('flecha-right-platos').onclick = nextImagenPlatos;
for (let imagen of platos) {
  let index = parseInt(imagen.id);
  imagen.onclick = function() {
    abrirGaleriaPlatos(index);
  };
}

