const User=require('../models/user')
const {userOrders,dailyOrders , monthlyOrders}=require('../models/orders')

async function buyNow(req,res){
    try {
        // console.log("entered");
        const userId = req.token.userId;
        console.log(req.token);
        const { sellerId } = req.query; 
        const { amount } = req.body; 
        const { productId } = req.params; 

    
        const newOrder = new userOrders({
        orderDate: new Date(),
        userId:userId,
        sellerId:sellerId,
        amount: amount,
        product: productId,
        status:"completed"
        });
    
        
        const savedOrder = await newOrder.save();

        
    updateDaily(sellerId,userId, amount)
    updateMonthly(sellerId ,userId , amount)
        
       
        console.log(userId);
        const user = await User.findByIdAndUpdate(
        {_id:userId},
        { $push: { orders: savedOrder._id } },
        {new:true}
        );

        res.json({ success: true, message: 'Order placed successfully', order: savedOrder });
}   
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function updateDaily(sellerId , userId ,amount){
    try {
        console.log("sellerId "+sellerId);
        const currentDate = new Date();
        const dateOnly = currentDate.toLocaleDateString();
        await dailyOrders.findOneAndUpdate(
            { sellerId: sellerId, date: dateOnly },
            { $inc: { revenue: amount }, $addToSet: { buyers: userId } },
            { upsert: true , new:true}
            );
    } catch (error) {
        console.log(error.message);
        return res.json({
            success:false,
            message:error.message
        })
    }
}

async function updateMonthly(sellerId , userId, amount){
    try {
        //Updating monthly and daily sales
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;


        await monthlyOrders.findOneAndUpdate(
        { sellerId: sellerId, year: year, month: month },
        { $inc: { revenue: amount }, $addToSet: { buyers: userId } },
        { upsert: true ,new: true }
        );
    } catch (error) {
        console.log(error.message);
        return res.json({
            success:false,
            message:error.message
        })
    }
}

async function addToCart(req ,res){
    try {
        const userId = req.token.userId;
        const { sellerId } = req.query; 
        const { amount } = req.body; 
        const { productId } = req.params; 

    
        const newOrder = new userOrders({
        orderDate: new Date(),
        userId:userId,
        sellerId:sellerId,
        amount: amount,
        product: productId,
        status:"pending"
        });
    
        
        const savedOrder = await newOrder.save();

        await User.findByIdAndUpdate(
            userId,
            { $push: { orders: savedOrder._id } },
            { new: true }
            );

            return res.status(200).json({
                success:true,
                message:"added to cart successfully"
            })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports={buyNow , addToCart}