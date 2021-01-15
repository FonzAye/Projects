import gsap from "gsap"


const tl = gsap.timeline({defaults: {ease: 'power1.out'}})

tl.to(".text", {y: "0%", duration: 1})
