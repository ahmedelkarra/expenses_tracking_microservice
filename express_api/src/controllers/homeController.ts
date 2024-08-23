import { Request, Response } from "express"



const homeController = (req: Request, res: Response) => {
    return res.send('<h2>Express.js with typescript</h2>')
}


export default homeController