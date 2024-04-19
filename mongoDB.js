const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// Middleware
app.use(bodyParser.json());

mongoose.connect("mongodb://0.0.0.0:27017/paniwala")      //"mongodb://0.0.0.0:27017/getngo"
.then(() => {
  console.log("conneted to mongoose")
}).catch((error) => {
  console.log("error in conneting to mongoose:- " + error);
})

const checkoutSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    company_name: String,
    email: String,
    phone: String,
    country: String,
    address: String,
    town_city: String,
    state: String,
    zip: String,
    payment_method: String,
  });

  module.exports = mongoose.model('CheckoutData', checkoutSchema);
// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//       },
//     lastName:{
//         type: String, 
//       },
//     companyName:{
//         type:String,
//       },
//     emailAddress:{
//         type: String,
//       },
//     phoneNumber:{
//         type:String,
//       },  
//     address:{
//         type:String,
//     },
//     city:{
//         type:String,
//     } 
//   })