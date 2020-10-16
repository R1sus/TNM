/* eslint-disable */
// Load jQuery from NPM
import $ from 'jquery';
import { tns } from 'tiny-slider/src/tiny-slider';
import Swiper, { Navigation, Pagination } from 'swiper';
import MagnetMouse from 'magnet-mouse';

// import Swiper styles
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination]);

window.jQuery = $;
window.$ = $;

const body = document.querySelector('body');

const slider = tns({
  container: '.intro__slider',
  items: 1,
  arrowKeys: true,
  controlsContainer: '.intro__slider-controls',
  nav: false,
  // animateOut: 'test', // TODO: add animation to slides and pagination ?
});

const mySwiper = new Swiper('.projects__slider', {
  effect: 'fade',
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slidesPerView: 2,
  slidesPerGroup: 2,
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

// preloader

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

// video 

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

// magnet btn video

let mm = new MagnetMouse({
  magnet: {
    element: '.magnet',
    distance: 50,
  },
  throttle: 15,
});

mm.init();


// cursor
var $cursor = $('.cursor'),
    $wrapper = $('body'); 

  function moveCursor(e) {
    TweenLite.to($cursor, 0.3, {
      css: {
        left: e.pageX,
        top: e.pageY
      }
    });
  }


$($wrapper).mouseover(function(e){
  e.stopPropagation();
  TweenLite.to($cursor,0.4,{scale:1,autoAlpha:1})
  $($wrapper).on('mousemove', moveCursor);
});

$($wrapper).mouseout(function(e){
    e.stopPropagation();
    TweenLite.to($cursor,0.4,{scale:0.1,autoAlpha:0})
});

$('a').hover(function(e) {
  e.stopPropagation();
  TweenLite.to($cursor,0.4,{scale:4,autoAlpha:0, skew: 3})
});

// mobile menu

const hamburger = $('.hamburger');
hamburger.on('click', clickMenuHandler);

function clickMenuHandler () {
  this.classList.toggle('is-active');
  $('body').toggleClass('disable-scroll');
  $('.mobile-nav').toggleClass('show');
};

