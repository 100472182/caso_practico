$(document).ready(function(){
    $(".panel-fecha").hide();
    $("#fecha").click(function(){
      $(".panel-fecha").slideToggle("slow");
    });
});


$(".readonly").keydown(function(e) {
  e.preventDefault();
});



