const {userOrders}=require('../models/orders')
const User=require('../models/user')
const nodemailer = require("nodemailer");
require("dotenv").config();
const sendReminder = async (req,res) => {
    try {
        // 
        const sellerId=req.token.userId
        const threeDaysAgo = new Date(Date.now() - 60* 1000);

        // pending orders
        const pendingOrders = await userOrders.find({
            sellerId:sellerId,
            status: 'pending',
            createdAt: { $lte: threeDaysAgo }
        });

        // 
        const userIds = pendingOrders.map(order => order.userId);
        // console.log(pendingOrders);
        // 
        const users = await User.find({ _id: { $in: userIds } }).populate('email');

        // 
        const emails = users.map(user => user.email);

        sendMail(emails[0])
        console.log(emails[1]);
        console.log('Emails:', emails);
        return res.status(200).json({
            success:true,
            data:emails
        })
    } catch (error) {
        console.error('Error sending reminder emails:', error.message);
        return res.status(500).json({
            success:false ,
            message:error.message
        })
    }
};

function sendMail(email) {
    
    try {
        console.log(process.env.EMAIL);
        const transporter = nodemailer.createTransport({
            service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
          
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email With React And Nodejs",
            html: '<h1>Congratulation</h1> <h1> You successfully sent Email </h2>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
};
module.exports={sendReminder}
