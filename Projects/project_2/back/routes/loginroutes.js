const mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_app'
})
connection.connect((err) => {
    if(!err) {
        console.log("Database is connected ... nn")
    } else {
        console.log("Error connecting database ... nn")
    }
})

exports.register = async (req,res) => {
    const password = req.body.password
    const encryptedPassword = await bcrypt.hash(password, saltRounds)

    var users = {
        "username": req.body.username,
        "password": encryptedPassword
    }

    connection.query('SELECT * FROM user WHERE username = ?',
        [users.username],
        (err, results, fields) => {
            if (err) {
                res.send({
                    "code": 400,
                    "failed": "error occured",
                    "err": JSON.stringify(err)
                })
            }
            if (results.length > 0) {
                res.send({
                    "code": 204,
                    "msg": "user already exists",
                })
            } else {
                connection.query('INSERT INTO user SET ?',
                    users,
                    (err, result, fields) => {
                        if (err) {
                            res.send({
                                "code": 400,
                                "failed": "error occured",
                                "err": JSON.stringify(err)
                            })
                        } else {
                            req.session.user = users
                            res.send({
                                "code": 200,
                                "success": "user registered successfully",
                            })
                        }
                    })
            }
    })  
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.send({
                err: "couldn't destroy the session due to the " + err
            })
        } else {
            res.send({
                "success": "logout success"
            })
        }
    })
}

exports.loginCheck = async (req,res) => {
    if(req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user.username,
            userId: req.session.user.id
        })
    } else {
        res.send({
            loggedIn: false,
            info: req.session.user
        })
    }
}

exports.login = async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    connection.query('SELECT * FROM user WHERE username = ?',
        [username],
        async (err, results, fields) => {
        if(err) {
            res.send({
                "code": 400,
                "failed": "error occured"
            })
        } else {
            if(results.length > 0) {
                const comparison = await bcrypt.compare(password,
                     results[0].password)
                     if(comparison) {
                         req.session.user = results[0]
                         console.log(req.session.user.username + " just logged in");
                         res.send({
                             "code": 200,
                             "success": "login successful",
                             "username": req.session.user.username,
                             "userId": req.session.user.id
                         })
                     } else {
                         res.send({
                             "code": 204,
                             "success": "username and password do not match"
                         })
                     } 
                } else {
                    res.send({
                        "code": 206,
                        "success": "Username does not exist",
                        "results": results
                    })
                }
            }
        })
    }
