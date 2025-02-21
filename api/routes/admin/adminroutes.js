import express from 'express'
import { adminAddUser, adminDashboard, adminDeleteUser, adminUpdateUser } from '../../controllers/adminController.js';



const router = express.Router()



router.get('/dashboard', adminDashboard)
router.post('/update/:id', adminUpdateUser)
router.delete('/delete/:id', adminDeleteUser)
router.post('/adduser', adminAddUser)


export default router;