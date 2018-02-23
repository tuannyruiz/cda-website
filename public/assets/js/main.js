// CONSUMO API

function coinsTemplate(p) {
  return '<div><p><span>'+
    p.pair.replace('_', '/') + '</span><span>Compra: <span class="coin buy">&nbsp;' + p.buy + ' ' + p.pair.split('_')[1] + '</span></span>'+
    '<span>Venda: <span class="coin sell">&nbsp;' + p.sell + ' ' + p.pair.split('_')[1] + '</span></span>'+
    '</p></div>'
}


function requestAPI(callback) {
  var request  = new XMLHttpRequest();
  
  request.open('GET', 'https://appapi.capitaldigitalaberto.com.br/cotacoes', true);
  
  request.onload = function() {
      var data = JSON.parse(this.response);
      var pairs = data.pairs;
  
      for(var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          $("#crypto").append(coinsTemplate(pair));
      }
      
      callback();
  }
  
  request.send();
}

// ANIMAÇÃO DOS CARROSSEIS

function carrossel() {
  $('.carousel').slick({
      infinite: true,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 680,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
  });
}

$(document).ready(function(){
  requestAPI(carrossel);

    $('.testimonial-carousel').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:
        '<button type="button" class="slick-prev"><i class="zmdi zmdi-chevron-left"></i></button>',
        nextArrow: 
        '<button type="button" class="slick-next"><i class="zmdi zmdi-chevron-right"></i></button>'
      });
  });

// MUDANÇA DO ITEM NA NAVEGAÇÃO

var lastId,
    topMenu = $("nav ul"),
    topMenuHeight = topMenu.outerHeight(),
    menuItems = topMenu.find("li a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $('html, body').stop().animate({ 
    scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

$(window).scroll(function(){
   var fromTop = $(this).scrollTop() + topMenuHeight;
   
   var cur = scrollItems.map(function(){
    if ($(this).offset().top < fromTop)
       return this;
   });
   
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
    lastId = id;
    menuItems
      .parent().removeClass("active")
      .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});

// ESCONDER BARRA DO TOPO NO SCROLL

$(window).scroll(function() {
  if ($(this).scrollTop()>50)
   {
      $('.top-menu').hide();
   }
  else
   {
    $('.top-menu').show();
   }
});

// FECHAR O COLLAPSE QUANDO CLICAR NO LINK

$('.navbar-nav a').on('click', function() {
  $('.navbar-collapse').collapse('hide');
});
