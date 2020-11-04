let domBuilt = false;

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    diffX * diffX + diffY * diffY,
  );
  const maxSqueeze = 0.15;
  const accelerator = 5000;
  return Math.min(distance / accelerator, maxSqueeze);
}
let rotateEnabled = true;
let cursor;

function onMouseEnter() {
  rotateEnabled = false;
  const className = this.getAttribute('data-cursor-class');
  cursor.classList.add(className);
}

function onMouseLeave() {
  rotateEnabled = true;
  const className = this.getAttribute('data-cursor-class');
  cursor.classList.remove(className);
}

let cursorModifiers = [];

export default {
  init: () => {
    if (!domBuilt) {
      domBuilt = true;
      cursor = document.createElement('div');
      cursor.classList.add('cursor-drag');
      cursor.innerHTML = `
        <div class="cursor-drag__inner">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="39" transform="rotate(-90 40 40)" fill="#1E1F21" />
            <ellipse rx="2" ry="2" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 60 40)" fill="white" />
            <ellipse rx="2" ry="2" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 21 40)" fill="white" />
          </svg>
        </div>
        <div class="cursor-drag__circle-copy"></div>
      `;

      document.body.appendChild(cursor);

      const cursorCircle = cursor.querySelector('.cursor-drag__inner');

      const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
      const pos = { x: 0, y: 0 }; // cursor's coordinates
      const speed = 0.1; // between 0 and 1

      const updateCoordinates = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      window.addEventListener('mousemove', updateCoordinates);

      const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);

        pos.x += diffX * speed;
        pos.y += diffY * speed;

        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);

        const scale = `scale(${1 + squeeze}, ${1 - squeeze})`;
        const rotate = `rotate(${angle}deg)`;
        const translate = `translate3d(${pos.x}px ,${pos.y}px, 0)`;

        cursor.style.transform = translate;
        if (rotateEnabled) {
          cursorCircle.style.transform = rotate + scale;
        } else {
          cursorCircle.style.transform = 'none';
        }
      };

      const loop = () => {
        updateCursor();
        requestAnimationFrame(loop);
      };

      requestAnimationFrame(loop);
    }
    cursorModifiers = document.querySelectorAll('[data-cursor-class]');
    cursorModifiers.forEach((cursorModifier) => {
      cursorModifier.addEventListener('mouseenter', onMouseEnter);
      cursorModifier.addEventListener('mouseleave', onMouseLeave);
    });
  },
  destroy: () => {
    cursorModifiers.forEach((cursorModifier) => {
      cursorModifier.removeEventListener('mouseenter', onMouseEnter);
      cursorModifier.removeEventListener('mouseleave', onMouseLeave);
    });
  },
};
