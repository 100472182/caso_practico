$("#hacer_pedido").css("background-color", "#c5681c");
$("#hacer_reserva").css("background-color", "");

function crearCookie(cnombre, cvalor) {
    // Función que crea cookie
    document.cookie ="Cookie_" + cnombre + "=" + cvalor + ";"
}

const nombres_platos = ["Bartolomeo Benedict","Penntucky Breakfast","Cachapas","Burrata","Carpaccio di Salmone","Tequeños","Mortadella e Pistacchio","Shakshouka","Fichi e Prosciutto","Pasta al Pesto di Salvia","Spaghetti Vongole al Cartoccio","Fettuccine nero ai Frutti di Mare","Ossobuco in Gremolata & Gnocchi de Plátano Macho","Risotto Criollo","Crostata de Pollo","Tiramisu","Bartolomeo Cheesecake","Tarta de Queso Criolla"]
const platos = 18;
const precios = [18.95,18.95,18.95,16.50,18.50,10.00,16.50,15.00,15.50,17.00,20.00,20.00,22.00,18.00,19.00,6.50,6.90,7.70];
const descripcion_prod = []
class pedidos{
    // Clase que se encarga de manejar las páginas de pedidos, revisión y estado
    constructor(){
        this.etapa_max = 0; // Etapa máxima a la que se ha llegado
        this.etapa_actual = 0; // Etapa en la que se está ahora mismo
        this.n_platos = platos; // Número de platos
        this.nom_platos = nombres_platos; // Nombres de los platos
        this.n_platos_pedidos = []; // Número de platos pedidos por producto
        this.precios_platos = precios; // Precios de los platos
        this.desc_prod = descripcion_prod; // Descripción de los platos
        this.prod_actual = -1; // Producto actual que se está mostrando en el popup
        this.aux_pedir = 0; // Auxiliar para esperar a clickar en añadir un producto
        this.filtros = {}; // Filtros que se aplican a los platos
        this.filtro_actual = "todo"; // Filtro que se está aplicando ahora mismo
        console.log(this.filtro_actual);
        this.crearFiltros();
        for (let i = 0; i < this.n_platos; i++){
            this.n_platos_pedidos[i] = 0;
        }
        $(".fondo_negro").hide();
        $("pop_up_descr_prod").hide();
        $("pop_up_carrito").hide();
        this.mostrarPedidos();
        this.actualizarControlPedido();
    } 
    // etapa = 0: pedidos; etapa = 1: revision; etapa = 2: completado 
    crearFiltros() { 
        // Función que se encarga de crear los filtros
        this.filtros["por_ti"] = [];
        this.filtros["vegetariano"] = [];
        this.filtros["desayunos"] = [1, 2, 3];
        this.filtros["entrantes"] = [4, 5, 6];
        this.filtros["pizzas"] = [7, 8, 9];
        this.filtros["pastas"] = [10, 11, 12];
        this.filtros["cocina_fusion"] = [13, 14, 15];
        this.filtros["postres"] = [16, 17, 18];
        this.filtros["todo"] = [];
        for (let i = 1; i <= this.n_platos; i++) {
            this.filtros["todo"].push(i)
        }
    }
    
