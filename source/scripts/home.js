
const imagenes = document.querySelectorAll('.img-galeria-grande');
let indiceActual = 0;

function mostrarImagen(indice) {
  imagenes.forEach((imagen, index) => {
    if (index === indice) {
      imagen.style.display = 'block';
    } else {
      imagen.style.display = 'none';
    }
  });
}

function nextImagen() {
  indiceActual = (indiceActual + 1) % imagenes.length;
  mostrarImagen(indiceActual);
}

function prevImagen() {
    indiceActual = indiceActual - 1;
    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }
    mostrarImagen(indiceActual);
  }

function bajarBotonPedido() {
  const boton = document.getElementById('boton-pedido');
  boton.style.top = '330px';
  setTimeout(function() {
    const boton = document.getElementById('boton-pedido');
    boton.style.top = '325px';
  }, 100);
}

function bajarBotonReserva() {
  const boton = document.getElementById('boton-reserva');
  boton.style.top = '330px';
  setTimeout(function() {
    const boton = document.getElementById('boton-reserva');
    boton.style.top = '325px';
  }, 100);
}

function bajarBotonCarta() {
  const boton = document.getElementById('boton-carta');
  boton.style.top = '370px';
  setTimeout(function() {
    const boton = document.getElementById('boton-carta');
    boton.style.top = '365px';
  }, 100);
}

mostrarImagen(indiceActual);
setInterval(nextImagen, 6000);
document.getElementById('flecha-left').onclick = prevImagen;
document.getElementById('flecha-right').onclick = nextImagen;
document.getElementById('boton-pedido').onclick = bajarBotonPedido;
document.getElementById('boton-reserva').onclick = bajarBotonReserva;
document.getElementById('boton-carta').onclick = bajarBotonCarta;


