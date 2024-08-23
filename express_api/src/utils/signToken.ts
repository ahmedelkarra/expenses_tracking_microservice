import jwt from 'jsonwebtoken'
import { config } from 'dotenv';


config()

interface IUser {
    id: string;
}

const signToken = (data: IUser) => {
    const secret = process.env.JWT_SECRET as string
    const token = jwt.sign(data, secret, { expiresIn: '1d', algorithm: 'HS256' })
    return token
}

export default signToken