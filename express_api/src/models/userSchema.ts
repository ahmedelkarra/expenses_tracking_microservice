import mongoose from "mongoose";


interface IUserSchema {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUserSchema>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, { timestamps: true }
)

const userModel = mongoose.model('users', userSchema)

export default userModel