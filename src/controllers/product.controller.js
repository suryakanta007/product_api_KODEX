import { Product } from "../models/product.model.js"

export  async function createProduct(req,res){
    const {name,description,category,price,stock} = req.body

    if(!name||!stock||!price){
        return res.status(400).json({message:"All required fields are needed."})
    }

    const newProduct = await Product.create(
        {
            productName:name,
            description,
            category,
            price:{
                amount:Number(price)
            },
            stock:Number(stock)
        }
    )

    if(!newProduct){
        return res.status(500).json({message:"Product is not created in DB"})
    }

    return res.status(201).json({message:"Product created",
        newProduct
    })
}   