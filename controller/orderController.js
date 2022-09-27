const Order=require("../model/Order")
const Product=require("../model/Products")

const asyncErrorPattern=require("../middelware/asyncError");
const ErrorHander=require("../utile/errorhandler")


const setOrder=asyncErrorPattern(
    async(req,res,nxt)=>{
        req.body.userId = req.user._id
        console.log(req.body)
        await new Order(req.body).save()
        res.status(200).json({message:"Order Successfully"})
    }
)
const getAllOrdersbyAdmin=asyncErrorPattern(
    async(req,res,nxt)=>{
        const orders=await Order.find({})
        .populate("products.productId", "title image price")
        if(!orders)  nxt(new ErrorHander("Not Found orders",401))
        res.status(200).json({orders})
    }
)
const deleteOrder=asyncErrorPattern(
    async(req,res,nxt)=>{
         const order =await Order.findOneAndDelete({_id:req.params.id})
         if(!order) return nxt(new ErrorHander("Order not found",401))
         res.status(200).json({message:"Order deleted , Successfully"})
    }
)
const getMyOrders=asyncErrorPattern(
    async(req,res,nxt)=>{
        const orders=await Order.find({userId:req.user._id})
        .select("price products countProducts status createdAt")
        .populate("products.productId", "title image price")
        if(!orders) return nxt(new ErrorHander("you not have orders",401))  
        res.status(200).json({message:"success" , orders})
    }
)


module.exports={setOrder , getAllOrdersbyAdmin ,deleteOrder , getMyOrders}