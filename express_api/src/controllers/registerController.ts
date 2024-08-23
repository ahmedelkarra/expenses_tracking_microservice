import { Request, Response } from "express";
import userModel from "../models/userSchema";
import bcrypt from 'bcrypt'
import setToken from "../utils/signToken";


interface IUserBody {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    confirm_password: string;
}

const registerController = async (req: Request, res: Response) => {
    const { first_name, last_name, email, username, password, confirm_password } = req.body as IUserBody

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isEmail = re.test(email)

    if (!isEmail) {
        return res.status(403).json({ message: 'Please enter a valid email' })
    }

    if (first_name && last_name && isEmail && username && password && password === confirm_password) {
        try {
            const hashPassword = bcrypt.hashSync(password.trim(), 12)
            const user = await userModel.create({ first_name: first_name.toLowerCase().trim(), last_name: last_name.toLowerCase().trim(), email: email.toLowerCase().trim(), username: username.toLowerCase().trim(), password: hashPassword })
            const token = setToken({ id: user?.id })
            return res.status(201).json({ message: 'User has been created', token })
        } catch (error) {
            const errorMessage = error as { message: string }
            if (errorMessage.message.includes('duplicate') && errorMessage.message.includes('email')) {
                return res.status(403).json({ message: "Email is already used" })
            } else if (errorMessage.message.includes('duplicate') && errorMessage.message.includes('username')) {
                return res.status(403).json({ message: "Username is already used" })
            } else {
                console.log(error)
                return res.status(400).json({ message: 'Something went worng' })
            }
        }
    } else if (password !== confirm_password) {
        return res.status(400).json({ message: 'Your password not match' })
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
}

export default registerController