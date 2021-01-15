import React, {useState} from 'react'
import Axios from "axios"
import '../styles/Header.css'
//import navSlide from '../js/navJs'
interface Props {
    handleShow_add: () => void 
    handleShow_login: () => void
    handleShow_register: () => void
    loggedIn: boolean
    login: string
}

const navSlide = () => {  // для того, чтоб с мобилок была приокольная анимация при открытии "бургер-меню"
    const nav = document.querySelector('.nav-links')
    const link1 = document.getElementById('li1')
    const link2 = document.getElementById('li2')
    const link3 = document.getElementById('li3')
    const link4 = document.getElementById('li4')
    const arr = [link1, link2, link3, link4]
    const burger = document.getElementById('burger')
    
    /*if(link1 != null){
        console.log(link1, link2)
        link1.style.color = "blue"
        link1.style.opacity = "1"
        link1.style.zIndex= "999"
    }*/
    arr.forEach((link, index) => {
        if(link != null && link.style.animation){
            link.style.animation = ''
        } else if(link != null) {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
    })

    burger?.classList.toggle('toggle')

    nav?.classList.toggle('nav-active')
}

const logout = () => { // для логаута
    Axios.defaults.withCredentials = true
        Axios.get("http://localhost:4000/api/logout")
        .then((response) => {
      if(response.data){
        console.log(response.data)
      } else {
          console.log("logged out")
          window.location.href = "http://localhost:3000"
          localStorage.clear()
      }
    })
}

const Header: React.FC<Props> = (props: Props) => {
    const [adress, setAdress] = useState("")
    return (
        <header>
            <nav>
                <div className="logo">
                    <h4>The Nav</h4>
                </div>
                <ul className="nav-links">
                    <li id="li1">Home</li>
                    <li id="li2">Projects</li>
                    <li id="li3"onClick={props.handleShow_add}>Add</li>
                    <li id="li4">About</li>
                </ul>
                
                {
                    props.login !== "" ? // чтоб когда игрок залогинился отображался логин вместо кнопок "логин\регистер"
                    <a href={adress} className="cta" onClick={() => {
                        if(props.login) {
                            setAdress("/")
                            logout()
                        } else {
                            setAdress("/login")
                        }
                        }}><button>{props.login ? props.login : "Login"}</button></a>
                        :
                        <div className="login-register">
                            <button id="login" onClick={props.handleShow_login}>Login</button>
                    <button id="register" onClick={props.handleShow_register}>register</button>
                        </div>
                }
                <div className="burger" id="burger" onClick={navSlide}>// собсна сам бургер меню
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </header>
    )
};

export default Header