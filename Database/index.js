const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bundlin'
});

con.connect(function(err) {
  if(err) console.log(err);
  console.log("Database connected!");
});

module.exports = con;