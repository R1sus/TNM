/* eslint-disable */
// Load jQuery from NPM
import $ from 'jquery';
import { tns } from 'tiny-slider/src/tiny-slider';
import 'swiper/swiper-bundle.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import MagnetMouse from 'magnet-mouse';
import initMagneticVideoBtn from './magnetic';
import gsap, { TimelineLite } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import LocomotiveScroll from 'locomotive-scroll';
import getDOM from './dom';

import initMenu from './image-hover';

Swiper.use([Navigation, Pagination]);

window.jQuery = $;
window.$ = $;

const body = document.querySelector('body');
const counter = document.querySelector('#counter');
const progress = document.querySelector('#progress');
let i = 1;
let t;

const load = () => {
  i++;
  counter.innerHTML = i;
  progress.style.width = `${i}%`;

  if (i === 50) {
    clearInterval(beginLoad);
    t = setInterval(load, 15);
  }
  if (i === 100) {
    clearInterval(t);
    $('.preloader').addClass('hide');
  }
};

const beginLoad = setInterval(load, 30);

const initCarousel = () => {
  const slider = tns({
    container: '.intro__slider',
    items: 1,
    arrowKeys: true,
    controlsContainer: '.intro__slider-controls',
    nav: false,
    animateIn: 'show-slide',
    animateOut: 'hide-slide',
    mode: 'gallery',
    speed: 800
  });

  const mySwiper = new Swiper('.projects__slider', {
    effect: 'fade',
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slidesPerView: 2,
    slidesPerGroup: 2,
    // parallax: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
      renderCustom: (swiper, current, total) => `${current}/${total}`,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      }
    }
  });
};

const initVideo = () => {
  const playButton = document.getElementById('play-button');
  const video = document.getElementById('video');
  
  body.addEventListener('click', event => {
    if (event.target !== playButton && event.target !== video) {
      return
    }
    if (video.paused == true) {
      video.play();
    } else {
        video.pause();
    }
  });
};

const initMagnetBtn = () => {
  let mm = new MagnetMouse({
    magnet: {
      element: '.magnet',
      distance: 50,
    },
    throttle: 15,
  });
  
  mm.init();
};

const initCursor = () => {
  var $cursor = $('.cursor'),
    $wrapper = $('body'); 

  function moveCursor(e) {
    TweenLite.to($cursor, 0.2, {
      css: {
        left: e.pageX,
        top: e.pageY
      }
    });
  }
  $('html').mouseover(function(e){
    if (e.target.tagName.toLowerCase() === 'a') {
      return
    }
    TweenLite.to($cursor,0.4,{scale:1,autoAlpha:1})
    $($wrapper).on('mousemove', moveCursor);
  });
  
  $('a').hover(
    function(e) {
      TweenLite.to($cursor,0.3,{ scale:2 })
    },
    function(e) {
      TweenLite.to($cursor,0.3,{ scale:1 })
    }
  );
};

const initMobileMenu = () => {
  const hamburger = $('.hamburger');
  hamburger.on('click', clickMenuHandler);
  
  function clickMenuHandler () {
    this.classList.toggle('is-active');
    $('body').toggleClass('disable-scroll');
    $('.mobile-nav').toggleClass('show');
  };
};

const initContactModal = () => {
  $('#contact-btn, #contact-btn-mob').on('click', (e) => {
    e.preventDefault();
    $('.contact').toggleClass('show');
  });
  $('.contact__close').on('click', (e) => {
    e.preventDefault();
    $('.contact').toggleClass('show');
  });
}

const splitText = () => {
  let splitTextSelector = '.split-text';
  let splitWordSelector = '.split-word';
  if ($(window).width() <= 1024) {
    splitTextSelector = '.split-text-mobile';
    splitWordSelector = '.split-word-mobile';
  }
  const elements = document.querySelectorAll(splitTextSelector);
  if (elements) {
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      if ($(element).hasClass('splitted')) {
        return;
      }
      element.innerHTML = `<span>${element.textContent.split('').join('</span><span>')}</span>`.replace(/ /g, '&nbsp;');
      const chars = element.querySelectorAll('span');
      for (let j = 0; j < chars.length; j += 1) {
        const char = chars[j];
        char.innerHTML = `
          <span class="visible-char">${char.textContent}</span>
          <span class="invisible-char">${char.textContent}</span>
        `;
      }
      $(element).addClass('splitted');
    }
  }
  const wordElements = document.querySelectorAll(splitWordSelector);
  if (wordElements) {
    for (let i = 0; i < wordElements.length; i += 1) {
      const element = wordElements[i];
      if ($(element).hasClass('splitted')) {
        return;
      }
      element.innerHTML = `<span>${element.textContent.split(' ').join('</span>&nbsp;<span>')}</span>`;
      const words = element.querySelectorAll('span');
      for (let j = 0; j < words.length; j += 1) {
        const char = words[j];
        char.innerHTML = `
          <span class="visible-word">${char.textContent}</span>
          <span class="invisible-word">${char.textContent}</span>
        `;
      }
      $(element).addClass('splitted');
    }
  }
};

