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
    if (windowWidth >= 768) {
      setTimeout(function(){
        menu.addClass("show-menu");
        toggleBtn.addClass("toggle-close");
      }, 3500);
    }
    $(".menu li a, .hire-background a, #shout").on("click", function(e) {
      if (windowWidth >= 768) {
        htmlBody.animate({scrollTop: $(this.hash).offset().top - 40}, 800, "easeInOutQuart");
      }
      if (windowWidth <= 767) {
        htmlBody.animate({scrollTop: $(this.hash).offset().top - 0}, 800, "easeInOutQuart");
      }
      e.preventDefault();
    });
  });

  /*===============================================
    Contact Form
  ===============================================*/
  $("#submit").on('click',function(e) {

    //Remove message from any previous submission attempt
    $("#success").fadeOut(500, 'swing');
    $("#error").fadeOut(500, 'swing');

    //Input values
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    //Initiate validation variables
    var emailValidate = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
    var nameValid = false;
    var emailValid = false;
    var msgValid = false;

    //Name input validation
    if (name.length === 0) {
        $("#name").removeClass('success').addClass('err');
        $("#name_error").fadeIn(500, 'swing');
    } else {
        $("#name").removeClass('err').addClass('success');
        $("#name_error").fadeOut(0);
        nameValid = true;
    }

    //Email input validation
    if (emailValidate === null || email.length === 0) {
        $("#email").removeClass('success').addClass('err');
        $("#email_error").fadeIn(500, 'swing');
    } else {
        $("#email").removeClass('err').addClass('success');
        $("#email_error").fadeOut(0);
        emailValid = true;
    }

    //Message input validation
    if (message.length === 0) {
        $("#message").removeClass('success').addClass('err');
        $("#msg_error").fadeIn(500, 'swing');
    } else {
        $("#message").removeClass('err').addClass('success');
        $("#msg_error").fadeOut(0);
        msgValid = true;
    }

    //AJAX call to php mailer if all fields are validated
    if (nameValid && emailValid && msgValid) {
        //Prepare object to send to php mailer
        var data = {name: name, email: email, message: message};
        $.ajax({
            url: 'contact_form.php',
            data: data,
            type: 'POST',
            success: function (data) {
                $("#name, #email, #message").removeClass('success');
                $("#success").fadeIn(500, 'swing');
                $('#contactform').each(function () {
                    this.reset();
                });
            },
            error: function (data) {
                $("#name, #email, #message").removeClass('success');
                $("#error").fadeIn(500, 'swing');
            }
        });
        //Prevent page refresh
        e.preventDefault();
    }

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
    minZoom: 11,
    maxZoom: 11,
    clickableIcons: false,
    scrollwheel: false,
    keyboardShortcuts: false,
    disableDefaultUI: true,
    styles:

        [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"},{"color":"#052366"},{"saturation":"-70"},{"lightness":"85"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":"-53"},{"weight":"1.00"},{"gamma":"0.98"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"-18"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#57677a"},{"visibility":"on"}]}]

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
    Appear elements on scroll
  ===============================================*/

    $(".cell i").each(function() {
        var $this = $(this);
        $this.appear(function() {
            $this.addClass('animate');
        });
    });

    $(".slide .portfolio-content").each(function() {
        var $this = $(this);
        $this.appear(function() {
            $this.addClass('slide-in');
        });
    });

    $(".myemail").appear(function() {
        var email = $('<span>').text('taylorsturtz@gmail.com');
        $(this).append(email);
    });

    $(".myphone").appear(function() {
        var phone = $('<span>').text('(949) 500-3960');
        $(this).append(phone);
    });

});
