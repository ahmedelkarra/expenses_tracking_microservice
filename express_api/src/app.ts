import express from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from "./utils/connectDB";
import homeRoute from './routes/homeRoute'
import registerRoute from './routes/registerRoute'
import loginRoute from './routes/loginRoute'
import userRoute from './routes/userRoute'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:8000'] }))
app.use(express.json())
app.use(morgan('dev'))
app.use('/', homeRoute)
app.use('/api', registerRoute)
app.use('/api', loginRoute)
app.use('/api', userRoute)


connectDB()
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})