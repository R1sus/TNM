// Load jQuery from NPM
import $ from 'jquery';
import { tns } from 'tiny-slider/src/tiny-slider';
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';

Swiper.use([Navigation, Pagination]);

window.jQuery = $;
window.$ = $;

// $(document).ready(() => {
//   $('.preloader__counter-count').animate({
//     counter: $(this).text(),
//   }, {
//     duration: 10000,
//     easing: 'easeOutExpo',
//     step: (step) => {
//       console.info(step);
//       $(this).text('=');
//     },
//   });
// });

// eslint-disable-next-line no-unused-vars
const slider = tns({
  container: '.intro__slider',
  items: 1,
  arrowKeys: true,
  controlsContainer: '.intro__slider-controls',
  nav: false,
  // animateIn: 'test',
  // animateOut: 'test', // TODO: add animation to slides and pagination ?
});

// eslint-disable-next-line no-unused-vars
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
});
