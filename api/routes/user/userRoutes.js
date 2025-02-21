import express from 'express'
import { test } from '../../controllers/userController.js ';
import { verifyToken } from '../../utils/verifyUser.js';
import { deleteUser, updateUser } from '../../controllers/userController.js';
import { upload } from '../../config/cloudinaryConfig.js';




const router = express.Router()



router.get('/',test)
router.post('/update/:id',upload.single('image'),verifyToken, updateUser)

router.delete('/delete/:id', verifyToken,deleteUser)
export default router;