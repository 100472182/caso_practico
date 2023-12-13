//Cambiar el fondo del enlace a a hacer pedidos y reserva
$("#hacer_pedido").css("background-color", "#c5681c");
$("#hacer_reserva").css("background-color", "");

function formatoDosCifras(numero) {
    // Función que dado un número devuelve que numero con dos cifras
    if (numero < 10) {
      return "0" + numero;
    } else {
      return numero.toString();
    }
  }

function crearCookie(cnombre,cvalor){
    // Función que crea cookie
    document.cookie ="Cookie_" + cnombre + "=" + cvalor + ";"
}


const tiempo = 10;
const platos = 16;
const precios = [18.95,16.50,18.50,10.00,16.50,15.00,15.50,17.00,20.00,20.00,22.00,18.00,19.00,6.50,6.90,7.70];
class migas_de_pan{
    // Clase que controla toda la página de migas de pan
    constructor(){
        this.etapa_max = 0;
        this.etapa_actual = 0;
        this.n_platos = platos;
        this.n_platos_pedidos = [];
        this.precios_platos = precios;
        this.platos_pedidos = 0;
        for (let i = 0; i < this.n_platos; i++){
            this.n_platos_pedidos[i] = 0;
        }
        this.cuenta = tiempo * 60;

        
    } 
    // etapa = 0: pedidos; etapa = 1: revision; etapa = 2: estado 
    
    
    ControlMostrado(){
        // Método que controla las páginas que se muestran

        //Si se pulsa siguiente se avanza la etapa máxima y según en la etapa
        // En la que se está ahora mismo se muestra la siguiente
        $(".siguiente").click(() => {
            if ((this.etapa_actual == this.etapa_max) && this.etapa_max < 2){
                this.etapa_max += 1;
            }

            if (this.etapa_actual == 1){
                if (this.checkRevision(
                    document.getElementById("titular").value,
                    document.getElementById("n_tarjeta").value,
                    document.getElementById("fecha").value,
                    document.getElementById("cvv").value
                )) {
                    this.mostrarEstado();
                }
            }

            if (this.etapa_actual == 0){
                this.mostrarRevision();
            }

        });
        // Si se clicka en la página de pedidos solo se puede cambiar
        // si la etapa actual no es la ultima y la etapa máxima es superior
        $("#migas_pedidos").click(()=> {
            if (this.etapa_actual == 2){
                alert("Pedido ya realizado");    
            }
            else{
                this.mostrarPedidos();
            }
        });
        $("#migas_revision").click(()=>{
            if (this.etapa_actual == 2){
                alert("Pedido ya realizado");
            }
            else{
                if(this.etapa_max >= 1){
                    this.mostrarRevision();
                }
                    
            }
        });
    }
    ModificarPedidos() {
        // Función que se encarga de manejar que pedidos aumentan y disminuyen

        // Si se pulsa el boton de más se aumenta en 1 en la posición 
        // del array correspondiente con el producto
        for (let i = 1; i <= 16; i++) {
          $("." + i + ".mas").click(() => {
            this.n_platos_pedidos[i-1] += 1;
            this.platos_pedidos += 1;
            this.mostrarPedidos();
          });
      
        // Si se pulsa el boton de menos se disminuye en 1 en la posición 
        // del array correspondiente con el producto
          $("." + i + ".menos").click(() => {
            if (this.n_platos_pedidos[i-1] > 0) {
              this.n_platos_pedidos[i-1] -= 1;
              this.platos_pedidos += 1;
              this.mostrarPedidos();
            }
          });
          
        }
        
      }
    
    mostrarPedidos(){
        // Función que se encarga de mostrar la página de pedidos
        if (this.etapa_max == 1){
            $("#migas_pedidos").removeClass("pointer");
            $("#migas_revision").addClass("pointer");
        }
        this.etapa_actual = 0;
        for (let i = 1; i <= this.n_platos_pedidos.length; i++){
            document.getElementById(i.toString()).querySelector("h4").innerHTML = this.n_platos_pedidos[i-1];
        }
        console.log(document.querySelectorAll("#n_pedidos h2"));
        console.log(this.platos_pedidos)
        document.getElementById("n_pedidos").querySelector("h2").innerHTML = this.platos_pedidos;
        console.log( document.querySelectorAll("#n_pedidos h2").innerHTML);
        $("#sect_revision").hide();
        $("#sect_estado").hide();
        $("#sect_pedidos").show();
    }

