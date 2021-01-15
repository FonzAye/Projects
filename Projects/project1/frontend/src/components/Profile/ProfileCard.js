import React from "react"
import './card.css'
import photo from "./aye.jpg"

function ProfileCard() {
  return (
    <div className="profile-card">
  <div className="image-container">
    <img
      src={photo}
      alt="user_no.png"
      style={{ width: "100%" }}
    />
    <div className="title">
      <h2>
        <p id="zhop">Geogre The George</p>
      </h2>
    </div>
  </div>
  <div className="main-container">
    <p>
      <i className="fa fa-briefcase info" />
      Best Coder In The
    </p>
    <p>
      <i className="fa fa-home info" />
      Odessa
    </p>
    <p>
      <i className="fa fa-phone info" />
      +38(095)-025-90-87
    </p>
    <p>
      <i className="fa fa-envelope info" />
      george_super@ukr.net
    </p>
    <hr />
    <p>
      <b>
        <i className="fa fa-asterisk info" />
        Skills
      </b>
    </p>
    <p>English</p>
    <div className="skill-bar">
      <div className="progress-bar" style={{ width: "71%" }}>
        80%
      </div>
    </div>
    <p>WordPress</p>
    <div className="skill-bar">
      <div className="progress-bar" style={{ width: "46%" }}>
        50%
      </div>
    </div>
    <p>JS</p>
    <div className="skill-bar">
      <div className="progress-bar" style={{ width: "71%" }}>
        80%
      </div>
    </div>
    <p>death</p>
    <div className="skill-bar">
      <div className="progress-bar" style={{ width: "89%" }}>
        99%
      </div>
    </div>
  </div>
</div>
  )
}

export default ProfileCard
