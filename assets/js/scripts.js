$(function() {

  "use strict";

  /*===============================================
    Preloader
  ===============================================*/
  $(window).load(function () {
    $("body").addClass("loaded");
  });

  /*===============================================
    Parallax
  ===============================================*/
  $(".parallax-section").parallax({
    speed : 0.3
  });

  /*===============================================
    Scroll Spy
  ===============================================*/
  $('body').scrollspy({ 
    target: '.menu', 
    offset: 50
  });

  /*===============================================
    Smooth Scrolling
  ===============================================*/
  var htmlBody = $("html,body");
  var windowWidth = $(window).width();

  $(document).ready(function(e) {
    $(".menu li a, .hire-background a, #hire, #profile-contact-link").on("click", function(e) {
      if (windowWidth >= 768) {
        htmlBody.animate({scrollTop: $(this.hash).offset().top - 50}, 800, "easeInOutQuart");  
      }
      if (windowWidth <= 767) {
        htmlBody.animate({scrollTop: $(this.hash).offset().top - 0}, 800, "easeInOutQuart");
      }
      e.preventDefault();                                  
    });
  });

  /*===============================================
    Circular Progress bar
  ===============================================*/
  $(".dial").knob({
    'width': '100',
    'height': '100',
    'thickness': .03,
    'fgColor': 'rgb(255, 255, 255)',
    'bgColor': 'rgba(255, 255, 255, .0)',
    'inputColor': 'rgb(255, 255, 255)',
    'readOnly': true,
    'font': 'Open Sans',
    'fontWeight': "300",
      parse: function (v) {return parseInt(v, 10);},
      format: function (v) {return v + "%";}
  });

  /*===============================================
    Circular Progress bar Animate when visible
  ===============================================*/
  $(".dial").each(function () {
    var $this = $(this);
    var myVal = $this.data("number");
    $(".skill-bar").appear(function() {
      $({
        value: 0
      }).animate({
        value: myVal,
      }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $this.val(Math.ceil(this.value)).trigger('change');
        }
      })
    },{accX: 0, accY: -10});
  });

  /*===============================================
    Contact Form
  ===============================================*/
  $("#contactform").on('submit',function(e) {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    if (name == '') {
      $("#name").css('border-color','rgba(255, 0, 0, 0.7)');
    }
    if (email == '') {
      $("#email").css('border-color','rgba(255, 0, 0, 0.7)');
    }
    if (message == '') {
      $("#message").css('border-color','rgba(255, 0, 0, 0.7)');
    }
    else {
      $.ajax({
        url:'contact_form.php',
        data:$(this).serialize(),
        type:'POST',
        success:function(data){
          $("#success").show().fadeIn(1000); //=== Show Success Message==
          $('#contactform').each(function(){
            this.reset();
          });
        },
        error:function(data){
          $("#error").show().fadeIn(1000); //===Show Error Message====
        }
      });
    }
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
  });

  /*===============================================
    Magnific Popup
  ===============================================*/
  $('.lightbox-popup').magnificPopup({ 
    type:'inline',
    fixedContentPos: false,
    removalDelay: 100,
    closeBtnInside: true,
    preloader: false,
    mainClass: 'mfp-fade'
  });

  /*===============================================
    Counter
  ===============================================*/
  $(".facts-background [data-to]").each(function() {
    var $this = $(this);
    $this.appear(function() {
      $this.countTo({
        speed: 1500,
        onComplete: function() {
          if($this.data("append")) {
            $this.html($this.html() + $this.data("append"));
          }
        }
      });
    }, {accX: 0, accY: -10});
  });

  /*===============================================
    Owl Carousel
  ===============================================*/
  $(".portfolioSlider").owlCarousel({
    slideSpeed: 400,
    paginationSpeed: 400,
    rewindSpeed: 800,
    singleItem: true
  });

  $("#clientSlider").owlCarousel({
    items: 3,
    itemsDesktop: [1199,3],
    itemsDesktopSmall: [979,2],
    itemsTablet: [768,1],
    itemsMobile: [479,1],
    autoPlay: 2000, // 2 seconds
    stopOnHover: true,
    pagination: false,
    slideSpeed: 400,
    paginationSpeed: 400,
    rewindSpeed: 800,
    singleItem: false
  });

  /*===============================================
    Google Maps
  ===============================================*/
  var markerIcon = "images/marker.png";
  // Map Initial Location
  var initLatitude = 33.694239; // <- Latitude here
  var initLongitude = -117.892177; // <- Longitude here

  var map = new GMaps({
    el: '#map-canvas',
    lat: initLatitude,
    lng: initLongitude,
    zoom: 11,
    scrollwheel: false,
    disableDefaultUI: true,
    styles:

        [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"},{"color":"#052366"},{"saturation":"-70"},{"lightness":"85"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":"-53"},{"weight":"1.00"},{"gamma":"0.98"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"-18"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#57677a"},{"visibility":"on"}]}]

    //Greyscale cities and area locations

    /*[{"stylers":[{"visibility":"on"},{"saturation":-100},{"gamma":0.54}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#4d4946"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"gamma":0.48}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"gamma":7.18}]}]*/

  });

  map.addMarker({
    lat : initLatitude,
    lng : initLongitude,
    icon: markerIcon,
    animation: 1
  });

  /*===============================================
    Toggle Menu
  ===============================================*/
  var menu = $(".menu");
  var toggleBtn = $(".toggle-btn");

/*  // Open menu midway down the page on large viewport only
  if (windowWidth > 770) {
    $('#experience').appear(function() {
      menu.addClass("show-menu");
      toggleBtn.addClass("toggle-close");
    });
    $(window).on('scroll', function(e) {
      if ($(this).scrollTop() == 0) {
        menu.removeClass("show-menu");
        toggleBtn.removeClass("toggle-close");
      }
      e.stopPropagation();
    });
  }*/

  // Show/hide menu on click
  toggleBtn.on("click", function(e) {
    if (menu.hasClass("show-menu")) {
      menu.removeClass("show-menu");
    }
    else {
      menu.addClass("show-menu");
    }
    e.stopPropagation();
  });

  // Navicon transform into X
  toggleBtn.on("click", function() {
    if (toggleBtn.hasClass("toggle-close")) {
      toggleBtn.removeClass("toggle-close");
    }
    else {
      toggleBtn.addClass("toggle-close");
    }
  });

  // Close Menu
  if (windowWidth <= 767) {
    $(document).on("click", function() {
      if (menu.hasClass("show-menu")) {
        menu.removeClass("show-menu");
      }
      if (toggleBtn.hasClass("toggle-close")) {
        toggleBtn.removeClass("toggle-close");
      }
    });
  }

  /*===============================================

  ===============================================*/

  $(".cell i").each(function() {
    var $this = $(this);
    $this.appear(function() {
      $this.addClass('animate');
    });
  });

});