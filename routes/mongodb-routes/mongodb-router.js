var express = require('express');
var router = express.Router();
var Joi = require('joi');
var mongodbUtil = require('./mongodb-util');

router.get('/:id', (req, res) => {

    console.log('Action1');
    console.log('req.param.id=' + req.params.id);

    mongodbUtil.getProductById(req.params.id)
        .then( (product) => {
            console.log(product);
            
            if(!product) return res.send({});
            return res.send(product);
        });

        console.log('Action1 end');
});

router.get('/', (req, res) => {

    var size = req.query.size;
    console.log("size=" + size);

    var type = req.query.type;
    console.log("type=" + type);

    if((size == undefined || size == "") && (type == undefined || type == "")){
        console.log("block1");

        mongodbUtil.getProducts()
            .then( (product) => {
                console.log(product);
                
                if(!product) return res.send({});
                return res.send(product);
            });

            console.log("block1 end");
    }

    if((size == undefined || size == "")){
        console.log("block2");

        mongodbUtil.getProductsByType(type)
            .then( (product) => {
                console.log(product);
                
                if(!product) return res.send({});
                return res.send(product);
            });          

            console.log("block2 end");
    }

    if((type == undefined || type == "")){
        console.log("block3");

        mongodbUtil.getProductsBySize(size)
            .then( (product) => {
                console.log(product);
                
                if(!product) return res.send({});
                return res.send(product);
            });

            console.log("block3 end");
    }

    console.log("block4");

    mongodbUtil.getProductsByTypeAndSize(type, size)
            .then( (product) => {
                console.log(product);
                
                if(!product) return res.send({});
                return res.send(product);
            });

            console.log("block4 end");
});

router.post('/', (req, res) => {

    console.log("req.body.name=" + req.body.name);

    const { error } = valiateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const product = {
        name : req.body.name,
        description : req.body.name,
        price : req.body.price,
        size : req.body.size,
        type : req.body.type,
        img : req.body.img
    }

    const newProduct = mongodbUtil.createProduct(product);
    res.send(newProduct);
});

router.put('/:id', (req, res) => {

    const { error } = valiateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // let product = products.find(c => c.id == parseInt(req.params.id));
    // if(!product) return res.status(404).send('Product with given id not found.');    
    
    // product.name = req.body.name,
    // product.description = req.body.name,
    // product.price = req.body.price,
    // product.size = req.body.size,
    // product.type = req.body.type,
    // product.img = req.body.img
    
    // products.push(product);
    // res.send(product);

    mongodbUtil.getProductByIdAndUpdate(req.params.id, req.body)
        .then( (product) => {
            console.log(product);
            
            if(!product) return res.send({});

            return res.send(product);
        });
});

router.delete('/:id', (req, res) => {

    mongodbUtil.getProductByIdAndDelete(req.params.id)
        .then( (product) => {
            console.log(product);
            
            if(!product) return res.send({});

            return res.send(product);
        });
});

function valiateProduct(product){
    const schema = {
        id : Joi.string(),
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