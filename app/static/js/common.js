jQuery(document).ready(function($) {
  // Toggle nav menu
  var toggleMenu = function() {
    var nav = $('.header__nav');
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

  var inputMask = function() {
    var inputMask = $('input[type="tel"]');
    var maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };

    if (inputMask.length) {
      inputMask.each(function(i, el) {
        IMask(el, maskOptions);
      });
    }
    
  };

  // Youtube Video Lazy Load
  var findVideos = function() {
    var videos = document.querySelectorAll('.video');

    for (var i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  };

  var setupVideo = function (video) {
    var link = video.querySelector('.video__link');
    var button = video.querySelector('.video__button');
    var id = parseMediaURL(link);

    video.addEventListener('click', function() {
      var iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    var source = "https://img.youtube.com/vi/"+ id +"/maxresdefault.jpg";
    var image = new Image();
    image.src = source;
    image.classList.add('video__media');

    image.addEventListener('load', function() {
      link.append( image );
    } (video) );
  
    link.removeAttribute('href');
    video.classList.add('video--enabled');
  };

  var parseMediaURL = function(media) {
    var regexp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    var url = media.href;
    var match = url.match(regexp);

    return match[5];
  };

  var createIframe = function(id) {
    var iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  };

  var generateURL = function(id) {
    var query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  };

  // Sliders
  var repeatSlider = function() {
    var sliders = $('.product-card-slider');

    if (sliders.length) {

      sliders.each(function(i, el) {
        var $this = $(this);
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

  var productSlider = new Swiper('.product-slider', {
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
  var grid = $('.problem-list').masonry({
    itemSelector: '.problem-list__item',
    columnWidth: '.problem-list__item:last-child'
  });

  var masonryResize = function () {
    if($('.problem-list').length) {
      var defaultSize = $('.problem-list__item:last-child').outerWidth();
      var defaultWidth = $('.problem-list__item');
      var height50 = $('.problem-list__item--50');
      var height100 = $('.problem-list__item--100');

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

  var imgLoad = new imagesLoaded($('.problem-list'));

  imgLoad.on( 'progress', function( instance, image ) {
    grid.masonry('layout');
  });

  // Disable hover on scroll
  var disableHover = function() {
    var body = document.body,
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

  var toggleAdvantages = function() {
    var items = $('.advantages-list__item');
    var btn = $('.s-advantages__btn');

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
  var accordion = function(item, toggle, ct) {
    var el = $(item);
    var elTitle = $(toggle);
    var content = $(ct);

    $(item + '.active').find(content).slideDown(500);

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
    var productName, productTitle;
    $('.product-card .product-order_open').click(function() {
        productTitle = $(this).parents('.product-card').find('.product-card__title a')[0];
        productName = $(productTitle).text();
        console.log(productName);
      $('#product-order input[name="product_name"]').val(productName);
    });
  };

  var getProductName = function() {
    var productName;
    $('.product .product-order_open').click(function() {
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

  // var openVacancy = function() {
  //   $('.vacancy__item .btn-flat').click(function(e) {
  //     e.preventDefault();
  //
  //     $(this).parent().find('.vacancy__content').addClass('is-active');
  //   });
  //
  //   $('.vacancy__content .btn-close').click(function(e) {
  //     e.preventDefault();
  //
  //     $(this).parents('.vacancy__content').removeClass('is-active');
  //   });
  // };

  var mobileMenuToggle = function() {
    if ($(window).width() < 993) {
      $('.nav-list__carret').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $(this).parent().next().slideToggle();
      });
    }
  };

  $('.vacancy__content').readmore({
    moreLink: '<a href="#" class="vacancy__content-more">Подробнее</a>',
    lessLink: '<a href="#" class="vacancy__content-more">Спрятать</a>',
    collapsedHeight: 150,
    beforeToggle: function(trigger, element, expanded) {
      element.toggleClass('active');
    }
  });

  // SVG
  svg4everybody({});

  toggleMenu();
  inputMask();
  findVideos();
  repeatSlider();
  masonryResize();
  // disableHover();
  toggleAdvantages();
  accordion('.faq-list__item', '.faq-list__title', '.faq-list__content');
  accordion('.service-centers-list__item', '.service-centers-list__title', '.service-centers-list__content');
  accordion('.delivery__list-item', '.delivery__list-title', '.delivery__list-content');
  // openVacancy();
  mobileMenuToggle();

  $(window).resize(function() {
    masonryResize();
  });

});