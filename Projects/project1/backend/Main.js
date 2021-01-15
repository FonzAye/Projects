const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10

const app = express()

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  key: "userId",
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24
  },
}))

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "my_app",
})

app.get("/register", (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
})

app.post("/register", (req, res) => {

  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) {console.log(err)}
    db.query("SELECT * FROM user WHERE username = ?;",
      username,
      (err, result) => {
        if(err){ console.log(err) }
        if(result.length > 0) {
          exists = true
          res.send({msg: "User already exists"})
        } else  {
            db.query("INSERT INTO user (username, password) VALUES (?,?)",
              [username, hash], (err, response) => {
                if(err) {console.log(err)}
                req.session.user = username
                res.send(username)
                console.log(req.session.user)
              }
            )
          }
      }
  )
  })
  })

app.get("/login", (req, res) => {
  console.log(req.session.logoutStatus + " 1");
  if (req.session.user && req.session.logoutStatus === false) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
})

app.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const logoutStatus = req.body.logoutStatus
  console.log(logoutStatus + "2")
  db.query(
    "SELECT * FROM user WHERE username = ?;",
    username,
    (err, result) => {
      if(err) {res.send({err: err})}
      req.session.logoutStatus = logoutStatus

      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if(err) {"err: " + err}
          if (response) {
            req.session.user = username
            console.log("hello "+req.session.user)
            res.send(username)
          } else {
            res.send({msg: "Incorrect, try again."})
          }
        })
      } else {
        res.send({msg: "User doesn't exist."})
      }
    }
  )
})

app.listen(3001, () => {
  console.log("running server")
})
