import { Router } from 'express';
import userControllers from './controllers/User'
import adminControllers from './controllers/Admin'
import authMiddleware from './middleware/auth';
import authenticateControllers from './controllers/Authenticate'
const router = Router()

router.get('/', (req, res) => { return res.sendStatus(200) });
router.get('/authenticate', authMiddleware, authenticateControllers.getUserInfo)
router.post('/register-user', userControllers.createUser);
router.post('/register-admin', adminControllers.createAdmin);
router.post('/login-user', userControllers.loginUser);
router.post('/login-admin', adminControllers.loginAdmin);
router.delete('/delete-noot', adminControllers.deleteNoot);

export default router;