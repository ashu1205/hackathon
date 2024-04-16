const mongoose =require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    imageurl:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number
    }
    ,
    sellerId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    createdAt:{
        type:String,
        required:true,
        default:new Date(),
    }
    

})

module.exports=mongoose.model('Product',productSchema);