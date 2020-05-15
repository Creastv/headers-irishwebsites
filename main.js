$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();

  $(window).on('scroll', function() {
    let screenRes = $(window).width();
    if (screenRes > 832 && $(window).scrollTop() >= 35) {
      $('.navbar-default').addClass('navbar-fixed');
    } else {
      $('.navbar-default').removeClass('navbar-fixed');
    }
  });
});

// fade animation
AOS.init();
// parallex
$('.my-paroller').paroller();


// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 60
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

// $(document).ready(function(){
//    $.cookieBar();
// });

$(document).ready(function() {
  $(".owl-carousel.owl-tes").owlCarousel({
    items: 1,
    dots: true,
  });
  $(".owl-carousel.owl-port").owlCarousel({
    items: 1,
    dots: true,
    loop: true
  });
});
// Wrap every letter in a span


// Wrap every letter in a span
$('.ml12 .wraper .letters').each(function() {
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({
  loop: true
})
  .add({
    targets: '.ml12 .letters-1 .letter',
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 3200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letters-1 .letter',
    translateX: [0, -30],
    opacity: [0],
    easing: "easeInExpo",
    duration: 500,
    delay: function(el, i) {
      return 100 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letters-2 .letter',
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 3200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letters-2 .letter',
    translateX: [0, -30],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1100,
    delay: function(el, i) {
      return 100 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letters-3 .letter',
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 3200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letters-3 .letter',
    translateX: [0, -30],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1100,
    delay: function(el, i) {
      return 100 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letters-4 .letter',
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 3200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
  }).add({
    targets: '.ml12 .letters-4 .letter',
    translateX: [0, -30],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1100,
    delay: function(el, i) {
      return 100 + 30 * i;
    }
  });

$(document).ready(function() {

  window.submitForm = () => {
    console.log('inside')
    const form = document.forms[0]
    const eman = document.querySelector("#eman").value
    const liame = document.querySelector("#liame").value
    const enohp = document.querySelector("#enohp").value

    fetch("https://alphasoft.ie/api_irishwebsites_contact", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body:JSON.stringify({eman:eman, liame:liame, enohp:enohp})
    }).then((res) =>  { 
      return res.json()
    }).then((data) => { 
      if(data.success) {
        let responseCont = document.querySelector("#response")
        let formContainer = document.querySelector('#form-lp-cont')
        responseCont.innerHTML = "<span> messege has been send</br>we will contact you very soon </span>"
        resetFeedbackLabels()
        form.reset() 
        formContainer.scrollIntoView()
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'event': 'offerSubmit' });
        setTimeout(() => {
          window.location = 'https://irishwebsites.ie'
        }, 3500)
      } else {
        resetFeedbackLabels()
        assignFeedback(data)
      }
    }).catch((error) => {
      console.log(error)
    })

    const assignFeedback = (data) => {
      data.errors.forEach(function(error) {
        let element = document.querySelector('label[for="'+ error.type +'"]')
        if(element) element.innerHTML = error.message
      })
    }

    const resetFeedbackLabels = () => {
      document.querySelectorAll('.validation-feedback').forEach(function(el) {
        el.innerHTML = ""
      })
    }
  }

  // Validator begining
  $('form').validate({
    rules: {
      eman: 'required',
      liame: {
        required: true,
        email: true
      },
      enohp: {
        required: {
          depends:function(){
            $(this).val($.trim($(this).val()))
            return true
          }
        }, 
        number: true
      }
    },
    messages: {
      eman: '* Fullname required',
      liame: {
        required: '* E-mail required',
        email: '* Please enter a valid email address'
      },
      enohp: {
        required: '* Phone number required',
        number: '* Please enter a valid phone number'
      }
    }, 
    submitHandler: (form) => {
      console.log('after val')
      grecaptcha.execute()
    }
  }) 
  // Validator end

})