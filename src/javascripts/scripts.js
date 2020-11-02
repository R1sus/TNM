/* eslint-disable */
// Load jQuery from NPM
import $ from 'jquery';
import 'swiper/swiper-bundle.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import MagnetMouse from 'magnet-mouse';
import gsap, { TimelineLite, Expo } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import LocomotiveScroll from 'locomotive-scroll';
import getDOM from './dom';
import cursor from './cursor';

import initMenu from './image-hover';

Swiper.use([Navigation, Pagination]);
require('jquery-modal');

window.jQuery = $;
window.$ = $;

const body = document.querySelector('body');
const counter = document.querySelector('#counter');
const progress = document.querySelector('#progress');
let i = 1;
let t;

cursor.init();

const preloader = document.querySelector('.preloader');
let beginLoad;
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
    const tl = new TimelineLite();
    tl.to(preloader, {
      duration: 1.2,
      opacity: 0,
      y: 0,
      transformOrigin: '0% 50%',
      top: '-100vh',
      ease: Expo.easeInOut,
      stagger: 5,
    }).to(preloader, {
      visibility: 'hidden',
      zIndex: '-1',
    });
    setTimeout(() => animateIntro(), 600);  
  }
};
if (preloader !== null) {
  beginLoad = setInterval(load, 30);
}

const initCarousel = () => {

  const sliderOptions = {
    loop: true,
    speed: 1000,
    parallax: true,
    grabCursor: true,
    spaceBetween: 0,
    mousewheel: {
      releaseOnEdges: true
    },
    on: {
      init: function() {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find('.img-container')
            .attr({
              'data-swiper-parallax': 0.75 * swiper.width
            });
        }
      }
    },
    navigation: {
      nextEl: '.intro__slider-controls-btn.next',
      prevEl: '.intro__slider-controls-btn.prev'
    },
    pagination: {
      el: '.intro__slider-num',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return '0'+ current + ' / ' + '0' + total;
      },
    },
  };

  const photoSlider = new Swiper('.photo-slider', sliderOptions);

  const projectModalSlider1 = new Swiper('.project-modal__slider', {
    ...sliderOptions,
    navigation: {
      nextEl: '.project-modal__slider-controls-btn.next',
      prevEl: '.project-modal__slider-controls-btn.prev',
    },
    pagination: {
      el: '.project-modal__slider-num',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        const fill = $('.project-modal__slider').find('.fill');
        const width = (current * 100) / total;
        $(fill).css('width', `${width}%`);
        return '0'+ current + ' / ' + '0' + total;
      },
    },
  });

  const projectModalSlider2 = new Swiper('.project-modal__slider1', {
    ...sliderOptions,
    navigation: {
      nextEl: '.project-modal__slider-controls-btn.next',
      prevEl: '.project-modal__slider-controls-btn.prev',
    },
    pagination: {
      el: '.project-modal__slider-num1',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        const fill = $('.project-modal__slider1').find('.fill');
        const width = (current * 100) / total;
        $(fill).css('width', `${width}%`);
        return '0'+ current + ' / ' + '0' + total;
      },
    },
  });

  const projectsSlider = new Swiper('.projects__slider', {
    speed: 1000,
    parallax: true,
    grabCursor: true,
    mousewheel: {
      releaseOnEdges: true
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slidesPerView: 2,
    slidesPerGroup: 1,
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
        slidesPerGroup: 1,
      }
    },
    on: {
      click: function (swiper, event) {
        initProjectModal(event.target);
      },
      init: function() {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find('.projects__slider-img')
            .attr({
              'data-swiper-parallax': 0.75 * swiper.width
            });
        }
      },
    }
  });
};

const initProjectModal = (target) => {
  const slide = $(target).closest('.projects__slider-item');
  const slideNum = slide.attr("data-slide");
  $(`.project-modal.project-modal-slide-${slideNum}`).toggleClass('show');
  $(`.project-modal__close-${slideNum}`).on('click', (e) => { 
    e.preventDefault();
    $(`.project-modal.project-modal-slide-${slideNum}`).removeClass('show');
  })
}

