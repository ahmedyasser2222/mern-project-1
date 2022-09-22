let mongoose = require("mongoose");

let CartSchema = new mongoose.Schema(
  {
    userId:String ,
    products: [
      {
        productId:{
          type:mongoose.Schema.Types.ObjectId ,
          required:true ,
          unique:false ,
          ref:"Product"
        },
        quantity: {
          type: Number,
          default: 1,
        },
      }
    ]
  },
  {timestamps :true}
);

module.exports = mongoose.model("carts", CartSchema)
