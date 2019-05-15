var express = require('express');
var server = express();
var router = express.Router();
var port = process.env.PORT = 8082;

var sample = (req, res, next) => {
	//console.log(req.id);
	var id = req.id;
	var customerName = req.customerName;
	var data = {
		'id' : id,
		'name' : customerName
	};
	res.status(200).send(data);
}

server.get('/data/:id/:customerName', function(req, res, next) {
	var id = req.params.id;
	var customerName = req.params.customerName;
	req.id = id;
	req.customerName = customerName;
	//res.send(id);
	next();
});
/*server.use('/data', function(req, res, next) {
	var id = req.id;
	res.status(id).send(id);
});*/

server.use(sample);

server.listen(port, () => {
	console.log('server started');
});