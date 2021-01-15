import React, {useState} from "react";
import { ArrayOfRows } from './Landing';
import '../styles/AddElement.css'
import Axios from "axios"

interface Props {
  handleShow_login: () => void
  popClass_login: string
}

export const Login: React.FC<Props> = (props: Props) => {

  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loginStatus, setLoginStatus] = useState("/login")

  const login = () => { // для кнопки логина
      Axios.defaults.withCredentials = true  
      Axios.post("http://localhost:4000/api/login", {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.code != 200) {
          alert("Something's wrong. Try again!")
        } else {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
          window.location.href = "http://localhost:3000"
        }
        console.log(response)
      })
  }

    return (
        <div className={`popup__login ${props.popClass_login}`}>
            <div className="popup__body">
                <div className="popup__content">
                  <div className="popup__close" onClick={props.handleShow_login}>X</div>
                  <h1>Login</h1>
                  <div className="textbox">
                      <input 
                        autoComplete="off"
                        type="text" 
                        placeholder="Username"
                        onChange = {(e) => {
                          setUsername(e.target.value)
                        }}
                      />
                  </div>
                  <div className="textbox">
                      <input
                        type="password"
                        placeholder="Password"
                        onChange = {(e) => {
                          setPassword(e.target.value)
                        }}
                        name="password"
                      />
                  </div>
                  <input type="button" className="btn" value="Log in" onClick={login}/>
                </div>
            </div>
        </div>
    )
};


export default Login
