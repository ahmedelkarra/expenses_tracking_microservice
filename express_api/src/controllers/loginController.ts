import { Request, Response } from "express";
import setToken from "../utils/signToken";
import userModel from "../models/userSchema";
import bcrypt from 'bcrypt'


interface IUserBody {
    emailOrUsername: string;
    password: string;
}

const loginController = async (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.body as IUserBody

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isEmail = re.test(emailOrUsername)

    if (emailOrUsername && password) {
        try {
            if (isEmail) {
                const getUserByEmail = await userModel.findOne({ email: emailOrUsername })
                if (getUserByEmail) {
                    const userPassword = getUserByEmail?.password as string
                    const passwordStatus = bcrypt.compareSync(password, userPassword)
                    if (passwordStatus) {
                        const id = getUserByEmail?.id as string
                        const token = setToken({ id: id })
                        return res.status(200).json({ message: `Welcome ${getUserByEmail?.first_name} ${getUserByEmail?.last_name}`, token: token })
                    } else {
                        return res.status(404).json({ message: 'Wrong Email or Password' })
                    }
                } else {
                    return res.status(404).json({ message: 'Wrong Email or Password' })
                }
            } else if (!isEmail) {
                const getUserByUsername = await userModel.findOne({ username: emailOrUsername })
                if (getUserByUsername) {
                    const userPassword = getUserByUsername?.password as string
                    const passwordStatus = bcrypt.compareSync(password, userPassword)
                    if (passwordStatus) {
                        const id = getUserByUsername?.id as string
                        const token = setToken({ id: id })
                        return res.status(200).json({ message: `Welcome ${getUserByUsername?.first_name} ${getUserByUsername?.last_name}`, token: token })
                    } else {
                        return res.status(404).json({ message: 'Wrong Username or Password' })
                    }
                } else {
                    return res.status(404).json({ message: 'Wrong Username or Password' })
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Something went wrong' })
        }
    } else {
        return res.status(400).json({ message: 'Please check your inputs' })
    }
}


export default loginController