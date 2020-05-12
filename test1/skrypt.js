window.onscroll = function() {scroll()};
window.onresize = function() {rozmiar()};
 
function scroll() {
  if (document.documentElement.scrollTop > 500) {
    //document.getElementById("strzalka").style.display = "block";
    $("#strzalka").fadeIn(750);
  }
  else {
   // document.getElementById("strzalka").style.display = "none";
   $("#strzalka").fadeOut(750);
  }
}
 
function gora () {
  $('body, html').animate({
    scrollTop: 0
  }, 1200);
}
 
function rozmiar () {
  console.log("xdxd");
 
  var szerokosc = window.innerWidth - 32;
  if(szerokosc < 1716){
    for(var j = 0; j < 4; j++){
      if(j == 0)
        var p = $("#lewa .przyciecie");
      else if(j == 1)
        var p = $("#lewa .przyciecie2");
      else if(j == 2)
        var p = $("#prawa .przyciecie");
      else
        var p = $("#prawa .przyciecie2");
      for(var i = 0; i < p.length; i++){
        p[i].style.display = "block";
        p[i].style.float = "none";
        p[i].style.marginLeft = "auto";
        p[i].style.marginRight = "auto";
        p[i].style.marginTop = "30px";
      }
    }
  }
  else {
    for(var j = 0; j < 4; j++){
      if(j == 0)
        var p = $("#lewa .przyciecie");
      else if(j == 1)
        var p = $("#lewa .przyciecie2");
      else if(j == 2)
        var p = $("#prawa .przyciecie");
      else
        var p = $("#prawa .przyciecie2");
      for(var i = 0; i < p.length; i++){
        if(j%2 == 0)
          p[i].style.float = "left";
        else
          p[i].style.float = "right";
        p[i].style.marginLeft = "0";
        p[i].style.marginRight = "0";
        p[i].style.marginTop = "0";
      }
    }
  }
  if(szerokosc > 1000){
    szerokosc *= 0.9;
    szerokosc -= 900;
    szerokosc /= 2;
    szerokosc -=1;
  }
  else {
    szerokosc *= 0.9;
    szerokosc -= 600;
    szerokosc -=1;
  }
 
  var x =document.getElementsByClassName("pustka2");
  for(var i = 0; i < x.length; i++)
    x[i].style.minWidth = szerokosc + "px";
}