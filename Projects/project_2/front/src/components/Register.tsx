import React, {useState} from "react"
import '../styles/AddElement.css'
import Axios from "axios"

interface Props {
  handleShow_register: () => void
  popClass_register: string
}

export const Register: React.FC<Props> = (props) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const register = () => { // для кнопки register
      Axios.defaults.withCredentials = true  
      Axios.post("http://localhost:4000/api/register", {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.code != 200) {
          alert("User already exists")
        } else {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
          window.location.href = "http://localhost:3000"
        }
        console.log(response)
      })
  }

    
    return (
        <div className={`popup__register ${props.popClass_register}`}>
            <div className="popup__body">
                <div className="popup__content">
                  <div className="popup__close" onClick={props.handleShow_register}>X</div>
                  <h1>Register</h1>
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
                  <input type="button" className="btn" value="Register" onClick={register}/>
                </div>
            </div>
        </div>
    )
};