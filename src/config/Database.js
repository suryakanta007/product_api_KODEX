import mogoose from "mongoose";



export async function connectDB(){
    try {
        await mogoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected....");
        
    } catch (error) {
        console.log("Error is DB connect: ",error);
        process.exit(1);
        
    }
}