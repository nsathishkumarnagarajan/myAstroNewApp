var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'mysql123$',
    database : 'test'
});
/* connection.connect((err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('connection success');
    }
}); */
module.exports = connection;