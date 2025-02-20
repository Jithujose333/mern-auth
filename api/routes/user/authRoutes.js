import express from "express"
import { login, signout, signup } from "../../controllers/authController.js"

const router = express.Router()



router.post('/signup',signup)
router.post('/login',login)
router.get('/signout',signout)

export default router