const initVideo = () => {
  const playButton = document.getElementById('play-button');
  const video = document.getElementById('video');
  
  body.addEventListener('click', event => {
    if (event.target !== playButton && event.target !== video) {
      return
    }
    if (video.paused == true) {
      video.play();
      $('#play-button').toggleClass('pause');
    } else {
        video.pause();
        $('#play-button').toggleClass('pause');
    }
  });
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
  ease: Expo.easeOut,
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
  duration: 2.5,
  opacity: 1,
  ease: 'power2',
  stagger: 0.07,
};

const animateIntro = () => {
  const DOM = getDOM();
  const {
    title,
    author,
    description,
    slider,
    pos,
    text,
    controls,
  } = DOM.intro;
  const tl = new TimelineLite();
  tl.to(title,
    {
      ...animationConfig,
      duration: 0.9,
    },
  ).to(text, {
    ...animationConfig,
    height: 'auto',
    duration: 2,
  }, '-=0.8')
  .to(description,
    {
      ...animationConfig,
      duration: 0.8,
    },
    '-=1.5',
  ).to(author,
    {
      ...animationConfig,
    duration: 1.2,
    },
    '-=1'
  ).to(pos, 
    {
      ...animationConfig,
      duration: 1.2,
    }, '-=0.7'
  ).to(slider,
    {
      ...animationConfig,
      duration: 0.8,
      ease: 'power2',
    },
    '-=1',
  ).to(controls, 
    {
      ...animationConfig,
      duration: 0.8,
      ease: 'power2',
    }, '-=0.7');
};

const animateAbout = () => {
  const DOM = getDOM();
  const {
    title,
    text,
    img,
    subtitle,
    link,
    logo,
  } = DOM.about;

  const tl = new TimelineLite();
  tl
  .to(logo,{
      ...animationConfig,
      duration: 0.9,
    })
    // .to(img, {
    //   ...imgAnimationConfig,
    //   duration: 1.3,
    //   transform: 'scale(1)',
    //   ease: 'power2',
    // })
    .to(title, {
      ...animationConfig,
      ease: 'Power3.easeOut',
      duration: 1.5,
      stagger: '0.5',
    }, '-=0.8')
    .to(subtitle, {
      ...animationConfig,
      duration: 1.3,
      ease: 'Power3.easeOut',
    }, '-=1.5')
    .to(text, {
      ...animationConfig,
      duration: 2.5,
      ease: 'Power3.easeOut',
    }, '-=1')
    .to(link, {
      ...animationConfig,
      ease: 'Power3.easeOut',
      duration: 1.5,
    }, '-=2');
};

const animateProjects = () => {
  const DOM = getDOM();
  const {
    title,
    slider,
  } = DOM.projects;
  const tl = new TimelineLite();
  tl
    .to(title, {
      ...animationConfig,
      duration: 2,
      stagger: .1
    })
    .to(slider, imgAnimationConfig, '-=2.5');
};

