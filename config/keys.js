const { model } = require('mongoose')

if(process.env.NODE_ENV=="production"){
  module.exports= require('./prod') //when we are from client side export prod.js file
} else{
  model.exports=require('./dev') //when we are developing export dev.js file
}