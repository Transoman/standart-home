global.jQuery = require('jquery');
let svg4everybody = require('svg4everybody'),
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
  }

  let createIframe = function(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  let generateURL = function(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  // SVG
  svg4everybody({});

  toggleMenu();
  inputMask();
  findVideos();

});