const animateTiny = () => {
  const DOM = getDOM();
  const {
    title,
    images,
    description,
    quote,
    author,
    pos,
    titleA,
    subTitleA,
    text,
    link,
    lineTop,
    lineVer,
    lineBottom,
  } = DOM.tiny;
  const tl = new TimelineLite();
  tl
    .to(title, {
      ...animationConfig,
      duration: 2,
      stagger: .1
    })
    .to(lineTop, {
      ...imgAnimationConfig,
      duration: 1,
      width: '100%',
    }, '-=1.5')
    .to(lineVer, {
      ...imgAnimationConfig,
      duration: 1,
      height: 'auto',
    }, '-=1.5')
    .to(images, {
      ...imgAnimationConfig,
      duration: 1,
    }, '-=1.5')
    .to(description, { //container
      ...animationConfig,
      height: 'auto',
      duration: 2,
    }, '-=1.2')
    .to(quote,
      {
        ...animationConfig,
        duration: 1.8,
      },
      '-=1.5',
    ).to(author,
      {
        ...animationConfig,
      duration: 1.2,
      },
      '-=1'
    ).to(pos, 
      {
        ...animationConfig
      }, '-=0.7'
    )
    .to(subTitleA, {
      ...animationConfig,
      duration: 1.5,
    }, '-=1')
    .to(titleA, {
      ...animationConfig,
      duration: 1.5,
      ease: 'Power3.easeOut',
    }, '-=0.5')
    .to(text, {
      ...animationConfig,
      duration: 1.5,
      ease: 'Power3.easeOut',
    }, '-=1')
    .to(link, {
      ...animationConfig,
      ease: 'Power3.easeOut',
      duration: 1.5,
    }, '-=1')
    .to(lineBottom, {
      ...imgAnimationConfig,
      duration: 1,
      width: '100%',
    }, '-=2.5');
};

const animateCards = () => {
  const DOM = getDOM();
  const {
    title,
    text,
    container,
    card,
  } = DOM.cards;
  const tl = new TimelineLite();
  tl
    .to(title, {
      ...animationConfig,
      duration: 2,
      stagger: .1
    })
    .to(text, {
      ...animationConfig,
      duration: 2,
      ease: 'slowMo',
    }, '-=3.5')
    .to(container, {
      ...imgAnimationConfig,
      duration: 2.5,
      ease: 'power3',
    }, '-=2.5')
    .to(card, {
      opacity: 1,
      transform: "translate(0, 0) skewY(0deg)",
      ease:"Expo.easeOut", 
      duration: 0.4,
      delay: (pos) => pos * 0.09,
    }, '-=1.5');
};

const animateAboutMe = () => {
  const DOM = getDOM();
  const {
    title,
    textTitle,
    text,
    video,
    videoTitle,
  } = DOM.aboutMe;
  const tl = new TimelineLite();
  tl
    .to(title, {
      ...animationConfig,
      duration: 2,
    })
    .to(textTitle, {
      ...animationConfig,
      duration: 1.5,
    }, '-=1.5')
    .to(text, {
      ...animationConfig,
      duration: 1.5,
    }, '-=1')
    .to(video, animationConfig, '-=1')
    .to(videoTitle, {
      ...animationConfig,
      duration: 1.5,
    }, '-=0.5')
};

const animatePodcasts = () => {
  const DOM = getDOM();
  const {
    title,
    subT,
    text,
    desc,
    lineTop,
    lineVer,
    listItems,
    link,
  } = DOM.podcasts;

  const tl = new TimelineLite();
  tl
    .to(title, {
      ...animationConfig,
      duration: 2,
      stagger: .1
    })
    .to(lineTop, {
      ...imgAnimationConfig,
      duration: 1,
      width: '100%',
    }, '-=1.5')
    .to(lineVer, {
      ...imgAnimationConfig,
      duration: 1,
      height: 'auto',
    }, '-=1.5')
    .to(subT, {
      ...animationConfig,
      duration: 1.5,
    }, '-=1.5')
    .to(desc, {
      ...animationConfig,
      duration: 1.5,
      delay: (pos) => pos * 0.08,
    }, '-=1')
    .to(text,{
      ...animationConfig,
      duration: 1,
      delay: (pos) => pos * 0.08,
    }, '-=1')
    .to(listItems, {
      ...animationConfig,
      duration: 0.8,
      ease: 'Expo.easeOut',
      opacity: 1,
      delay: (pos) => pos * 0.06,
    }, '-=1.5')
    .to(link, {
      ...animationConfig,
      duration: 1.5,
    }, '-=0.5');
};

