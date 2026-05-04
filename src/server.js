import {config} from "dotenv";
import {app} from "./app.js";
import { connectDB } from "./config/Database.js";

config();

const PORT = process.env.PORT||3000

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`App is listen on http://localhost:${PORT}`)
    })
})

