/* In programming, the term "utility" refers to a piece of code or a function that serves a specific purpose and provides a useful service or functionality. Utility functions are designed to perform common tasks or operations that can be reused across different parts of a program or application. They are meant to simplify and optimize code by encapsulating certain logic or behavior into a single, easily accessible function. */

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }
  return { x: posx, y: posy };
};
// Get sibilings
const getSiblings = (e) => {
  // for collecting siblings
  let siblings = [];
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild;
  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export { lerp, getMousePos, getSiblings };
