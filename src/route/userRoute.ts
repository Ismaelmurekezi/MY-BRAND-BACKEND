import express from "express"
import { login, register,refreshToken } from "../controller/useController"


const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post('/refresh-token', refreshToken);

export default router
