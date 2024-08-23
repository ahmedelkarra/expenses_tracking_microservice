import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import userModel from '../models/userSchema';

config()

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


const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string
    if (token) {
        try {
            const secret = process.env.JWT_SECRET as string
            const userData = jwt.verify(token, secret) as { id: string }
            if (userData) {
                const user = await userModel.findById(userData.id).select(['_id', 'first_name', 'last_name', 'email', 'username']) as IUserInfo
                if (user) {
                    req.userInfo = user
                    return next()
                } else {
                    return res.status(401).json({ message: 'Token is invalid or expired' })
                }
            } else {
                return res.status(401).json({ message: 'Token is invalid or expired' })
            }
        } catch (error) {
            return res.status(401).json({ message: 'Token is invalid or expired' })
        }
    } else {
        return res.status(401).json({ message: 'Token is missing' })
    }
}

export default verifyToken