const animatePagePodcasts = () => {
  const DOM = getDOM();
  const {
    link,
    subT,
    text,
    desc,
    lineTop,
    lineVer,
    listItems,
  } = DOM.podcasts;

  const tl = new TimelineLite();
  tl.to(lineTop, {
    ...imgAnimationConfig,
    duration: 1,
    delay: (pos) => pos * 0.06,
    width: '100%',
  })
  .to(lineVer, {
    ...imgAnimationConfig,
    duration: 1,
    delay: (pos) => pos * 0.06,
    height: 'auto',
  }, '-=1.5')
  .to(subT, {
    ...animationConfig,
    duration: 1.5,
  }, '-=1.5')
  .to(desc, {
    ...animationConfig,
    duration: 1.5
  }, '-=1')
  .to(text, {...animationConfig, duration: 1 }, '-=1')
  .to(listItems, {
    ...animationConfig,
    duration: 0.8,
    ease: 'Expo.easeOut',
    opacity: 1,
    delay: (pos) => pos * 0.06,
  }, '-=1.5');
};

const animatePageManifesto = () => {
  const DOM = getDOM();
  const {
    title,
    subT,
    textB,
    articleText,
    articleTitle,
    img,
  } = DOM.manifesto;
  const tl = new TimelineLite();
  tl
    .to(title, {
      ...animationConfig,
      duration: 2,
    })
    .to(subT, {
      ...animationConfig,
      duration: 1.5,
    }, '-=1.5')
    .to(textB, {
      ...animationConfig,
      duration: 2,
      delay: (pos) => pos * 0.06,
    }, '-=1')
    .to(img, {
      ...animationConfig,
      duration: 1,
    }, '-=1')
    .to(articleTitle, {
      ...animationConfig,
      duration: 1,
      delay: (pos) => pos * 0.06,
    }, '-=0.5')
    .to(articleText, {
      ...animationConfig,
      duration: 1.2,
      delay: (pos) => pos * 0.06,
    }, '-=1');
};

let scroll = null;
const onLocomotiveScroll = (e) => {
  const DOM = getDOM();
  const winHeight = $(window).height();
  const offset = winHeight / 2;
  if($('.scroll-container').hasClass('general')) {
    animateIntro();
    if ($(DOM.about.self).offset().top < offset - 150) {
      animateAbout();
    }
    if ($(DOM.projects.self).offset().top < offset) {
      animateProjects();
    }
    if ($(DOM.tiny.self).offset().top < offset) {
      animateTiny();
    }
    if ($(DOM.cards.self).offset().top < offset) {
      animateCards();
    }
    if ($(DOM.aboutMe.self).offset().top < offset) {
      animateAboutMe();
    }
    if ($(DOM.podcasts.self).offset().top < offset) {
      animatePodcasts();
    }
  }
  if($('.scroll-container').hasClass('scroll-podcasts')) {
    if ($(DOM.podcasts.self).offset().top < offset) {
      animatePagePodcasts();
    }
  }
  if($('.scroll-container').hasClass('scroll-manifesto')) {
    // if ($(DOM.manifesto.self).offset().top < offset) {
      animatePageManifesto();
    // }
  }
};

const initScroll = () => {
  if ( document.querySelector('[data-scroll-container]') !== null ) {
    if (!scroll) {
      scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        getSpeed: true,
        getDirection: true,
        useKeyboard: true
      });
    }
    scroll.on('scroll', onLocomotiveScroll);
  }
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

const initAudio = () => {

  var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#c8c8c8',
    progressColor: '#777',
    mediaControls: true,
    responsive: true,
  });

  wavesurfer.load('videos/audio.wav');

  let isPlayed = false;

  $('#play-audio').on('click',() => {
    console.log(wavesurfer);
    if (isPlayed) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
    isPlayed = !isPlayed;
    $('#play-audio').toggleClass('pause');
  });

};

if ( document.querySelector('#waveform') !== null ) {
  initAudio();
}

setTimeout(() => {
  splitText();
  initVideo(),
  initMobileMenu(),
  initCarousel();
  initMenu();
  initContactModal();
  setTimeout(initScroll, 100);
}, 1000);
