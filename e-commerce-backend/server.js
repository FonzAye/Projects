const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');

const logger = require('./middleware/logger')


const app = express()

// in order to pass the information from the frontend 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(cookieParser())

// handle session 
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

app.use('/api', router)

router.use(logger)

// test route
router.get('/test', (req, res) => {
    res.json({msg: "welcome traveler"})
})

const productManagement = require('./routes/productManagement')
// product management
router.get('/products/loadAll', productManagement.loadAll)
router.post('/products/add', productManagement.add)

const cartManagement = require('./routes/cartManagement')
// cart management
router.get('/cart/loadAll', cartManagement.loadAll)
router.post('/cart/add', cartManagement.add)

app.listen(4000, () => {
    console.log(`Server started on 4000`);
});