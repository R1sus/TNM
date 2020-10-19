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
    animateIntro();
  }
};

// const beginLoad = setInterval(load, 30);

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

const animateIntro = () => {
  const DOM = getDOM();
  const {
    title,
    description,
  } = DOM.intro;
  const tl = new TimelineLite();
  tl.to(
    title,
    animationConfig,
  ).to(
    description,
    {
      ...animationConfig,
      stagger: 0.01,
    },
    '-=1',
  );
};

const animateAbout = () => {
  const DOM = getDOM();
  const {
    title,
    text,
    img,
  } = DOM.about;

  const tl = new TimelineLite();
  tl.to(title, animationConfig, '-=1')
    .to(text, animationConfig, '-=0.5')
    .to(img, imgAnimationConfig, '-=1');
};

const animateProjects = () => {
  const DOM = getDOM();
  const {
    title
  } = DOM.projects;
  const tl = new TimelineLite();
  tl
    .to(title, animationConfig);
};

const animateTiny = () => {
  const DOM = getDOM();
  const {
    title,
    images,
  } = DOM.tiny;
  const tl = new TimelineLite();
  tl
    .to(title, animationConfig)
    .to(images, imgAnimationConfig, '-=1');
};

const animateCards = () => {
  const DOM = getDOM();
  const {
    title,
  } = DOM.cards;
  const tl = new TimelineLite();
  tl
    .to(title, animationConfig);
};

const animateAboutMe = () => {
  const DOM = getDOM();
  const {
    title
  } = DOM.aboutMe;
  const tl = new TimelineLite();
  tl
    .to(title, animationConfig);
};

const animatePodcasts = () => {
  const DOM = getDOM();
  const {
    title,
    subT,
    text,
  } = DOM.podcasts;
  const tl = new TimelineLite();
  tl
    .to(title, animationConfig)
    .to(subT, animationConfig, '+=0.5')
    .to(text, imgAnimationConfig, '+=0.7');
};

let scroll = null;
const onLocomotiveScroll = (e) => {
  const DOM = getDOM();
  const winHeight = $(window).height();
  if ($(DOM.about.self).offset().top < winHeight) {
    animateAbout();
  }
  if ($(DOM.projects.self).offset().top < winHeight) {
    animateProjects();
  }
  if ($(DOM.tiny.self).offset().top < winHeight) {
    animateTiny();
  }
  if ($(DOM.cards.self).offset().top < winHeight) {
    animateCards();
  }
  if ($(DOM.aboutMe.self).offset().top < winHeight) {
    animateAboutMe();
  }
  if ($(DOM.podcasts.self).offset().top < winHeight) {
    animatePodcasts();
  }
};

const initScroll = () => {
  if (!scroll) {
    scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    });
  }
  scroll.on('scroll', onLocomotiveScroll);
};


const animateAll = () => {
  animateIntro();
  animateAbout();
  animateProjects();
  animateTiny();
  animateCards();
  animateAboutMe();
  animatePodcasts();
};

setTimeout(() => {
  splitText();
  initVideo(),
  initCursor(),
  // initMagnetBtn(),
  initMobileMenu(),
  initCarousel();
  initMenu();
  initContactModal();
  setTimeout(initScroll, 100);
}, 1000);
