global.jQuery = require('jquery');
let svg4everybody = require('svg4everybody'),
popup = require('jquery-popup-overlay'),
Imask = require('imask'),
Swiper = require('swiper'),
fancybox = require('@fancyapps/fancybox'),
Masonry = require('masonry-layout'),
imagesLoaded = require('imagesloaded'),
jQueryBridget = require('jquery-bridget'),
Simplebar = require('simplebar'),
Tabslet = require('tabslet');

jQuery(document).ready(function($) {

  jQueryBridget( 'masonry', Masonry, $ );

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

  // Youtube Video Lazy Load
  let findVideos = function() {
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  };

  let setupVideo = function (video) {
    let link = video.querySelector('.video__link');
    let button = video.querySelector('.video__button');
    let id = parseMediaURL(link);

    video.addEventListener('click', function() {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    let source = "https://img.youtube.com/vi/"+ id +"/maxresdefault.jpg";
    let image = new Image();
    image.src = source;
    image.classList.add('video__media');

    image.addEventListener('load', function() {
      link.append( image );
    } (video) );
  
    link.removeAttribute('href');
    video.classList.add('video--enabled');
  };

  let parseMediaURL = function(media) {
    let regexp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    let url = media.href;
    let match = url.match(regexp);

    return match[5];
  };

  let createIframe = function(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  };

  let generateURL = function(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  };

  // Sliders
  let repeatSlider = function() {
    let sliders = $('.product-card-slider');

    if (sliders.length) {

      sliders.each(function(i, el) {
        let $this = $(this);
        $this.addClass("product-card-slider-" + i);
        $this.find('a').addClass("product-card-slider__link-" + i);
        $this.next().addClass("product-card-thumb-slider-" + i);

        var productCardSlider = 'productCardSlider' + i;

        window[productCardSlider] = new Swiper('.product-card-slider-' + i, {
          spaceBetween: 30,
          thumbs: {
            swiper: {
              el: '.product-card-thumb-slider-' + i,
              slidesPerView: 5,
              spaceBetween: 4,
              breakpoints: {
                1200: {
                  slidesPerView: 4
                },
                992: {
                  slidesPerView: 3
                },
                767: {
                  slidesPerView: 5
                },
                480: {
                  slidesPerView: 3
                },
              }
            }
          }
        });

      });

      sliders.each(function(i, el) {
        $().fancybox({
          selector : '.product-card-slider__link-' + i,
          thumbs   : false,
          hash     : false,
          loop: true,
          beforeClose : function(instance) {
            if ($('.product-card-slider-' + i).length) {
              var productCardSlider = 'productCardSlider' + i;
              window[productCardSlider].slideTo( instance.currIndex);
            }
          }
        });
      });

    }

  };

  let productSlider = new Swiper('.product-slider', {
    spaceBetween: 30,
    thumbs: {
      swiper: {
        el: '.product-thumb-slider',
        slidesPerView: 5,
        spaceBetween: 4,
        breakpoints: {
          992: {
            slidesPerView: 4
          },
          767: {
            slidesPerView: 5
          },
          480: {
            slidesPerView: 3
          },
        }
      }
    }
  });

  $().fancybox({
    selector : '.product-slider__link',
    thumbs   : false,
    hash     : false,
    loop: true,
    beforeClose : function(instance) {
      if ($('.product-slider').length) {
        productSlider.slideTo( instance.currIndex);
      }
    }
  });

  new Swiper('.product-gallery-slider', {
    spaceBetween: 30,
    slidesPerView: 3,
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      767: {
        slidesPerView: 2
      },
      576: {
        slidesPerView: 1
      },
    }
  });

  // Masonry
  let grid = $('.problem-list').masonry({
    itemSelector: '.problem-list__item',
    columnWidth: '.problem-list__item:last-child'
  });

  let masonryResize = function () {
    if($('.problem-list').length) {
      let defaultSize = $('.problem-list__item:last-child').outerWidth();
      let defaultWidth = $('.problem-list__item');
      let height50 = $('.problem-list__item--50');
      let height100 = $('.problem-list__item--100');

      if ($(window).width() < 768) {
        defaultWidth.css('height', defaultSize / 1.69);
        height50.css('height', defaultSize / 1.69);
        height100.css('height', defaultSize / 1.69);
      }
      else {
        defaultWidth.css('height', defaultSize / 1.678);
        height50.css('height', defaultSize / 1.12);
        height100.css('height', (defaultSize / 1.68) * 3);
      }
    }
  }

  let imgLoad = new imagesLoaded($('.problem-list'));

  imgLoad.on( 'progress', function( instance, image ) {
    grid.masonry('layout');
  });

  // Disable hover on scroll
  let disableHover = function() {
    let body = document.body,
    timer;

    window.addEventListener('scroll', function() {
      clearTimeout(timer);
      if(!body.classList.contains('disable-hover')) {
        body.classList.add('disable-hover')
      }
      
      timer = setTimeout(function(){
        body.classList.remove('disable-hover')
      }, 200);
    }, false);
  };

  let toggleAdvantages = function() {
    let items = $('.advantages-list__item');
    let btn = $('.s-advantages__btn');

    if(items.length) {

      items.each(function(i, el) {
        if (i >= 3) {
          $(this).hide();
        }
      });

      btn.click(function(e) {
        e.preventDefault();
        items.each(function(i, el) {
          if (i >= 3) {
            $(el).slideDown();
          }
        });
        $(this).fadeOut();
      });

    }
  };

  // Tabs
  $('.product-tabs').tabslet({
    animation: true
  });

  // Accordion
  let accordion = function() {
    let el = $('.faq-list__item');
    let elTitle = $('.faq-list__title');
    let content = $('.faq-list__content');

    $('.faq-list__item.active').find(content).slideDown(500);

    elTitle.click(function() {
      if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).next().slideUp(500);
      }
      else {
        $(this).parent().addClass('active');
        content.not($(this).next()).slideUp(500);
        elTitle.not($(this)).parent().removeClass('active');
        $(this).next().slideDown(500);
      }
    });
  };

  // Send forms
  var getProductNameCard = function() {
    var productName;
    $('.product-order_open').click(function() {
      productName = $(this).parents('.product-card').find('.product-card__title').text();
      $('#product-order input[name="product_name"]').val(productName);
    });
  };

  var getProductName = function() {
    var productName;
    $('.product-order_open').click(function() {
      productName = $(this).parent().find('.product__title').text();
      $('#product-order input[name="product_name"]').val(productName);
    });
  };

  getProductNameCard();
  getProductName();

  $('.ajax-form').submit(function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    ajaxSend($('.ajax-form'), data);
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  let openVacancy = function() {
    $('.vacancy__item .btn-flat').click(function(e) {
      e.preventDefault();

      $(this).parent().find('.vacancy__content').addClass('is-active');
    });

    $('.vacancy__content .btn-close').click(function(e) {
      e.preventDefault();

      $(this).parents('.vacancy__content').removeClass('is-active');
    });
  };

  // SVG
  svg4everybody({});

  toggleMenu();
  inputMask();
  findVideos();
  repeatSlider();
  masonryResize();
  disableHover();
  toggleAdvantages();
  accordion();
  openVacancy();

  $(window).resize(function() {
    masonryResize();
  });

});