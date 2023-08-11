/* import Cursor from "./cursor";
import { gsap } from "gsap";

const body = document.querySelector("body");

window.onload = () => {
  body.classList.remove("loading");
  gsap.from(body, {
    opacity: 0,
    duration: 1,
    ease: "Power3.easeInOut",
  });
  const cursor = new Cursor(document.querySelector(".cursor"));
};
 */

/* gsap object from the "gsap" library. GSAP (GreenSock Animation Platform) is a popular JavaScript animation library that helps create smooth animations and transitions. */


import Cursor from "./cursor.js";

const body = document.querySelector("body");

window.onload = () => {
    body.classList.remove("loading");
    gsap.from(body, {
        opacity: 0,
        duration: 1, 
        ease: "Power3.easeInOut",
    })
    const cursor = new Cursor(document.querySelector(".cursor"));
}


