import React, {useRef, useEffect} from "react"
import "./stylesSlide.css"
import gsap from "gsap"


function Slide() {
  let tl = useRef()

  useEffect(() => {
    tl.current = gsap.timeline({defaults: {ease: 'power1.out'}})
    tl.current.to(".text", {y: "0%", duration: 1, stagger: 0.25})
    tl.current.to(".slider", {y: "-100%", duration: 1.5, delay: 0.5})
    tl.current.to(".intro", {y: "-100%", duration: 1}, "-=1")
    tl.current.fromTo(".landing", {opacity: 0}, {opacity: 1, duration:1})
  })
  //tl.to(".text", {y: "0%", duration: 1})

  return (
    <div className="slideComponent">
      <div className="intro">
        <div className="intro-text">
          <h1 className="hide">
            <span className="text">Always</span>
          </h1>
          <h1 className="hide">
            <span className="text">Give</span>
          </h1>
          <h1 className="hide">
            <span className="text">Up</span>
          </h1>
        </div>
      </div>
    <div className="slider"></div>
    </div>
    )
}

export default Slide
