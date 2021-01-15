const mysql = require('mysql')

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

exports.add = async (req,res) => {
    const newProject = req.body.project

    connection.query('INSERT INTO projects SET ?',
     newProject,
      (err, result, fields) => {
          if(err) {
              res.send({
                  "code": 400,
                  "failed": "error occured",
                  "err": JSON.stringify(err)
              })
          } else {
              res.send({
                  "code": 200,
                  "success": "project added successfully"
              })
          }
      })
}

exports.delete = async (req,res) => {
    const id = req.body.id

    connection.query('DELETE FROM projects WHERE id = ?;',
    id,
    (err, result, fields) => {
        if(err) {
            res.send({
                "code": 400,
                "failed": "error occured",
                "err": JSON.stringify(err)
            })
        } else {
            res.send({
                "code": 200,
                "success": "project deleted successfully"
            })
        }
    })
}

exports.edit = async (req,res) => {
    const id = req.body.id
    const author = req.body.author
    const theme = req.body.theme
    const description = req.body.description

    connection.query('UPDATE projects SET author = ?, theme = ?, description = ? WHERE id = ?;',
    [author, theme, description, id],
    (err, result, fields) => {
        if(err) {
            res.send({
                "code": 400,
                "failed": "error occured",
                "err": JSON.stringify(err)
            })
        } else {
            res.send({
                "code": 200,
                "success": "project edited successfully"
            })
        }
    })
}

exports.loadAllProjects = async (req,res) => {
    connection.query('SELECT * FROM projects;',
    (err, result) => {
        if(err) {
            console.log(err)
        }
        if(result.length > 0) {
            res.send({result})
        }
    })
}

exports.likeDislike = async (req, res) => {
    
    const newRaw = req.body.newRaw

    connection.query('SELECT * FROM like_dislike WHERE projectKey = ? AND userId = ?',
        [newRaw.projectKey, newRaw.userId],
        (err, result, fields) => {
            if(err) {
                console.log("ERROR IN likeDislike: "+err)
            }
            if (result.length > 0) {
                console.log("status: the raw has been found")
                connection.query('UPDATE like_dislike SET status= ? WHERE projectKey = ? AND userId = ? ',
                    [newRaw.status, newRaw.projectKey, newRaw.userId],
                    (err, result, fields) => {
                        if(err) {
                            console.log("ERROR WHILE UPDATING: "+err)
                        } else {
                            res.send({
                                "code": 200,
                                "success": "raw edited successfully"
                            })
                        } 
                    })
            } else {
                connection.query('INSERT INTO like_dislike SET ?',
                    [newRaw],
                    (err, result, fields) => {
                        if (err) {
                            res.send({
                            "err": err
                        })                    
                        } else {
                            res.send({
                                "success": "element added successfully"
                            })
                    }
                })
            }
    })
}

exports.loadLikeDislike = async(req, res) => {
    connection.query('SELECT * FROM like_dislike;',
    (err, result) => {
        if(err) {
            console.log(err)
        }
        if(result.length > 0) {
            res.send({result})
        } else {
            res.send({"answer":"it's empty"})
        }
    })
}