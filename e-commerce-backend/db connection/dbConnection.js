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