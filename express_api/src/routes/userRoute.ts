import { Router } from "express";
import { getUser, editUser, deleteUser } from "../controllers/userController";
import verifyToken from "../utils/verifyToken";

const router = Router()

router.get('/me', verifyToken, getUser)
router.put('/me', verifyToken, editUser)
router.delete('/me', verifyToken, deleteUser)

export default router