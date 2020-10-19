/* eslint-disable */
import { gsap } from 'gsap';
import jQuery from 'jquery';
import { getMousePos, lerp } from './utils';

const $ = jQuery;

jQuery.event.special.scrolldelta = {
  delegateType: 'scroll',
  bindType: 'scroll',
  handle(e, ...rest) {
    const event = e;
    const { handleObj } = event;
    const targetData = jQuery.data(event.target);
    let ret = null;
    const elem = event.target;
    const isDoc = elem === document;
    const oldTop = targetData.top || 0;
    const oldLeft = targetData.left || 0;
    targetData.top = isDoc ? elem.documentElement.scrollTop + elem.body.scrollTop : elem.scrollTop;
    targetData.left = isDoc ? elem.documentElement.scrollLeft + elem.body.scrollLeft : elem.scrollLeft;
    event.scrollTopDelta = targetData.top - oldTop;
    event.scrollTop = targetData.top;
    event.scrollLeftDelta = targetData.left - oldLeft;
    event.scrollLeft = targetData.left;
    event.type = handleObj.origType;
    ret = handleObj.handler.apply(this, [e, ...rest]);
    event.type = handleObj.type;
    return ret;
  },
};

// Track the mouse position
let mouse = { x: 0, y: 0 };

const cutEdges = (target) => {
  const topEdge = $(target).offset().top;
  const bottomEdge = $(target).offset().top + $(target).height();
  if (mouse.y < topEdge) {
    mouse.y = topEdge;
  }
  if (mouse.y > bottomEdge) {
    mouse.y = bottomEdge;
  }
  // console.log(mouse.y, topEdge, bottomEdge);
};

export default class Cursor {
  constructor(el, target = window) {
    this.DOM = { el };
    this.DOM.el.style.opacity = 0;

    this.bounds = this.DOM.el.getBoundingClientRect();

    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.2 },
      ty: { previous: 0, current: 0, amt: 0.2 },
      scale: { previous: 1, current: 1, amt: 0.2 },
      opacity: { previous: 1, current: 1, amt: 0.2 },
    };

    this.onMouseMoveEv = () => {
      this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
      this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = mouse.y - this.bounds.height / 2;
      gsap.to(this.DOM.el, { duration: 0.9, ease: 'Power3.easeOut', opacity: 1 });
      requestAnimationFrame(() => this.render());
      target.removeEventListener('mousemove', this.onMouseMoveEv);
    };
    target.addEventListener('mousemove', this.onMouseMoveEv);

    target.addEventListener('mousemove', (ev) => {
      mouse = getMousePos(ev);
    });

    target.addEventListener('mouseenter', () => this.enter());
    target.addEventListener('mouseleave', () => this.leave());

    jQuery(window).on('scrolldelta', (e) => {
      const topDelta = e.scrollTopDelta;
      mouse.y += topDelta;
      if (target !== window) {
        cutEdges(target);
      }
    });
  }

  enter() {
    this.renderedStyles.scale.current = 1;
    this.renderedStyles.opacity.current = 1;
  }

  leave() {
    this.renderedStyles.scale.current = 0;
    this.renderedStyles.opacity.current = 0;
  }

  render() {
    this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
    this.renderedStyles.ty.current = mouse.y - this.bounds.height / 2 - window.scrollY;
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
    }

    this.DOM.el.style.transform = `translateX(${(this.renderedStyles.tx.previous)}px) translateY(${this.renderedStyles.ty.previous}px) scale(${this.renderedStyles.scale.previous})`;
    this.DOM.el.style.opacity = this.renderedStyles.opacity.previous;

    requestAnimationFrame(() => this.render());
  }
}
