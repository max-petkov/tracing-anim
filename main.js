const svg = document.querySelector("svg");
const circles = svg.querySelectorAll("circle");
const endLines = svg.querySelectorAll(".lines .end");
const startLine = svg.querySelector(".lines .start");

animateCircles();

  function animateCircles() {
    const tl = gsap.timeline({
        delay: 0.4,
        repeat: -1
    });

    tl
    .to(startLine,{
      strokeDashoffset: 0,
      strokeDasharray: (i, el) => {
        return el.getTotalLength();
      },
      autoAlpha: 0.45,
      duration: 0.25,
      ease: Power3.easeOut
    })
    .to(startLine, {
      autoAlpha: 0,
       duration: 0.6,
       strokeDashoffset: "-16",
       strokeDasharray: (i, el) => {
         return "0 " +  el.getTotalLength();
       },
      }, ">25%")
      .to(
      circles,
      {
        delay: 0.1,
        duration: 1.5,
        ease: Power3.easeInOut,
        motionPath: {
          path: (i, circle) => {
            const id = circle.parentElement.getAttribute("mask").slice(0, -1).split("url(#").join("");
            const line = document.querySelector(`[id="${id}"] path`);
            return line;
          },
          align: (i, circle) => {
            const id = circle.parentElement.getAttribute("mask").slice(0, -1).split("url(#").join("");
            const line = document.querySelector(`[id="${id}"] path`);
            return line;
          },
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
      }, 0)
        .fromTo(
        circles,
        {
            autoAlpha: 0,
            attr: {
            cx: (i, circle) => Number(circle.getAttribute("cx"))
            },
        },
        {
            duration: 1,
            ease: Power1.easeOut,
            autoAlpha: 1,
            attr: {
            cx: (i, circle) => Number(circle.getAttribute("cx")) + (circle.getBoundingClientRect().width / 2)
            },
        }, "<")
        .fromTo(
        circles,
        {
            attr: {
            cx: (i, circle) => Number(circle.getAttribute("cx"))
            },
        },
        {
            duration: 1,
            ease: Power1.easeIn,
            attr: {
            cx: (i, circle) => Number(circle.getAttribute("cx")) + (circle.getBoundingClientRect().width / 2)
            },
        }, "<80%")
        .fromTo(endLines,{autoAlpha: 0}, {
          strokeDashoffset: 0,
          strokeDasharray: (i, el) => {
            return el.getTotalLength();
          },
          autoAlpha: 0.55,
          duration: 0.25,
          ease: Power3.easeOut
        }, "<24%")
        .to(endLines, {
          autoAlpha: 0,
           duration: 0.6,
           strokeDashoffset: "-16",
           strokeDasharray: (i, el) => {
             return "0 " +  el.getTotalLength();
           },
          }, ">30%")


    return tl;
  }

function getRect(el) {
  const rect = el.getBoundingClientRect();
  return { 
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    right: rect.right + window.scrollX,
    width: rect.width,
    height: rect.height,
  }
}

function onResize(cb) {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  window.addEventListener("resize", function() {
    if(windowWidth !== window.innerWidth || windowHeight !== window.innerHeight) {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
      cb();
    }
  });
}

function setPosition(imgs, svg) {
  imgs.forEach(img => {
    const path = svg.querySelector(`[data-icon='${img.getAttribute("data-icon")}']`);

    img.style.position = "absolute";
    img.style.top = getRect(path).top + "px";
    img.style.left = getRect(path).left + "px";
    img.style.width = getRect(path).width + "px";
    img.style.height = getRect(path).height + "px";
    img.style.zIndex = 1;
  });
}