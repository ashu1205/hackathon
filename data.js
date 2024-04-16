const mongoose=require('mongoose')
const Product=require('./models/product')
const User=require('./models/user')
const sellerId= new mongoose.Types.ObjectId(`661e56290cc5cd99b603da3b`)

async function getData(){
    try {
        const res=await fetch('https://dummyjson.com/products')
        const data = await res.json();
        // console.log(data);
       await processData(data.products)

    } catch (error) {
        console.log(error.message);
    }
}


const arr=[];
async function processData(data){
    try {

        const seller=await User.findById(sellerId)
       console.log(seller);
        data.forEach((item) => {
            const newItem={
                name:item.title,
                price:item.price,
                description:item.description,
                imageurl:item.thumbnail,
                category:item.category,
                rating:item.rating,
                sellerId:sellerId
            
            }
            // console.log(newItem);
            arr.push(newItem)
        });
        // console.log(arr);
        for (const item of arr) {
            const addedItem=await Product.create(item)
            seller.products.push(addedItem._id)    
        }

        seller.save()
        console.log("data inserted successfully");
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=getData;