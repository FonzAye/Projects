import React, {useState} from "react"
import {Link} from "react-router-dom"
import Axios from "axios"
import './stylesLogin.css';

function Form() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const register = () => {
    if (username !== "" && password !== "") {
      Axios.post("http://localhost:3001/register", {
        username: username,
        password: password
      }).then((response) => {
        if (response.data.msg) {
          alert("User already exists!")
          window.location.href = "http://localhost:3000/register"
        } else {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
          window.location.href = "http://localhost:3000/profile"
        }
        console.log(response)
      })
    } else {
      alert("gl hacker")
    }
  }


    return(
      <div className="main">
      <p className="sign" align="center">Register</p>
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
          <input
            type="button"
            onClick={register}
            value="Register"
            className="submit"
            />
        </form><br /><br />
        </div>
    )
  }

export default Form
