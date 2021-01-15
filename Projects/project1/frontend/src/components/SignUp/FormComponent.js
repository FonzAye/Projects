import React from "react"
import './stylesLogin.css';


function FormComponent(props) {
  return (
    <div className="main">
    <p className="sign" align="center">Sign up</p>
    <form className="form1" action="/profile">
      <input
      autoComplete="off"
      name="login"
      onChange={props.handleChange}
      value={props.login}
      className="un "
      type="text"
      align="center"
      placeholder="Username"
      />
      <input
      autoComplete="off"
      name="email"
      onChange={props.handleChange}
      value={props.email}
      className="un "
      type="text"
      align="center"
      placeholder="Email"
      />
      <input
      name="password"
      onChange={props.handleChange}
      value={props.password}
      className="pass"
      type="password"
      align="center"
      placeholder="Password"
       />
      <a
      href="/profile"
      className="submit"
      onClick={props.handleSubmit}
      align="center">Sign up
      </a>
      </form><br /><br />

      </div>
  )
}

export default FormComponent
