import mongoose from "mongoose";

const connectdb = async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("connected to mongodb database");
        
    } catch (error) {
        console.log("failed to connect database");
         
    }
}

export default connectdb;