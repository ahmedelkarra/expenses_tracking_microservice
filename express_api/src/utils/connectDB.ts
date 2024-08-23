import mongoose from "mongoose"



async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/expense_ease_microservices')
        console.log('Connected to DB')
    } catch (error) {
        console.log('Faild to connect to DB')
    }
}

export default connectDB