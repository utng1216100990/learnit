const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const config = require('./config')

const Product = require('./model/product');
const Order = require('./model/order');

mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoURL,
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/api/products', (req, res) => {
  res.header('Access-Control-Allow-Origin','*');
  Product.find().then(rec => {
    if(rec) {
      res.status(200).json(rec);
    } else {
      res.status(200).json([]);
    }
  })
})
app.get('/api/orders', (req, res) => {
  
  Order.find().then(rec => {
    if(rec) {
      res.status(200).json(rec);
    } else {
      res.status(200).json([]);
    }
  })
})
app.post('/api/checkout', (req, res) => {
 

 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  const newOrder = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    country: req.body.country,
    state: req.body.state,
    zip: req.body.zip,
    items: req.body.items.map(item => item._id) || []
  })
  newOrder.save().then(rec => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.status(200).json(rec);
    
  }, (err) => {
    res.status(500).json({error: 'error'})
    console.log("Errorsd sdf dwfdw");
  });
})
app.get("*", (req, res) => {
 
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.listen(3000, () => console.log("Listening on port 3000..."));