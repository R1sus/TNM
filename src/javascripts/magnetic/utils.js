// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => ({ width: window.innerWidth, height: window.innerHeight });

// Gets the mouse position
const getMousePos = (event) => {
  let posx = 0;
  let posy = 0;
  let e = event;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: posx, y: posy };
};
// eslint-disable-next-line
const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

const distance = (x1, y1, x2, y2) => {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.hypot(a, b);
};

// Generate a random float.
const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

export {
  map,
  lerp,
  calcWinsize,
  getMousePos,
  distance,
  getRandomFloat,
  clamp,
};
