gsap.registerPlugin(ScrollTrigger);

const contents = document.querySelectorAll('#animation, #p1, #p2');

gsap.to(contents, {
  xPercent: -100 * (contents.length - 1),
  scrollTrigger: {
    trigger: '#horizontal-scroll-container',
    pin: true,
    scrub: 1,
  }
});