    pedidosRevision(){
        // Función que se encarga de mostrar en la página de revisión los productos
        // que se han pedido 

        let total = 0;
        for(let i = 1; i <= this.n_platos_pedidos.length; i++){
            if(this.n_platos_pedidos[i-1] > 0){
                total += this.n_platos_pedidos[i-1] * this.precios_platos[i-1];
                $("#p_" + i).show();
                document.getElementById("p_"+i).querySelector(".cantidad").innerHTML = "x" + this.n_platos_pedidos[i-1];
                document.getElementById("p_"+i).querySelector(".suma").innerHTML = (this.n_platos_pedidos[i-1] * this.precios_platos[i-1]).toFixed(2) + "€";
            }
            else{
                $("#p_" + i).hide();
            }
            document.getElementById("total").innerHTML = "Total a pagar: " + total.toFixed(2) + "€";
        }
        
    }

    checkRevision(titular,n_tarjeta,fecha,cvv){
        // Función que se encarga de comprobar los campos de tarjeta, fecha y cvv y crea la cookie
        if (!(this.checkNTarjeta(n_tarjeta))){
            return false;
        }
        if (!(this.checkFecha(fecha))){
            return false;
        }
        if (!(this.checkCVV(cvv))){
            return false;
        }
        crearCookie(n_tarjeta,titular + "/" + n_tarjeta + "/" + fecha + "/" + cvv);
        return true;
    }
    checkNTarjeta(n_tarjeta){
        // Función que comprueba el número de tarjeta dado
        const rgx = /^[0-9]{16}$/;
            if (!rgx.test(n_tarjeta)){
                alert("Tarjeta no válida");
                return false;
            }
            return true; 
    }
    checkFecha(fecha){
        // Función que comprueba la fecha dada
        const rgx = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!rgx.test(fecha)){
            alert("Fecha no válida");
            return false;
        }
        let fechaActual = new Date();
        let fecha_mes = fecha.slice(0,2);
        let fecha_año = fecha.slice(3,5);
        let año = fechaActual.getFullYear();
        año = año.toString().slice(2,4);
        año = Number(año);
        let mes = fechaActual.getMonth() + 1;
        if (fecha_año < año){
            alert("Fecha no válida");
            return false;
        }
        else{
            if ((fecha_año == año) && (fecha_mes <= mes)){
                alert("Fecha no válida");
                return false;
            }
        }
        return true;
    }
    checkCVV(cvv){
        // Función que comprueba el cvv dado
        const rgx = /^[0-9]{3}$/;
        if (!rgx.test(cvv)){
            alert("CVV no válido");
            return false;
        }
        return true;
    }
    mostrarRevision(){
        // Función que muestra la página de revisión
        this.etapa_actual = 1;
        this.pedidosRevision();
        $("#sect_pedidos").hide();
        $("#sect_estado").hide();
        $("#sect_revision").show();
        $("#migas_pedidos").addClass("pointer");
        $("#migas_revision").removeClass("pointer");
    }
    cuentaAtras(){
        // Función que se encarga de calcular los minutos y segundos restantes
        // Reduce el valor del contador en un segundo por cada vez que se llama a la función
        if (this.cuenta > 0){
            let minutos = formatoDosCifras(this.cuenta / 60);
            minutos = Math.floor(minutos);
            let segundos = formatoDosCifras(this.cuenta % 60);
            this.cuenta -= 1;
            document.getElementById("contador").innerHTML = formatoDosCifras(minutos) + ":" + segundos;    
        }
        else{
            $("#contador").hide();
            $("#img_check_contador").show();
        }
        
    }
    mostrarEstado(){
        // Función que muestra la página de estado y llama cada segundo a la cuentra atras
        this.etapa_actual = 2;
        $("#sect_revision").hide();
        $("#sect_pedidos").hide();
        $("#sect_estado").show();
        $("#migas_pedidos").removeClass("pointer");
        $("#migas_revision").removeClass("pointer");
        setInterval(() => {
            this.cuentaAtras();
          }, 1000);
    }
}


$(document).ready(Funciones())

function Funciones(){
    const migas = new migas_de_pan();
    migas.mostrarPedidos(); 
    migas.ControlMostrado();
    migas.ModificarPedidos();

}