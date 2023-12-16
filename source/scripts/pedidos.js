$("#hacer_pedido").css("background-color", "#c5681c");
$("#hacer_reserva").css("background-color", "");

function crearCookie(cnombre, cvalor) {
    // Función que crea cookie
    document.cookie = "Cookie_" + cnombre + "=" + cvalor + ";"
}

const nombres_platos = ["Bartolomeo Benedict", "Penntucky Breakfast", "Cachapas", "Burrata", "Carpaccio di Salmone", "Tequeños", "Mortadella e Pistacchio", "Shakshouka", "Fichi e Prosciutto", "Pasta al Pesto di Salvia", "Spaghetti Vongole al Cartoccio", "Fettuccine nero ai Frutti di Mare", "Ossobuco in Gremolata & Gnocchi de Plátano Macho", "Risotto Criollo", "Crostata de Pollo", "Tiramisu", "Bartolomeo Cheesecake", "Tarta de Queso Criolla"]
const platos = 18;
const precios = [18.95, 18.95, 18.95, 16.50, 18.50, 10.00, 16.50, 15.00, 15.50, 17.00, 20.00, 20.00, 22.00, 18.00, 19.00, 6.50, 6.90, 7.70];

const descripcion_prod_es = ["Huevo poché servido en focaccia artesanal, con salmón ahumado, aguacate y salsa Bearnesa.", "Inspirado en el Soul Food Americano. Un esponjoso waffle preparado al momento acompañado de pollo frito, pancetta, huevo a la plancha y sirope de maple", "Dos tortitals de maíz asadas al momento, servidas con mantequilla, queso latino a la plancha y aguacate", "Burrata cremos de 250g servida sobre lecho de miel, tomates secos, tomatitos cherry, aceitunas negras, aderezo de trufa y jeringa de pesto",
    "Láminas de solomillo de vacuno Argentino, servidas con mayonesa de albahaca y yerbabuena, láminas de champiñón y escamas de Parmigiano DOP", "Nuestros tequeños artesanos, elaborados en casa. Crujientes dedos de masa rellenos de queso latino, acompañados de mermelada picante de guayaba", "Crema di Parmigiano, mozzarella, mortadella con pistacchio y \"pesto fatto in casa\" de salvia e pistacchio",
    "Salsa pomodoro con sofrito de cebolla, ajo y sriracha, mozzarella, tomates cherry, berenjenas asadas, salsiccia italiana casera, huevo a la plancha, y un toque de cilantro", "Pesto Modense al romero, higos turcos secos marinados en vino de Operto y aceto balsámico, mozzarella prosciutto y escamas de Parmigiano", "Pasta servida cno nuestro \"pesto fatto in casa\". Elaborado con salvia, queso fresco de cabra, perejil, pistacho y Parmigiano DOP",
    "Spaghetti salteados con almejas, un toque de ajo, vino blanco, limón y perejil. Servidos en papillote", "Fetuccine al negro de sepia, servidos con gambones y luras, salteados con ajo negro y vino blanco, tomatitos cherry, salsa pomodoro, albahaca y un toque de Sriracha", "Nuestros gnocchi artesanales de plátano macho y queso latino, servidos con ossobuco de ternera al vino, cocido lentamente durante 8 horas según la tradición milanesa, coronado con una aromática gremolata de perejil y ralladura de limón",
    "Nuestra Chef incorpora al clásico risotto, su receta tradicional de Asado Negro de rendondo de ternera al vino de Oporto y lo combina con Parmigiano y queso Taleggio DOP", "Pastel de masa quebrada, rellena de guiso de pollo al vino, con aceitunas verdes, alcaparra y aroma de ají dulce", "Nuestro clásico tiramisú con crema de zabaglione y mascarpone aromatizada con Ron", "Nuestra tarta de queso de Autor, estilo Nueva York. Con base de galleta Lotus y acompañada de mermelada de plátano macho",
    "Nuestra Chef prepara la receta familiar de la primera Master Chef Latina Sindy Lazo. Una suave y dorada tarta de queso, postre tradicional de la cocina Venezolana a base de queso Gouda y queso latino, acompañada de mermelada casera de guayaba"]

