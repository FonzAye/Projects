import React from 'react'
import './stylesLanding.css';
import Slide from "./Slide"

class L_App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return(
      <div class="slide">
      <div className="landing">
        <h1>Welcome, username !</h1>
        <h4>Please, choose an option :</h4>
        <a href="/login">
          <p><span className="bg"></span><span className="base"></span><span className="text">Login</span></p>
        </a>
        <a href="/register">
          <p><span className="bg"></span><span className="base"></span><span className="text">Sign In</span></p>
        </a>
      </div>
      <Slide />
      </div>
    )
  }
}

export default L_App
