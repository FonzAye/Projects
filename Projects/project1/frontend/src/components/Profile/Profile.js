import React from "react"
import Header from "./Header"
import ProfileCard from "./ProfileCard"
import PopUp from "./PopUp"


class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popClass: ""
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (this.state.popClass === "") {
      this.setState({
        popClass: "show"
      })
    } else {
      this.setState({
        popClass: ""
      })
    }
    const nick = localStorage.getItem('username');
    document.getElementById('nick').innerHTML = nick;
  }

  render() {
    return(
      <div className="ProfileCard">
      <PopUp
      handleClick={this.handleClick}
      {...this.state}
      />
        <Header
         handleClick={this.handleClick}
         {...this.state}
         />
        <ProfileCard />
       </div>
    )
  }
}

export default Profile
