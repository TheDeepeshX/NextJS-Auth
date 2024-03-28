import mongoose from "mongoose";

export async function connect(){
    try{
    mongoose.connect(process.env.MONGO_URI!)
    var connection= mongoose.connection
    connection.on('connected',()=>{
        console.log("MongoDB connected");
        
    })
    connection.on('error',(err)=>{
        console.log("MongoDB connection Error check the Data-base",err);
        process.exit()
    })
    }
    catch(e)
    {
        console.log("somthing went wrong in DB",e);
        
    }
    
}