const express = require('express')
const cors = require('cors');
const login = require('./routes/loginroutes')
const bodyParser = require('body-parser')
const session = require('express-session');
// const projects = require('./routes/projects_routes')
const projects = require('./Projects/projects');
const logger = require('./middleware/logger');
const addProject = require('./routes/projectManagement');
const cookieParser = require('cookie-parser');

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser())
app.use((req, res, next) => {
    res.header("Access-Control_Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept")
     next()
})
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }))
app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 60 * 24
    },
}));

const router = express.Router()

app.use('/api', router)// !!!!!!!!!!!!!!!!!!!!!

// some middleWare that console-logs url of the request
router.use(logger)

// test route
router.get('/test', (req, res) => {
     res.json({msg: "welcome traveler"})
})

// route to handle user registration and login
router.post('/register', login.register)
router.post('/login', login.login)

//route to handle session
router.get('/login', login.loginCheck)
router.get('/logout', login.logout)

// route to handle projects
router.get('/projects', (req, res) => {
    res.json(projects)
})

// route to handle projects managment
router.post('/projects/add', addProject.add)
router.post('/projects/delete', addProject.delete)
router.post('/projects/edit', addProject.edit)
router.get('/projects/loadAll', addProject.loadAllProjects)
router.post('/projects/likeDislike', addProject.likeDislike)
router.get('/projects/loadLikeDislike', addProject.loadLikeDislike)

app.listen(4000, () => {
    console.log(`Server started on 4000`);
});