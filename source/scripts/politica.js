$(document).ready(function() {
    cambiarIdioma_plt(localStorage.getItem("idioma"))

    $("#idiomas-menu a").click(function (event) {
        event.preventDefault();
        // Obtener el texto del enlace seleccionado
        var selectedLanguage = $(this).text();
        
        //Cambiar de idioma
        cambiarIdioma_plt(selectedLanguage);
    
    });
});


/*Cambiar idioma de la politica de la empresa*/
function cambiarIdioma_plt(selectedLanguage){
    if(selectedLanguage==="ES") {/*Navegacion*/
        $("#p1").text("Política de Privacidad");
        $("#p2").text("Fecha de vigencia: 10/11/2023");
        $("#p3").text("Gracias por visitar nuestro sitio web. En BARTOLOMEO, nos tomamos en serio la privacidad de nuestros visitantes. Esta política de privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que pueda proporcionarnos a través de nuestro sitio web.");
        $("#p4").text("Información que recopilamos:");
        $("#p5").text("Información de pago: Si realiza una reserva en línea o compra productos a través de nuestro sitio web, podemos recopilar información de pago, como detalles de tarjetas de crédito o débito.");
        $("#p6").text("Información de la visita: Podemos recopilar información sobre su visita al sitio web, incluidas las páginas que visita, el tiempo que pasa en el sitio y la frecuencia de las visitas.");
        $("#p7").text("Cómo utilizamos la información:");
        $("#p8").text("Utilizamos la información recopilada para:");
        $("#p9").text("Procesar reservas y pedidos.");
        $("#p10").text("Enviar información relevante sobre eventos, promociones o actualizaciones del restaurante.");
        $("#p11").text("Mejorar y personalizar la experiencia del usuario en nuestro sitio web.");
        $("#p12").text("Garantizar la seguridad y protección de la información del usuario.");
        $("#p13").text("Cómo protegemos su información:");
        $("#p14").text("Implementamos medidas de seguridad para proteger su información personal contra accesos no autorizados, alteraciones, divulgaciones o destrucciones no autorizadas.");
        $("#p15").text("Divulgación de información:");
        $("#p16").text("No compartimos, vendemos ni alquilamos su información personal a terceros sin su consentimiento, a menos que sea necesario para cumplir con la ley o proteger nuestros derechos.");
        $("#p17").text("Enlaces a sitios web de terceros:");
        $("#p18").text("Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad o el contenido de estos sitios.");
        $("#p19").text("Cambios en la política de privacidad:");
        $("#p20").text("Nos reservamos el derecho de actualizar esta política en cualquier momento. Le recomendamos que revise periódicamente esta página para estar al tanto de cualquier cambio.");
        $("#p21").html("Al utilizar nuestro sitio web, usted acepta los términos de esta política de privacidad. Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto con nosotros a través de nuestro <a href='https://www.instagram.com/bartolomeokitchen/' target='_blank'>Instagram</a> o <a href='https://www.facebook.com/bartolomeokitchen/' target='_blank'>Facebook</a>.");



       
    }
    else if (selectedLanguage ==="EN"){
        $("#p1").text("Privacy Policy");
        $("#p2").text("Effective Date: 11/10/2023");
        $("#p3").text("Thank you for visiting our website. At BARTOLOMEO, we take the privacy of our visitors seriously. This privacy policy describes how we collect, use, and protect personal information that you may provide to us through our website.");
        $("#p4").text("Information We Collect:");
        $("#p5").text("Payment Information: If you make an online reservation or purchase products through our website, we may collect payment information, such as credit or debit card details.");
        $("#p6").text("Visit Information: We may collect information about your website visit, including the pages you visit, the time you spend on the site, and the frequency of visits.");
        $("#p7").text("How We Use the Information:");
        $("#p8").text("We use the collected information to:");
        $("#p9").text("Process reservations and orders.");
        $("#p10").text("Send relevant information about restaurant events, promotions, or updates.");
        $("#p11").text("Improve and personalize the user experience on our website.");
        $("#p12").text("Ensure the security and protection of user information.");
        $("#p13").text("How We Protect Your Information:");
        $("#p14").text("We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, or unauthorized destruction.");
        $("#p15").text("Information Disclosure:");
        $("#p16").text("We do not share, sell, or rent your personal information to third parties without your consent, unless necessary to comply with the law or protect our rights.");
        $("#p17").text("Links to Third-Party Websites:");
        $("#p18").text("Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites.");
        $("#p19").text("Changes to the Privacy Policy:");
        $("#p20").text("We reserve the right to update this policy at any time. We recommend that you periodically review this page to stay informed of any changes.");
        $("#p21").html("By using our website, you agree to the terms of this privacy policy. If you have any questions or concerns, feel free to contact us through our <a href='https://www.instagram.com/bartolomeokitchen/' target='_blank'>Instagram</a> or <a href='https://www.facebook.com/bartolomeokitchen/' target='_blank'>Facebook</a>.");

    }
}