const animationConfig = {
  duration: 0.4,
  opacity: 1,
  y: 0,
  transformOrigin: '0% 50%',
  ease: 'power2',
  stagger: 0.05,
};

const marginAnimationConfig = {
  duration: 0.4,
  marginTop: 0,
  ease: 'power2',
  stagger: 0.05,
  opacity: 1,
};

const imgAnimationConfig = {
  duration: 2,
  opacity: 1,
  ease: 'power2',
  stagger: 0.05,
};

// const DOM = getDOM();

const animateIntro = () => {
  const splitDescription = document.querySelectorAll('.intro .split-word .invisible-char');
  const slider = document.querySelector('.intro__slider');
  const tl = new TimelineLite();
  tl.to(
    splitDescription,
    animationConfig,
    '-=1',
  ).to(
    slider,
    {
      ...animationConfig,
      duration: 2,
    },
    '-=0.5',
  );
}

const animateTitle = () => {
  const splitTitle = document.querySelectorAll('.reloading__title img');
  const splitDescription = document.querySelectorAll('.reloading__description .split-text .invisible-char');
  const bg = document.querySelector('.reloading__bg');
  const tl = new TimelineLite();
  // const tlDescription = new TimelineLite();
  tl.to(
    splitTitle,
    animationConfig,
  ).to(
    splitDescription,
    animationConfig,
    '-=1',
  ).to(
    bg,
    {
      ...animationConfig,
      duration: 2,
    },
    '-=0.5',
  );
};

  // const animateBrand = () => {
  //   const {
  //     bg,
  //     headerWords,
  //     textTopChars,
  //     description,
  //     newColorsTitle,
  //     newColorsItems,
  //   } = DOM.brand;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(bg, imgAnimationConfig)
  //     .to(textTopChars, animationConfig, '-=1')
  //     .to(headerWords, animationConfig, '-=1')
  //     .to(description, animationConfig, '-=1')
  //     .to(newColorsTitle, animationConfig, '-=0.5')
  //     .to(newColorsItems, animationConfig, '-=0.5');
  // };

  // const animateVToV = () => {
  //   const {
  //     titleChars,
  //     videos,
  //   } = DOM.vToV;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(titleChars, animationConfig)
  //     .to(videos, { ...animationConfig, stagger: .1 }, '-=1');
  // };

  // const animateTer = () => {
  //   const {
  //     topLine,
  //     text,
  //     botLine,
  //     images,
  //   } = DOM.ter;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(topLine, animationConfig)
  //     .to(text, animationConfig, '-=1')
  //     .to(images, imgAnimationConfig, '-=1')
  //     .to(botLine, animationConfig, '-=2');
  // };

  // const animateGWhite = () => {
  //   const {
  //     title,
  //     text,
  //   } = DOM.g;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(title, animationConfig)
  //     .to(text, animationConfig, '-=0.5');
  // };

  // const animatePlans = () => {
  //   const {
  //     title,
  //     description,
  //   } = DOM.plans;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(title, animationConfig)
  //     .to(description, animationConfig, '-=0.5');
  // };

  // const animateE = () => {
  //   const {
  //     logo,
  //     topLine,
  //     text,
  //     bottomLine,
  //     button,
  //   } = DOM.e;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(logo, animationConfig)
  //     .to(topLine, animationConfig, '-=0.5')
  //     .to(text, animationConfig, '-=0.5')
  //     .to(bottomLine, animationConfig, '-=0.5')
  //     .to(button, animationConfig, '-=0.5');
  // };

  // const animateService = () => {
  //   const {
  //     title,
  //     description,
  //     nav,
  //     service,
  //   } = DOM.services;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(title, animationConfig)
  //     .to(description, animationConfig, '-=0.5')
  //     .to(nav, animationConfig, '-=0.5')
  //     .to(service, animationConfig, '-=0.1');
  // };

  // const animateSubService = () => {
  //   const {
  //     title,
  //     description,
  //     listItems,
  //   } = DOM.subService;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(title, animationConfig)
  //     .to(description, animationConfig, '-=0.5')
  //     .to(
  //       listItems,
  //       marginAnimationConfig,
  //       '-=0.1',
  //     );
  // };

  // const animateSafety = () => {
  //   const {
  //     title,
  //     description,
  //     blockquote,
  //     sheriff,
  //     bg,
  //   } = DOM.safety;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(title, animationConfig)
  //     .to(description, animationConfig, '-=0.25')
  //     .to(blockquote, animationConfig, '-=0.25')
  //     .to(sheriff, marginAnimationConfig, '-=0.25')
  //     .to(bg, marginAnimationConfig, '-=0.25');
  // };

  // const animateNewNav = () => {
  //   const {
  //     title,
  //     description,
  //     bg,
  //   } = DOM.newNav;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(title, animationConfig)
  //     .to(description, animationConfig, '-=0.25')
  //     .to(bg, marginAnimationConfig, '-=0.25');
  // };

  // const animateNewDirection = () => {
  //   const {
  //     title,
  //     description,
  //     bg,
  //     img,
  //   } = DOM.newDirection;
  //   const tl = new TimelineLite();
  //   tl
  //     .to(title, animationConfig)
  //     .to(description, animationConfig, '-=1.0')
  //     .to(bg, marginAnimationConfig, '-=0.75')
  //     .to(img, marginAnimationConfig, '-=0.5');
  // };

  let scroll = null;
  const onLocomotiveScroll = (e) => {
    const offsetTop = e.scroll.y;
    $(DOM.fixedLeftSide).toggleClass('scrolled', offsetTop > 100);
    if (offsetTop > 1000) {
      $(DOM.up).fadeIn();
    } else {
      $(DOM.up).fadeOut();
    }
    const winHeight = $(window).height();
    // if ($(DOM.brand.self).offset().top < winHeight) {
    //   animateBrand();
    // }
    // if ($(DOM.vToV.self).offset().top < winHeight) {
    //   animateVToV();
    // }
    // if ($(DOM.ter.self).offset().top < winHeight) {
    //   animateTer();
    // }
    // if ($(DOM.g.white).offset().top < winHeight) {
    //   animateGWhite();
    // }
    // if ($(DOM.plans.self).offset().top < winHeight) {
    //   animatePlans();
    // }
    // if ($(DOM.land.self).offset().top < winHeight) {
    //   animateLand();
    // }
    // if ($(DOM.services.self).offset().top < winHeight) {
    //   animateService();
    // }
    // if ($(DOM.subService.self).offset().top < winHeight) {
    //   animateSubService();
    // }
    // if ($(DOM.safety.self).offset().top < winHeight) {
    //   animateSafety();
    // }
    // if ($(DOM.newNav.self).offset().top < winHeight) {
    //   animateNewNav();
    // }
    // if ($(DOM.newDirection.self).offset().top < winHeight) {
    //   animateNewDirection();
    // }
    // if ($(DOM.e.self).offset().top < winHeight) {
    //   // animateE();
    //   $(DOM.scrollPlease).fadeOut();
    // } else {
    //   $(DOM.scrollPlease).fadeIn();
    // }
  };
  const initScroll = () => {
    if (!scroll) {
      scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });
      // animateIntro();
    }
    scroll.on('scroll', onLocomotiveScroll);
  };
  const onWindowScroll = () => {
    // $(DOM.mobileHeader).toggleClass('scrolled', !!$(window).scrollTop());
    // if ($(DOM.brand.self).offset().top < $(window).scrollTop()) {
      // animateBrand();
      // $(DOM.up).fadeIn();
    // } else {
      // $(DOM.up).fadeOut();
    // }
    // if ($(DOM.e.self).offset().top < $(window).height()) {
    //   animateE();
    //   $(DOM.scrollPlease).fadeOut();
    // } else {
    //   $(DOM.scrollPlease).fadeIn();
    // }
  };
  // const initialize = () => {
  //   if ($(window).width() > 1024) {
  //     initScroll();
  //   } else {
  //     $(window).on('scroll', onWindowScroll);
  //   }
  // };
  // initialize();
  // const animateAll = () => {
  //   animateTitle();
  //   animateBrand();
  //   animateVToV();
  //   animateTer();
  //   animateGWhite();
  //   animatePlans();
  //   animateLand();
  //   // animateValues();
  //   animateService();
  //   animateSubService();
  //   animateSafety();
  //   animateNewNav();
  //   animateNewDirection();
  // };
  // $(window).on('resize', () => {
  //   if (!$('html').hasClass('has-scroll-init')) {
  //     $('.main-container').css('overflow', 'hidden');
  //     splitText();
      // animateAll();
    // }
  // });
  // $(DOM.up).on('click', () => {
  //   if (scroll) {
  //     scroll.scrollTo('top');
  //   } else {
  //     window.scrollTo(0, 0);
  //   }
  // });

setTimeout(() => {
  const scrol1l = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
  });
  // initScroll(),
  initVideo(),
  initCursor(),
  // initMagnetBtn(),
  initMobileMenu(),
  initCarousel();
  initMenu();
  initContactModal();
}, 1000);
