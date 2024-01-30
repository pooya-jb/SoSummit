import { Router } from 'express';
import userControllers from './controllers/User'
import adminControllers from './controllers/Admin'
const router = Router()

router.get('/', ()=> console.log('test') )
router.post('/register-user', userControllers.createUser )
router.post('/register-admin', adminControllers.createAdmin )
router.post('/login-user', userControllers.loginUser )
router.post('/login-admin', adminControllers.loginAdmin )

export default router;