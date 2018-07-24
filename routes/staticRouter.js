var express = require('express');
var router = express.Router();
var Joi = require('joi');
var products = require('../assets/data/products');

router.get('/:id', (req, res) => {

    const product = products.find(c => c.id == req.params.id);

    if(!product) return res.send({});;

    res.send(product);
});


router.get('/', (req, res) => {
    var size = req.query.size;
    console.log("size=" + size);
    var type = req.query.type;
    console.log("type=" + type);

    if((size == undefined || size == "") && (type == undefined || type == "")){
        console.log("block1");
        return res.send(products);
    }

    if((size == undefined || size == "")){
        console.log("block2");

        const product = products.filter(c => c.type == type);

        if(!product) return res.send({});;

        return res.send(product);
    }

    if((type == undefined || type == "")){
        console.log("block3");

        const product = products.filter(c => c.size == size);

        if(!product) return res.send({});;

        return res.send(product);
    }

    console.log("block4");

    const product = products.filter(c => c.size == size).filter(c => c.type == type);

    if(!product) return res.send({});;

    
    return res.send(product);
});

router.post('/', (req, res) => {

    console.log("req.body.name=" + req.body.name);

    const { error } = valiateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const product = {
        id : products.length + 1,
        name : req.body.name,
        description : req.body.name,
        price : req.body.price,
        size : req.body.size,
        type : req.body.type,
        img : req.body.img
    }
    products.push(product);
    res.send(product);
});

router.put('/:id', (req, res) => {

    let product = products.find(c => c.id == parseInt(req.params.id));

    if(!product) return res.status(404).send('Product with given id not found.');

    const { error } = valiateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    product.name = req.body.name,
    product.description = req.body.name,
    product.price = req.body.price,
    product.size = req.body.size,
    product.type = req.body.type,
    product.img = req.body.img
    
    products.push(product);
    res.send(product);
});

router.delete('/:id', (req, res) => {
    const product = products.find(c => c.id == parseInt(req.params.id));

    if(!product) return res.send({});;

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
});

function valiateProduct(product){
    const schema = {
        id : Joi.number(),
        name : Joi.string().required(),
        description : Joi.string().required(),
        price : Joi.number().required(),
        size : Joi.string().required(),
        type : Joi.string().required(),
        img : Joi.string().required()
    }

    return Joi.validate(product, schema);
}

module.exports = router;