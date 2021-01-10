const { dir } = require('console')
const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT||5000
const {mongouri} = require('./config/keys')


mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb ")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
  
if(process.env.NODE_ENV=="production"){ 
  app.use(express.static('client/build')) // if application is deployed then serve staic file from client side
  const path =require('path')
  app.get("*",(req,res)=>{ //if client is making any request ,send index.html file from build file as it contain entire react application
       res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
    
}

app.listen(PORT,()=>{
      console.log('server is running on',PORT )
 })
