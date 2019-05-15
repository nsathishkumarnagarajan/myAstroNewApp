var express = require('express');
var app = express();
var port = process.env.PORT || 8001;
var cors = require('cors');
var jwt = require('jsonwebtoken');
var dbconn = require('./connectionMysql');
var getGaugeData = require('./gaugeData');

app.use(cors());

var gaugeInstance = new getGaugeData(dbconn);
var header = {
    'alg' : 'RS256',
    'type' : 'JWT'
}
var payLoad = {
	'name' : 'Shhhhh',
	'Price' : '100000',
	'Dept' : 'R&D',
	'contact' : '0123456789'
};

app.get('/gauge/:id?', (req, res) => {
    var id = req.params.id;
    if(id !== undefined) {
        gaugeInstance.getDataById(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    else {
        gaugeInstance.getAllData()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
});

app.get('/authentication', (req, res) => {
    var output = [];
    var arrToObject = {};
    gaugeInstance.getAllData()
    .then((data) => {
        arrToObject['data'] = data;
        jwt.sign(arrToObject, '0123456789', (err, token) => {
            if(err) {
                console.log(err);
                output.push({
                    'resp' : 'error',
                    'msg' : 'jwt_error',
                    'err' : err
                });
                res.send(output);
            }
            else {
                output.push({
                    'resp' : 'success',
                    'data' : token
                });
                res.send(output);
            }
        });
    })
    .catch((err) => {
        output.push({
            'resp' : 'error',
            'msg' : 'req data catch error',
            'err' : err
        });
        res.send(output);
        console.log(err);
    });
    jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJpZF9nYXVnZSI6MSwiZF92YWx1ZSI6MTUsInN0YXR1cyI6MSwiY3JlYXRlZF9hdCI6IjIwMTktMDUtMDNUMTA6NDI6MDAuMDAwWiJ9LHsiaWRfZ2F1Z2UiOjIsImRfdmFsdWUiOjE0LjUsInN0YXR1cyI6MSwiY3JlYXRlZF9hdCI6IjIwMTktMDUtMDZUMDc6MzI6MDAuMDAwWiJ9XSwiaWF0IjoxNTU3Mzg2MDAxfQ.htlBubAXqV3S7pukXkBY_LNssuCXYa46_ysUan9Dto0", "0123456789", (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
});

app.listen(port, () => {
    console.log('app started');
});