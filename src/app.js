import express from "express"
import productRoutes from "./routes/product.routes.js"

const app = express();
app.use(express.json());

app.use("/products",productRoutes)

app.get("/",(req,res)=>{
   return  res.status(200).json({message:"ok"})
})





export {app}