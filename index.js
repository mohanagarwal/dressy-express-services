var helmet = require('helmet');
var morgan = require('morgan');
var Joi = require('joi');
var logger = require('./logger');

// var productsRouter = require('./routes/staticRouter');
// var context = '/dressy/products/';

var productsRouter = require('./routes/mongodb-routes/mongodb-router');
var context = '/dressy/mongodb/products/';

var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());
app.use(context, productsRouter);

console.log(`NODE_ENV : ${process.env.NODE_ENV}`); 
console.log(`env : ${app.get('env')}`); 

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Enable Morgan...'); 
}

app.use(logger);

app.use(function(req, res, next){
    console.log('Authenticating...'); 
    next();
 })

 app.get('/', (req, res) => {   
    res.send('Hello World!!');
});


var port = process.env.PORT || 3200;
app.listen(port, () => console.log(`Listening on port ${port}...`));