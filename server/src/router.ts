import { Router } from 'express';
import userControllers from './controllers/User'
import adminControllers from './controllers/Admin'
import authMiddleware from './middleware/auth';
const router = Router()

router.get('/', (req, res) => { return res.sendStatus(200)});
router.get('/authenticate', authMiddleware, (req, res) => res.sendStatus(200))
router.post('/register-user', userControllers.createUser );
router.post('/register-admin', adminControllers.createAdmin );
router.post('/login-user', userControllers.loginUser );
router.post('/login-admin', adminControllers.loginAdmin );

export default router;