const dailyOrders=require('../models/orders')

const monthlyOrders=require('../models/orders')


async function getRevenue(req , res){
    try {
        const sellerId=req.token.userId
        const dailyOrder=await dailyOrders.find({sellerId:sellerId})

        const monthlyOrder=await monthlyOrders.find({sellerId:sellerId})

        return res.status(200).json({
            success:true,
            daily:dailyOrder,
            monthly:monthlyOrder, 
            message:"data fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:true , 
            message:error.message
        })
    }
}

module.exports={getRevenue}