/* eslint-disable */
// Load jQuery from NPM
import $ from 'jquery';
import { tns } from 'tiny-slider/src/tiny-slider';
import 'swiper/swiper-bundle.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import MagnetMouse from 'magnet-mouse';
import initMagneticVideoBtn from './magnetic';
import gsap, { TimelineLite, Expo } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import LocomotiveScroll from 'locomotive-scroll';
import getDOM from './dom';

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
  if (document.querySelector('.intro__slider') !== null) {
    const slider = tns({
      container: '.intro__slider',
      items: 1,
      arrowKeys: true,
      controlsContainer: '.intro__slider-controls',
      nav: false,
      animateIn: 'show-slide',
      animateOut: 'hide-slide',
      mode: 'gallery',
      speed: 500
    });
  }

  if (document.querySelector('.project-modal__slider2') !== null) {
    const projectModalSlider = tns({
      container: '.project-modal__slider2',
      items: 1,
      arrowKeys: true,
      controlsContainer: '.project-modal__slider-controls2',
      nav: false,
      mode: 'gallery',
      speed: 800
    });
  }

  if (document.querySelector('.project-modal__slider') !== null) {
    const projectModalSlider2 = tns({
      container: '.project-modal__slider',
      items: 1,
      arrowKeys: true,
      controlsContainer: '.project-modal__slider-controls',
      nav: false,
      mode: 'gallery',
      speed: 800
    });
  }

  const mySwiper = new Swiper('.projects__slider', {
    effect: 'fade',
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
      }
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
  const cursor = document.querySelector('#cursor');
  const cursorCircle = cursor.querySelector('.cursor__circle');

  const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
  const pos = { x: 0, y: 0 }; // cursor's coordinates
  const speed = 0.1; // between 0 and 1

  const updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  window.addEventListener('mousemove', updateCoordinates);

  function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
  }

  function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
      Math.pow(diffX, 2) + Math.pow(diffY, 2)
    );
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
  }

  const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);
    
    pos.x += diffX * speed;
    pos.y += diffY * speed;
    
    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);
    
    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
    const rotate = 'rotate(' + angle +'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
  };

  function loop() {
    updateCursor();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  const cursorModifiers = document.querySelectorAll('a');

  cursorModifiers.forEach(curosrModifier => {
    curosrModifier.addEventListener('mouseenter', function() {
      const className = "hover";
      cursor.classList.add(className);
    });
  
    curosrModifier.addEventListener('mouseleave', function() {
      const className = "hover";
      cursor.classList.remove(className);
    });
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
      ...animationConfig
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
  // .to(link, {
  //   ...animationConfig,
  //   duration: 1.5,
  // }, '-=1.5');
}

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