    controlMostrado(){
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
                )) {this.mostrarCompletado();}
            }

            if (this.etapa_actual == 0){
                this.mostrarRevision();
            }
        });
        // Si se clicka en la página de pedidos solo se puede cambiar
        // si la etapa actual no es la ultima y la etapa máxima es superior
        $("#progreso_nodo_bolsa").click(()=> {
            if (this.etapa_actual == 2){
                alert("Pedido ya realizado");    
            }
            else{
                this.mostrarPedidos();
            }
        });
        $("#progreso_nodo_tarjeta").click(()=>{
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
    actualizarControlPedido(){ 
        let num = 0;
        let precio = 0;
        for(let i = 0; i < this.n_platos; i++){
            num += this.n_platos_pedidos[i];
            precio += this.n_platos_pedidos[i] * this.precios_platos[i];
        }
        $("#n_pedidos").text(num);
        $("#precio_total").text(precio.toFixed(2) + "€");
    }

    mostrarPopUpProducto() {
        // Función que se encarga de mostrar el popup de cada producto  
        for (let i = 1; i <= this.n_platos; i++) {
          $("#prod_"+ i).click(() => {
              $("#pop_up_descr_prod").show();
              $(".fondo_negro").show();
              this.prod_actual = i - 1;
              this.aux_pedir = this.n_platos_pedidos[i - 1];
              $("#nombre_plato p").text(this.nom_platos[i - 1]);
              $(".caja_pop_up .n_seleccionado p").text(this.n_platos_pedidos[i - 1]);
              $(".caja_pop_up .precio_total p").text(this.n_platos_pedidos[i - 1] * this.precios_platos[i - 1] + "€");
              $(".caja_pop_up #descripcion_prod p").text(this.desc_prod[i - 1]);
          });
        }
    }
    esconderPopUpProducto() {
        // Función que se encarga de esconder el popup de cada producto
        $(".fondo_negro").click(() => {
            $("#pop_up_descr_prod").hide();
            $(".fondo_negro").hide();
            this.prod_actual = -1;
            this.aux_pedir = 0;
        });
    }
    seleccionarProducto() {
        // Función que se encarga de cambiar los datos dentro del pop-up de cada producto
        $("#pop_up_descr_prod .boton_mas").click((e) => {
            e.stopPropagation();
            this.aux_pedir += 1;
            $(".caja_pop_up .n_seleccionado p").text(this.aux_pedir);
            $(".caja_pop_up .precio_total p").text((this.aux_pedir * this.precios_platos[this.prod_actual]).toFixed(2) + "€");
        });
        
        $("#pop_up_descr_prod .boton_menos").click((e) => {
            e.stopPropagation();
            if (this.aux_pedir > 0) {
                this.aux_pedir -= 1;
                $(".caja_pop_up .n_seleccionado p").text(this.aux_pedir);
                $(".caja_pop_up .precio_total p").text((this.aux_pedir * this.precios_platos[this.prod_actual]).toFixed(2) + "€");
            }
        });

        $("#boton_add").click((e) => {
            e.stopPropagation();
            this.n_platos_pedidos[this.prod_actual] = this.aux_pedir;
            $("#pop_up_descr_prod").hide();
            $(".fondo_negro").hide();
            this.actualizarControlPedido();
        });
    }

    mostrarPopUpCesta() {
        $("#img_cesta").click(() => { 
            $("#pop_up_carrito").show();
            $(".fondo_negro").show();
            for (let i = 0; i < this.n_platos; i++) {
                if (this.n_platos_pedidos[i] > 0) {
                    $("#carrito_" + (i + 1)).show();
                    $("#carrito_" + (i + 1) + " .n_seleccionado p").text(this.n_platos_pedidos[i]);
                    $("#carrito_" + (i + 1) + " .precio_total p").text((this.n_platos_pedidos[i] * this.precios_platos[i]).toFixed(2) + "€");
                }
                else {
                    $("#pop_up_carrito #carrito_" + (i + 1)).hide();
                }
            }
        });
    
    }

    esconderPopUpCesta() {
        $("#pop_up_carrito #pop_up_descr_prod").click(() => { return; });
        $(".fondo_negro").click(() => {
            $("#pop_up_carrito").hide();
            $(".fondo_negro").hide();
        });
    }

    modificarCesta() { 
        for (let i = 1; i <= this.n_platos; i++) {
            $("#carrito_" + i + " .boton_mas").click((e) => {
                e.stopPropagation();
                this.n_platos_pedidos[i - 1] += 1;
                $("#carrito_" + i + " .n_seleccionado p").text(this.n_platos_pedidos[i - 1]);
                $("#carrito_" + i + " .precio_total p").text((this.n_platos_pedidos[i - 1] * this.precios_platos[i - 1]).toFixed(2) + "€");
                this.actualizarControlPedido();
            });
            $("#carrito_" + i + " .boton_menos").click((e) => {
                e.stopPropagation();
                if (this.n_platos_pedidos[i - 1] > 0) {
                    this.n_platos_pedidos[i - 1] -= 1;
                    $("#carrito_" + i + " .n_seleccionado p").text(this.n_platos_pedidos[i - 1]);
                    $("#carrito_" + i + " .precio_total p").text((this.n_platos_pedidos[i - 1] * this.precios_platos[i - 1]).toFixed(2) + "€");
                    this.actualizarControlPedido();
                }
            });
            $("#carrito_" + i + " .papelera").click((e) => { 
                e.stopPropagation();
                this.n_platos_pedidos[i - 1] = 0;
                $("#carrito_" + i).hide();
                this.actualizarControlPedido();
            });
        }
        
    }

    controlPopUps() { 
        this.mostrarPopUpProducto();
        this.esconderPopUpProducto();
        this.seleccionarProducto();
        this.mostrarPopUpCesta();
        this.esconderPopUpCesta();
        this.modificarCesta();
    }

    filtrarPlatos() { 
        let self = this;
        $("[id^=filtro_]").click(function () { 
            let id = this.id; // Coge el id del elemento que ha sido clickado
            $("#" + id).css("background-color", "#5f3300"); 
            let key = id.substring(7); // Quita el filtro_ del id
            if (key == self.filtro_actual) {
                $("#" + id).css("background-color","#904E00");
                key = "todo";
            }
            $("#filtro_" + self.filtro_actual).css("background-color", "#904E00");
            let productos = self.filtros[key]; // Busca en el diccionario usando la key
            for (let i = 1; i <= self.n_platos; i++) {
                if (productos.includes(i)) { 
                    $("#prod_" + i).show();
                }
                else {
                    $("#prod_" + i).hide();
                }
            }
            self.filtro_actual = key;
        });
    }
    cambioColoresBarra() { 
        if (this.etapa_max == 0) {
            $("#progreso_nodo_bolsa").css("background-color", "#6B3907");
            $("#progreso_nodo_tarjeta").css("background-color", "#EB7D10");
            $("#progreso_nodo_completo").css("background-color", "#EB7D10");
            $("#progreso_barra_bolsa_tarjeta").css("background-color", "#EB7D10");
            $("#progreso_barra_tarjeta_completo").css("background-color", "#EB7D10");
        }
        else if (this.etapa_max == 1) {
            $("#progreso_nodo_bolsa").css("background-color", "#6B3907");
            $("#progreso_nodo_tarjeta").css("background-color", "#6B3907");
            $("#progreso_nodo_completo").css("background-color", "#EB7D10");
            $("#progreso_barra_bolsa_tarjeta").css("background-color", "#6B3907");
            $("#progreso_barra_tarjeta_completo").css("background-color", "#EB7D10");
        }
        else {
            $("#progreso_nodo_bolsa").css("background-color", "#6B3907");
            $("#progreso_nodo_tarjeta").css("background-color", "#6B3907");
            $("#progreso_nodo_completo").css("background-color", "#6B3907");
            $("#progreso_barra_bolsa_tarjeta").css("background-color", "#6B3907");
            $("#progreso_barra_tarjeta_completo").css("background-color", "#6B3907");
        }
    }
    
    mostrarPedidos(){
        // Función que se encarga de mostrar la página de pedidos
        if (this.etapa_max == 1){
            $("#progreso_nodo_bolsa").removeClass("pointer");
            $("#progreso_nodo_tarjeta").addClass("pointer");
        }
        this.etapa_actual = 0;
        $("#sect_revision").hide();
        $("#sect_completado").hide();
        $("#sect_pedidos").show();
        this.cambioColoresBarra();

    }

    pedidosRevision(){
        // Función que se encarga de mostrar en la página de revisión los productos
        // que se han pedido 

        let total = 0;
        console.log(this.n_platos_pedidos);
        for(let i = 1; i <= this.n_platos; i++){
            if(this.n_platos_pedidos[i-1] > 0){
                total += this.n_platos_pedidos[i-1] * this.precios_platos[i-1];
                $("#res_" + i).show();
                document.getElementById("res_"+i).querySelector(".cantidad").innerHTML = "x" + this.n_platos_pedidos[i-1];
                document.getElementById("res_"+i).querySelector(".suma").innerHTML = (this.n_platos_pedidos[i-1] * this.precios_platos[i-1]).toFixed(2) + "€";
            }
            else{
                $("#res_" + i).hide();
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
                alert("Número de tarjeta no válida, son necesarios 16 dígitos");
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
            alert("CVV no válido, son necesarios 3 dígitos");
            return false;
        }
        return true;
    }
    mostrarRevision(){
        // Función que muestra la página de revisión
        this.etapa_actual = 1;
        this.pedidosRevision();
        $("#sect_pedidos").hide();
        $("#sect_completado").hide();
        $("#sect_revision").show();
        $("#progreso_nodo_bolsa").addClass("pointer");
        $("#progreso_nodo_tarjeta").removeClass("pointer");
        this.cambioColoresBarra();

    }
    mostrarCompletado(){
        // Función que muestra la página de estado y llama cada segundo a la cuentra atras
        this.etapa_actual = 2;
        $("#sect_revision").hide();
        $("#sect_pedidos").hide();
        $("#sect_completado").show();
        $("#progreso_nodo_bolsa").removeClass("pointer");
        $("#progreso_nodo_tarjeta").removeClass("pointer");
        this.cambioColoresBarra();

    }
}


$(document).ready(Funciones)

function Funciones(){
    const ped = new pedidos();
    ped.controlPopUps();
    ped.filtrarPlatos();
    ped.controlMostrado();
    
    

}