const express=require('express')
const router =express.Router()
const mongoose= require('mongoose')
const User=mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt  =require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')
const requirelogin=require('../middleware/requirelogin')


router.post('/signup',(req,res)=>{
    const{name,email,password,pic}=req.body
   
    if(!name || !email|| !password){
       
       return  res.status(422).json({error:"please fill all the fields "})
    }
    User.findOne({email:email}) 
    .then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error:"Account already exists "})
            
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user=new User({
                name,
                email,
                password:hashedpassword,
                pic
    
            })
            user.save()
            .then(user=>{
            res.json({message:"saved  successfully "})
              
            }) 
            .catch(err=>{
                console.log(err)
            })   
        })
        
    })
     .catch(err=>{
          console.log(err)
})   
    
}) 
 
router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please provide email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:'Invalid email or password'})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               //  res.json({message:'successfully signed in'})
               const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
               const{_id ,name,email,followers,following,pic}=savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:'Invalid email or password'})
            }
        })
    })
})

module.exports=router