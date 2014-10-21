$(document).ready(function(){
  var d4g = new D4G();
  d4g.initSlick();
  d4g.displaySplash();
  d4g.getStart();
  d4g.hideNavIconOnMobile();
  d4g.clickSignIn();
  d4g.clickViewGallery();
  d4g.chooseGallery();
  d4g.goHome();
  d4g.goBack();
  d4g.viewThumb();
  d4g.viewDoodle();
});
function D4G(){

}
D4G.prototype.initSlick = function() {
  $('.slides').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    onAfterChange: function(slider, index){
      if(slider.currentSlide == 2){
        setTimeout(function(){
          document.location = "/home.html";
        }, 3000);
      }
    }
  });
  $(".doodles-slider").slick();
}
D4G.prototype.displaySplash = function() {
  if ($(".index").length > 0){
    setTimeout(function(){
      $("#main").fadeOut();
      document.location = "/instructions.html";
    }, 3000);
  }
}
D4G.prototype.getStart = function() {
  $("a.btn-get-start").click(function(){
    $('.slides').slickGoTo(4);
    return false;
  });
}
D4G.prototype.hideNavIconOnMobile = function() {
  if (Modernizr.touch) {
    $(".slick-prev").hide();
    $(".doodles-slider .slick-prev").show();
    $(".slick-next").hide();
    $(".doodles-slider .slick-next").show();
  }
}
D4G.prototype.clickSignIn = function() {
  $(".btn-signin").click(function(){
    $(this).css("opacity", 0.8);
    document.location = "/action.html";
  });
}
D4G.prototype.clickViewGallery = function() {
  $(".btn-view-gallery").click(function(){
    $(this).css("opacity", 0.8);
    document.location = "/gallery_group.html";
  });
}
D4G.prototype.chooseGallery = function() {
  $(".categories-list .item").click(function(){
    $(this).css("opacity", 0.8);
    document.location = "/gallery.html";
  });
}
D4G.prototype.goHome = function() {
  $(".gallery #home-gallery").click(function(){
    $(this).children().css("opacity", 0.8);
    document.location = "/home.html";
  });
}
D4G.prototype.goBack = function(){
  $(".gallery #back-gallery-group").on("click", function(){
    $(this).children().css("opacity", 0.8);
    document.location = "/action.html";
  });
}
D4G.prototype.viewThumb = function(){
  $(".gallery #grid-gallery").on("click", function(){
    $(this).children().css("opacity", 0.8);
    document.location = "/thumnail.html";
  });
}
D4G.prototype.viewDoodle = function(){
  $(".thumbnail-list .rows .item").on("click", function(){
    $(this).children().css("opacity", 0.8);
    document.location = "/gallery.html";
  });
}
