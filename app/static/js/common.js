global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
popup = require('jquery-popup-overlay'),
Imask = require('imask');

jQuery(document).ready(function($) {

  // Toggle nav menu
  let toggleMenu = function() {
    let nav = $('.header__nav');
    $('.nav-toggle').on('click', function (e) {
      e.preventDefault();
      nav.toggleClass('is-active');
    });

    $('.nav .btn-close').click(function(e) {
      e.preventDefault();
      nav.removeClass('is-active');
    });

  };

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  let inputMask = function() {
    let inputMask = $('input[type="tel"]');
    let maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };

    if (inputMask.length) {
      inputMask.each(function(i, el) {
        IMask(el, maskOptions);
      });
    }
    
  };

  // SVG
  svg4everybody({});

  toggleMenu();
  inputMask();

});