const description_prod_en = [
    "Poached egg served on artisanal focaccia, with smoked salmon, avocado, and Bearnaise sauce.",
    "Inspired by American Soul Food. A fluffy waffle made to order, accompanied by fried chicken, pancetta, sunny-side-up egg, and maple syrup.",
    "Two corn tortillas grilled to order, served with butter, grilled Latin cheese, and avocado.",
    "Creamy 250g burrata served on a bed of honey, sun-dried tomatoes, cherry tomatoes, black olives, truffle dressing, and a pesto syringe.",
    "Slices of Argentine beef sirloin, served with basil and mint mayonnaise, mushroom slices, and Parmigiano DOP flakes.",
    "Our artisanal tequeños, homemade. Crunchy fingers of dough filled with Latin cheese, accompanied by spicy guava jam.",
    "Parmigiano cream, mozzarella, pistachio mortadella, and homemade sage and pistachio pesto.",
    "Tomato sauce with sautéed onions, garlic, and sriracha, mozzarella, cherry tomatoes, grilled eggplant, homemade Italian sausage, sunny-side-up egg, and a touch of cilantro.",
    "Rosemary Modena pesto, Turkish dried figs marinated in Operto wine and balsamic vinegar, mozzarella, prosciutto, and Parmigiano flakes.",
    "Pasta served with our homemade pesto. Made with sage, goat cheese, parsley, pistachio, and Parmigiano DOP.",
    "Spaghetti sautéed with clams, a touch of garlic, white wine, lemon, and parsley. Served in parchment.",
    "Squid ink fettuccine, served with prawns and cuttlefish, sautéed with black garlic and white wine, cherry tomatoes, tomato sauce, basil, and a touch of Sriracha.",
    "Our handmade plantain and Latin cheese gnocchi, served with veal ossobuco cooked slowly for 8 hours according to Milanese tradition, topped with an aromatic gremolata of parsley and lemon zest.",
    "Our Chef combines the classic risotto with her traditional recipe for Asado Negro of round veal in port wine, and combines it with Parmigiano and Taleggio DOP cheese.",
    "Shortcrust pastry cake, filled with chicken stew in wine, with green olives, capers, and a hint of sweet pepper aroma.",
    "Our classic tiramisu with zabaglione cream and mascarpone flavored with rum.",
    "Our New York-style Author's cheesecake. With a Lotus cookie base and accompanied by homemade plantain jam.",
    "Our Chef prepares the family recipe of the first Latina Master Chef Sindy Lazo. A soft and golden cheesecake, a traditional dessert in Venezuelan cuisine made with Gouda cheese and Latin cheese, accompanied by homemade guava jam."
];
class pedidos {
    // Clase que se encarga de manejar las páginas de pedidos, revisión y estado
    constructor() {
        this.etapa_max = 0; // Etapa máxima a la que se ha llegado
        this.etapa_actual = 0; // Etapa en la que se está ahora mismo
        this.n_platos = platos; // Número de platos
        this.nom_platos = nombres_platos; // Nombres de los platos
        this.descr_platos = descripcion_prod_es; // Descripciones de los platos
        this.n_platos_pedidos = []; // Número de platos pedidos por producto
        this.precios_platos = precios; // Precios de los platos
        this.prod_actual = -1; // Producto actual que se está mostrando en el popup
        this.aux_pedir = 0; // Auxiliar para esperar a clickar en añadir un producto
        this.filtros = {}; // Filtros que se aplican a los platos
        this.filtro_actual = "todo"; // Filtro que se está aplicando ahora mismo
        console.log(this.filtro_actual);
        this.crearFiltros();
        for (let i = 0; i < this.n_platos; i++) {
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

    controlMostrado() {
        // Método que controla las páginas que se muestran
        //Si se pulsa siguiente se avanza la etapa máxima y según en la etapa
        // En la que se está ahora mismo se muestra la siguiente
        $(".siguiente").click(() => {
            if ((this.etapa_actual == this.etapa_max) && this.etapa_max < 2) {
                this.etapa_max += 1;
            }

            if (this.etapa_actual == 1) {
                if (this.checkRevision(
                    document.getElementById("titular").value,
                    document.getElementById("n_tarjeta").value,
                    document.getElementById("fecha").value,
                    document.getElementById("cvv").value
                )) { this.mostrarCompletado(); }
            }

            if (this.etapa_actual == 0) {
                this.mostrarRevision();
            }
        });
        // Si se clicka en la página de pedidos solo se puede cambiar
        // si la etapa actual no es la ultima y la etapa máxima es superior
        $("#progreso_nodo_bolsa").click(() => {
            if (this.etapa_actual == 2) {
                alert("Pedido ya realizado");
            }
            else {
                this.mostrarPedidos();
            }
        });
        $("#progreso_nodo_tarjeta").click(() => {
            if (this.etapa_actual == 2) {
                alert("Pedido ya realizado");
            }
            else {
                if (this.etapa_max >= 1) {
                    this.mostrarRevision();
                }
            }
        });

    }
    actualizarControlPedido() {
        let num = 0;
        let precio = 0;
        for (let i = 0; i < this.n_platos; i++) {
            num += this.n_platos_pedidos[i];
            precio += this.n_platos_pedidos[i] * this.precios_platos[i];
        }
        $("#n_pedidos").text(num);
        $("#precio_total").text(precio.toFixed(2) + "€");
    }

    mostrarPopUpProducto() {
        // Función que se encarga de mostrar el popup de cada producto  
        for (let i = 1; i <= this.n_platos; i++) {
            $("#prod_" + i).click(() => {
                $("#pop_up_descr_prod").show();
                $(".fondo_negro").show();
                this.prod_actual = i - 1;
                this.aux_pedir = this.n_platos_pedidos[i - 1];
                $("#nombre_plato p").text(this.nom_platos[i - 1]);
                $(".caja_pop_up .n_seleccionado p").text(this.n_platos_pedidos[i - 1]);
                $(".caja_pop_up .precio_total p").text(this.n_platos_pedidos[i - 1] * this.precios_platos[i - 1] + "€");
                $("#descripcion_prod p").text(this.descr_platos[i - 1]);
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
                $("#" + id).css("background-color", "#904E00");
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

    mostrarPedidos() {
        // Función que se encarga de mostrar la página de pedidos
        if (this.etapa_max == 1) {
            $("#progreso_nodo_bolsa").removeClass("pointer");
            $("#progreso_nodo_tarjeta").addClass("pointer");
        }
        this.etapa_actual = 0;
        $("#sect_revision").hide();
        $("#sect_completado").hide();
        $("#sect_pedidos").show();
        this.cambioColoresBarra();

    }

    pedidosRevision() {
        // Función que se encarga de mostrar en la página de revisión los productos
        // que se han pedido 

        let total = 0;
        console.log(this.n_platos_pedidos);
        for (let i = 1; i <= this.n_platos; i++) {
            if (this.n_platos_pedidos[i - 1] > 0) {
                total += this.n_platos_pedidos[i - 1] * this.precios_platos[i - 1];
                $("#res_" + i).show();
                document.getElementById("res_" + i).querySelector(".cantidad").innerHTML = "x" + this.n_platos_pedidos[i - 1];
                document.getElementById("res_" + i).querySelector(".suma").innerHTML = (this.n_platos_pedidos[i - 1] * this.precios_platos[i - 1]).toFixed(2) + "€";
            }
            else {
                $("#res_" + i).hide();
            }
            document.getElementById("total").innerHTML = "Total: " + total.toFixed(2) + "€";
        }

    }

    checkRevision(titular, n_tarjeta, fecha, cvv) {
        // Función que se encarga de comprobar los campos de tarjeta, fecha y cvv y crea la cookie
        if (!(this.checkNTarjeta(n_tarjeta))) {
            return false;
        }
        if (!(this.checkFecha(fecha))) {
            return false;
        }
        if (!(this.checkCVV(cvv))) {
            return false;
        }
        crearCookie(n_tarjeta, titular + "/" + n_tarjeta + "/" + fecha + "/" + cvv);
        return true;
    }
    checkNTarjeta(n_tarjeta) {
        // Función que comprueba el número de tarjeta dado
        const rgx = /^[0-9]{16}$/;
        if (!rgx.test(n_tarjeta)) {
            if ($("#idiomas-btn").text() === "ES") {
                alert("Número de tarjeta no válido, son necesarios 16 dígitos");
            }
            else if ($("#idiomas-btn").text() === "EN") {
                alert("Invalid card number, 16 digits are required");
            }
            return false;
        }
        return true;
    }
    checkFecha(fecha) {
        // Función que comprueba la fecha dada
        const rgx = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!rgx.test(fecha)) {
            if ($("#idiomas-btn").text() === "ES") {
                alert("Fecha no válida");
            }
            else if ($("#idiomas-btn").text() === "EN") {
                alert("Invalid date");
            }
            return false;
        }
        let fechaActual = new Date();
        let fecha_mes = fecha.slice(0, 2);
        let fecha_año = fecha.slice(3, 5);
        let año = fechaActual.getFullYear();
        año = año.toString().slice(2, 4);
        año = Number(año);
        let mes = fechaActual.getMonth() + 1;
        if (fecha_año < año) {
            if ($("#idiomas-btn").text() === "ES") {
                alert("Fecha no válida");
            }
            else if ($("#idiomas-btn").text() === "EN") {
                alert("Invalid date");
            }
            return false;
        }
        else {
            if ((fecha_año == año) && (fecha_mes <= mes)) {
                if ($("#idiomas-btn").text() === "ES") {
                    alert("Fecha no válida");
                }
                else if ($("#idiomas-btn").text() === "EN") {
                    alert("Invalid date");
                }
                return false;
            }
        }
        return true;
    }
    checkCVV(cvv) {
        // Función que comprueba el cvv dado
        const rgx = /^[0-9]{3}$/;
        if (!rgx.test(cvv)) {
            if ($("#idiomas-btn").text() === "ES") {
                alert("CVV no válido, son necesarios 3 dígitos");
            }
            else if ($("#idiomas-btn").text() === "EN") {
                alert("Invalid CVV, 3 digits are required");
            }
            return false;
        }
        return true;
    }
    mostrarRevision() {
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
    mostrarCompletado() {
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

function cambiarIdioma_pedidos(selectedLanguage, ped) {
    if (selectedLanguage === "ES") {
        $("#filtro_vegetariano").text("Vegetariano")
        $("#filtro_desayunos").text("Desayunos")
        $("#filtro_entrantes").text("Entrantes")
        $("#filtro_pizzas").text("Pizzas")
        $("#filtro_pastas").text("Pastas")
        $("#filtro_cocina_fusion").text("Cocina Fusión")
        $("#filtro_postres").text("Postres")
        $("#boton_add").text("Añadir")
        $("#pop_up_carrito h3").text("Tu Pedido")
        $("#titulo_revision").text("Resumen del pedido")
        $("titular").attr("placeholder", "Titular")
        $("n_tarjeta").attr("placeholder", "Número de tarjeta")
        $("fecha").attr("placeholder", "Fecha")
        $("#boton_pagar").text("Pagar")
        $("#boton_cancelar").text("Cancelar")
        $("#confirmacion_pedido h2").text("¡Pedido realizado!")
        ped.descr_platos = descripcion_prod_es;
    }
    if (selectedLanguage === "EN") {
        $("#filtro_vegetariano").text("Vegetarian");
        $("#filtro_desayunos").text("Breakfasts");
        $("#filtro_entrantes").text("Starters");
        $("#filtro_pizzas").text("Pizzas");
        $("#filtro_pastas").text("Pastas");
        $("#filtro_cocina_fusion").text("Fusion Cuisine");
        $("#filtro_postres").text("Desserts");
        $("#boton_add").text("Add");
        $("#pop_up_carrito h3").text("Your Order");
        $("#titulo_revision").text("Order Summary");
        $("titular").attr("placeholder", "Holder");
        $("n_tarjeta").attr("placeholder", "Card number");
        $("fecha").attr("placeholder", "Date");
        $("#boton_pagar").text("Pay");
        $("#boton_cancelar").text("Cancel");
        $("#confirmacion_pedido h2").text("Order Placed!");
        ped.descr_platos = description_prod_en;
    }

}

function Funciones() {
    const ped = new pedidos();
    ped.controlPopUps();
    ped.filtrarPlatos();
    ped.controlMostrado();
    cambiarIdioma_pedidos(localStorage.getItem("idioma"), ped);
    $("#idiomas-menu p").click(function (event) {
        event.preventDefault();
        // Obtener el texto del enlace seleccionado
        selectedLanguage = $(this).text();
        //Cambiar de idioma 
        cambiarIdioma_pedidos(selectedLanguage, ped);
    });


}