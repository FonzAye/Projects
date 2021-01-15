import React from "react"
import "./popup.css"

function PopUp(props) {
  return (
    <div id="popUp" className="popup" onClick={props.handleClick}>
      <span className={`popuptext ${props.popClass}`}><label>Welcome, </label><p id="nick"></p></span>
    </div>
  )
}

export default PopUp
