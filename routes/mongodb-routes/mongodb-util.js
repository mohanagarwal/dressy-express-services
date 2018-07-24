const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dressy-products');

const productSchema = new mongoose.Schema({
  name: String,
  description: String, 
  price: Number,
  size: String, 
  type: String,
  img: String
});

const Product = mongoose.model('Product', productSchema);

module.exports.getProducts = async function(){    
    return await Product.find();   
}

module.exports.getProductById = async function(id){    
    return await Product.findById(id);    
}

module.exports.getProductsByType = async function(type){    
    return await Product.find({ type : type });    
}

module.exports.getProductsBySize = async function(size){    
    return await Product.find({ size : size });    
}

module.exports.getProductsByTypeAndSize = async function(type, size){    
    return await Product.find({ type : type,  size : size });    
}

module.exports.getProductByIdAndDelete = async function(id){    
    return await Product.findByIdAndRemove(id);    
}

module.exports.getProductByIdAndUpdate = async function(id, product){    
    return await Product.findByIdAndUpdate(id, product);    
}

module.exports.createProduct = async function(product){

    const newProduct = new Product({
        name: product.name,
        description: product.description, 
        price: product.price,
        size: product.size, 
        type: product.type,
        img: product.img
    });

    const result = await newProduct.save();
    console.log(result);

    return result;
}

module.exports.createProducts = async function(products){

    for(var i =0; i < products.length; i++){
        var product =products[i]; 

        const newProduct = new Product({
            name: product.name,
            description: product.description, 
            price: product.price,
            size: product.size, 
            type: product.type,
            img: product.img
        });
    
        const result = await newProduct.save();
        console.log(result);
    }
    

    return true;
}




module.exports = this;