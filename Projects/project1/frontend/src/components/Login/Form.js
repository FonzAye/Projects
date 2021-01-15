import React, {useState} from "react"
import {Link} from "react-router-dom"
import Axios from "axios"
import './stylesLogin.css';

function Form() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loginStatus, setLoginStatus] = useState("/login")

  const login = () => {
      Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
        logoutStatus: false
      }).then((response) => {
        if (response.data.msg) {
          alert("Something's wrong. Try again!")
        } else {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
          window.location.href = "http://localhost:3000/profile"
        }
        console.log(response);
      })
  }


    return(
      <div className="main">
      <p className="sign" align="center">Login</p>
      <form className="form1" action="/profile">
        <input
        onChange = {(e) => {
          setUsername(e.target.value)
        }}
        autoComplete="off"
        className="un "
        type="text"
        placeholder="Username"
        />
        <input
        onChange = {(e) => {
          setPassword(e.target.value)
        }}
        name="password"
        className="pass"
        type="password"
        placeholder="Password"
         />
        <Link to={loginStatus} onClick={login} className="submit">
        Log in
        </Link>
        </form><br /><br />
        </div>
    )
  }


export default Form
