const express=require('express')
const router=express.Router();
const auth=require('../middleware/auth')

//import controllers
// const {createProduct,showProducts,deleteProduct,redirectToUpdate,updateProduct}=require('../controllers/productController')

const {sendReminder}=require('../controllers/reminder')
// // ************ Product CRUD routes ***********
// router.get('/createProduct',(req,res)=>{
//     res.render("createProduct.ejs")
// })
// router.post('/createProduct',createProduct)
// router.delete('/deleteProduct/:id',deleteProduct)
// router.get('/updateProduct/:id',redirectToUpdate)
// router.patch('/updateProduct/:id',updateProduct)
// // ************Product CRUD routes end ***********

// *********** mail users having items in their cart  *******//
router.post('/reminder',auth,sendReminder)

module.exports=router