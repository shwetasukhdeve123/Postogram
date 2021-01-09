const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userschema =new mongoose.Schema({
    name:{
         type:String,
         required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    followers:[{type:ObjectId,req:"User"}],
    following:[{type:ObjectId,req:"User"}],
    pic:{
         type:String,
         default:"https://res.cloudinary.com/dagpgmeza/image/upload/v1610106109/defalut_pic_ae18yt.jpg"
    }
    
    
})
mongoose.model('User',userschema)