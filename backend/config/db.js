import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://mazzy17:mazzy17@cluster0.uyhzm.mongodb.net/proshop?retryWrites=true&w=majority'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }


}

export default connectDB;