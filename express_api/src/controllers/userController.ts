import { Request, Response } from "express";
import userModel from "../models/userSchema";
import bcrypt from 'bcrypt'

interface IUserInfo {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

interface CustomRequest extends Request {
    userInfo?: IUserInfo
}

interface IUserBody {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    new_password: string;
    confirm_new_password: string;
}

const getUser = (req: CustomRequest, res: Response) => {
    return res.status(200).json({ message: req.userInfo })
}

const editUser = async (req: CustomRequest, res: Response) => {
    const id = req.userInfo?._id
    const { first_name, last_name, email, username, password, new_password, confirm_new_password } = req.body as IUserBody
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isEmail = re.test(email)

    if (!isEmail) {
        return res.status(403).json({ message: 'Please enter a valid email' })
    }

    if (first_name && last_name && isEmail && username && password) {
        const user = await userModel.findById(id)
        const userPassword = user?.password as string
        const passwordStatus = bcrypt.compareSync(password, userPassword)
        if (new_password && new_password === confirm_new_password && passwordStatus) {
            try {
                const hashPassword = bcrypt.hashSync(new_password.trim(), 12)
                await userModel.findByIdAndUpdate(id, { first_name: first_name.toLowerCase().trim(), last_name: last_name.toLowerCase().trim(), email: email.toLowerCase().trim(), username: username.toLowerCase().trim(), password: hashPassword })
                return res.status(200).json({ message: 'User has been updated' })
            } catch (error) {
                return res.status(401).json({ message: 'Token is invalid or expired' })
            }
        } else if (passwordStatus) {
            try {
                await userModel.findByIdAndUpdate(id, { first_name: first_name.toLowerCase().trim(), last_name: last_name.toLowerCase().trim(), email: email.toLowerCase().trim(), username: username.toLowerCase().trim() })
                return res.status(200).json({ message: 'User has been updated' })
            } catch (error) {
                return res.status(401).json({ message: 'Token is invalid or expired' })
            }
        } else if (new_password !== confirm_new_password) {
            return res.status(400).json({ message: 'Password is not match' })
        } else {
            return res.status(401).json({ message: 'Wrong email or password' })
        }
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
}

const deleteUser = async (req: CustomRequest, res: Response) => {
    const id = req.userInfo?._id
    const { password } = req.body as { password: string }
    try {
        const user = await userModel.findById(id)
        const userPassword = user?.password as string
        const passwordStatus = bcrypt.compareSync(password, userPassword)
        if (passwordStatus) {
            try {
                const user = await userModel.findByIdAndDelete(id)
                if (user) {
                    return res.status(200).json({ message: 'User has been deleted' })
                } else {
                    return res.status(401).json({ message: 'Token is invalid or expired' })
                }
            } catch (error) {
                return res.status(401).json({ message: 'Token is invalid or expired' })
            }
        } else {
            return res.status(401).json({ message: 'Wrong email or password' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid or expired' })
    }
}


export { getUser, editUser, deleteUser }