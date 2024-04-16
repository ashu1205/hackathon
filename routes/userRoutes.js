const express=require('express')
const router=express.Router();

//import controllers
const {signup,signin}=require('../controllers/user')
const {buyNow, addToCart}=require('../controllers/buynow')
//middleware
const auth=require('../middleware/auth')

// //mapping
router.post('/signin',signin)
router.post('/signup',signup)
router.get('/logout', (req, res) => {
    res.clearCookie('token').json({
        success:true,
        message:"user logged out successfully"
    });
});
//buynow
router.post('/buynow/:productId',auth,buyNow)
router.post('/addToCart/:productId',auth,addToCart)


module.exports=router