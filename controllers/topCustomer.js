const {userOrders}=require('../models/orders')
const mongoose=require('mongoose')

async function getTopCustomers(req,res){
    try {
        const sellerId=req.token.userId
        const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
        
        const topCustomers=await userOrders.aggregate([
            
                {$match:{
                    sellerId:sellerObjectId
                }},
                {$group:{
                    _id:"$userId" ,
                    totalSpent:{$sum :"$amount"}
                }},
                {$sort:{
                    totalSpent:-1
                }}
                , {
                    $lookup: {
                        from: "users", 
                        localField: "_id", 
                        foreignField: "_id", 
                        as: "userDetails" 
                    }
                },
                {
                    $addFields: {
                        userDetail: { $arrayElemAt: ["$userDetails", 0] }
                    }
                },
                {
                    $project: {
                        _id: 1, 
                        totalSpent: 1, 
                        name: "$userDetail.username", 
                        email: "$userDetail.email"
                    }
                }
            
        ])

        return res.status(200).json({
            success:true,
            data:topCustomers,
            message:"top customers fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports={getTopCustomers}