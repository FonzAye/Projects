import React from "react"
import Axios from "axios"
import "./css_in.css"
import logo from "./logo.jpg"


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const logoImage = document.querySelector(".logo img");
    const mainNav = document.getElementById("mainNav");
    const popUp = document.getElementById("popUp")

    if(window.pageYOffset > 0){
      logoImage.style.height = "64px";
      mainNav.classList.add('bg-black');
      mainNav.classList.add('txt-white');
      popUp.style.top = "75px";
    } else{
      logoImage.style.height = "84px";
      mainNav.classList.remove('bg-black');
      mainNav.classList.remove('txt-white');
      popUp.style.top = "95px";
    }
  }

  render() {
    return (
      <header onScroll={this.handleScroll}>
    <nav id="mainNav">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <ul>
        <li>
        <p onClick={this.props.handleClick} type="button">Info</p>
        </li>
        <li>
          <a href="/" onClick={() => {
            localStorage.clear()
            Axios.post("http://localhost:3001/login", {
              username: "hello",
              password: "mthrfckr",
              logoutStatus: true
            })
            }}>
            Log Out
          </a>
        </li>
      </ul>
    </nav>
  </header>
 )
}
}

export default Header
