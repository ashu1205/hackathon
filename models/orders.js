const mongoose=require('mongoose');
const product = require('./product');

const userOrder=new mongoose.Schema({
    orderDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    amount:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    status:{
        type:String,
        enum: ['pending', 'completed'],
        default:'pending'
    }
},{timestamps:true})
const userOrders=new mongoose.model('userOrder',userOrder)

const monthlyOrder=new mongoose.Schema({
    sellerId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    year:Number,
    month:Number,
    revenue:Number,
    buyers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})
const monthlyOrders=mongoose.model('monthlyOrder',monthlyOrder);

const dailyOrder=new mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    date:String,
    revenue:Number,
    buyers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})
const dailyOrders=mongoose.model('dailyOrder',dailyOrder);

module.exports={userOrders,dailyOrders , monthlyOrders}
