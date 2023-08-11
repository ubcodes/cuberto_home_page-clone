// import { gsap } from gsap
import { lerp, getMousePos, getSiblings } from "./utils.js";

// Track the mouse position
//Grab the mouse postion and set it o mouse stae

let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

export default class Cursor {
  constructor(el) {
    //variables
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.Item = document.querySelectorAll(".hero-inner-link-item"); //grabs each indiviual item of the wbsite the appsand the branding
    this.Hero = document.querySelector(".hero-inner"); //grabbing the clasneame of the querySelector "hero-inner"
    this.bounds = this.Cursor.getBoundingClientRect(); //grabbing the clinet react of the cursor,
    //we'd then set the cursor configurations
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.2 },
      y: { previous: 0, current: 0, amt: 0.2 },
      //the cusrso configuration is going to be an object specifiacally x and y which would house hte previous, the current and the amount, this is specific to our liner interpolation function.
    };
    //THEN DEFINE THE MOUSE MOVE FUNCTION
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x; //we'd ssign the cursor config of x previous to the same value taht the x config.current would ,which would have the sae value of the mouse.x, so wherever the mouse move the x value is ging to be assigned to the current. whichw would then also be assigned to the previous.

      this.cursorConfigs.y.previous = this.cursorConfigs.y.current = mouse.y; //we'd ssign the cursor config of y previous to the same value taht the y config.current would ,which would have the sae value of the mouse.y, so wherever the mouse move the y value is ging to be assigned to the current. whichw would then also be assigned to the previous.

      //SET THE OPACITY OF CURSOR TO 1 WHEN HOVERED ON SCREEN
      gsap.to(this.Cursor, {
        duration: 1,
        ease: "Power3.easeOut" /* Power3: This indicates that the easing function is a cubic function, meaning that the rate of change of the animation's progression is influenced by the cube of time.easeOut: This specifies that the easing function starts fast and then slows down towards the end of the animation. It's characterized by a smooth acceleration at the beginning followed by a gradual deceleration. */,
        opacity: 1,
      });

      //Execute Scale 
      this.onScaleMouse();

      /* 
            window.requestAnimationFrame() is a JavaScript method that's commonly used for smooth and efficient animations in web development. It's part of the Web API provided by browsers and is used to schedule a function to be executed before the next repaint of the browser window.
            "repaint" refers to the process of the browser updating the visual appearance of a portion of a web page or the entire page itself. 
*/
      requestAnimationFrame(() => this.render());
      //clean up functino - to remove the mousewhen it isn't needed anymore
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };

    //assign the mouse function to our window
    window.addEventListener("mousemove", this.onMouseMoveEv);
  }
  
    //TO SCALE MEDIA CURSOR ON HOVER 
    /* 
    we'd create a scale function called 'onScaleMouse'
    which would be triggered when hovering over an item.
    in hre wed taret this.Item and foreach in other to target each individual item and create an arrow functtion wiwth a link parameter. 
    Targeting each link, we'd add an e vent listener for when we hover onto the link ite,s
    
    */
    onScaleMouse () {

        this.Item.forEach((link) => {

            //to check if the link as a hover selector- if it does then we'd run the scale animation
        if(link.matches(":hover")) {
            this.setVideo(link);
            this.scaleAnimation(this.Cursor.children[0], 0.8)
        }

            link.addEventListener("mouseenter", ()=> {
                this.setVideo(link);
                //Gasp animation for scaling media
               this.scaleAnimation(this.Cursor.children[0],0.8)
            });
            //scale down media on hover off
            link.addEventListener("mouseleave", () => {
                this.scaleAnimation(this.Cursor.children[0], 0)
            })

            //Let's add two more event listeners
            //Hover on a tag to expand 1.2
            /* 1st -when we hover on the tag or label we want to expand the cursor to a s cale of 1.2 */
            link.children[1].addEventListener("mouseenter", () => {
                this.Cursor.classList.add("media-blend")
                this.scaleAnimation(this.Cursor.children[0], 1.2)
            })
            //then when we hover off the label
            link.children[1].addEventListener("mouseleave", () => {
                this.Cursor.classList.remove("media-blend")
                this.scaleAnimation(this.Cursor.children[0], 0.8)
            })
        });

    }
  

    //Scale Animation
    /* now, we'd take the gsap animation and create its own function because we are already using hte gsap animation several times, so we'd go ahead and create it's own function taht we can just reuse severally  */
    scaleAnimation (el, amt) {
         gsap.to(el, {
                    duration: 0.6,
                    scale: amt,
                    ease: "Power3.easeOut",
                })
    }
  
    //CHANGE MEDIA FOR CURSOR 
    //set video
   setVideo(el) {
     /* Grab the data-video-src and make sure it matches teh video aht should be displayed  */
     let src = el.getAttribute("data-video-src");
     let video = document.querySelector(`#${src}`);//determin which element matches the elemnt we hoverd on 
     let siblings = getSiblings(video);//this would run get siblings function from our utilities
    /*  console.log(src, 'Hoverd on this item')
     console.log(siblings, 'These are the siblings'); */

     //checks if the vidoe id matches the source
     if( video.id == src ) {
        //we'd tehn run a gsap animation
        gsap.set(video, { zIndex: 4, opacity: 1 })
        //we'd then loop through the siblings and set their opacity to 0
        siblings.forEach((i) => {
            gsap.set(i, { zIndex: 1, opacity: 0 });
        });
     }
   }
    

  
  
  
  //and then pass the onMouseMove Event function
  render() {
    //inside the render, we'd set the cursor config of x to current
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    //next, we'd create out lerp function
    for (const key in this.cursorConfigs) {
      //what we'd od here is to create a for loop in which it is taking key as x and y from the cursor configs. because as we're looping through the cursor configs and extracting hte keu of x and y we are going to need run a linera interpolate function.
      //Lerp - A lerp retruns the value between two numbrs ata specified, decumal midpoint: lerp simply does complex math for us,

      //we'd then set the cursor config of x and y to the lerp function
      /* we'd set the retun value of our lerp funciton to the x and the y's previous in the cursorConfigs, so we have 👇 */
      this.cursorConfigs[key].previous = lerp(
        this.cursorConfigs[key].previous, // previous for the first parameters
        this.cursorConfigs[key].current, // current for the second parameter
        this.cursorConfigs[key].amt // the taht 0.2 perscentage taht we defined as its inital
      );
    }

    //setting the cursor x and y to our cursor html element
    //we'd update it with the x and y values being quilvalent ti hte cursor config previous value 
    this.Cursor.style.transform  = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;
    //so translateX would take the cursor config of x previous and translate config would take the cursor config of Y previous 


    //then would wirte our request frame animation method
    requestAnimationFrame(() => this.render())
  }
}
