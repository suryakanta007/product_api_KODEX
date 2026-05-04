import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:"No Description."
    },
    category:{
        type:String,
        enum:["KIDS","MENS","WOMENS"],
        default:"MENS"
    },
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            enum:["INR","USD"],
            default:"INR"
        }
    },
    stock:{
        type:String,
        required:true
    }
},{
    timestampas:true
})

export const Product = mongoose.model("products",productSchema);