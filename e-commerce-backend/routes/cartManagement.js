const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'e-commerce_data_base'
})
connection.connect((err) => {
    if(!err) {
        console.log("Database is connected ... nn")
    } else {
        console.log("Error connecting database ... nn")
    }
})

exports.add = async (req, res) => {
    const newProduct = req.body.newProduct

    connection.query('INSERT INTO cart SET ?',
        newProduct,
        (err, result, fields) => {
            if (err) {
                res.status(400).send({
                    'msg': 'An error occured',
                    'err': JSON.stringify(err)
                })
            } else {
                res.status(200).send({
                    'success': 'product added to cart successfully'
                })
        }
    })
}

exports.loadAll = async (req, res) => {
    connection.query('SELECT * FROM cart;',
    (err, result) => {
        if (err) {
            res.status(400).send({
                "err": "error occured, " + JSON.stringify(err)
            })
        }
        if(result.length > 0) {
            res.status(200).send({result})
        }
    })
}