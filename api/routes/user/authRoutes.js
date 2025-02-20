import express from "express"
import { adminLogin, login, signout, signup } from "../../controllers/authController.js"

const router = express.Router()



router.post('/signup',signup)
router.post('/login',login)
router.get('/signout',signout)


router.post('/admin/login',adminLogin)

export default router