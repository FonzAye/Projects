import React from 'react';
import Axios from "axios"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
//import logo from './logo.svg';
//import './App.css';
import L_App from './components/Landing/L_App'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Profile from './components/Profile/Profile'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    Axios.defaults.withCredentials = true
    Axios.get("http://localhost:3001/login").then((response) => {
      if(response.data.loggedIn){
        this.setState({
            isLoggedIn: response.data.user
        })
      }
    })
    if (localStorage.getItem("username")) {
      this.setState({
          isLoggedIn: true
      })
    }
  }

render() {
  if(!this.state.isLoggedIn) {
  return (
    <Router>
    <div>
    <Switch>
    <Route path="/" exact component={L_App}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={SignUp}/>
    <Route path="/profile" component={Profile}/>
    </Switch>
    </div>
    </Router>
  )
}
  if (this.state.isLoggedIn) {
   return (
     <Profile />
   )
 }
}
}


export default App;
