const mongoose=require('mongoose');

require('dotenv').config()

async function dbConnection(){
    try {
        let connect=await mongoose.connect(process.env.DB_URL);
        console.log("db connected successfully");
    } catch (error) {
        console.log("db connection failed with error ->"+error);
    }
}

module.exports=dbConnection;