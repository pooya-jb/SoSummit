import { Router } from 'express';
import userControllers from './controllers/User'
import adminControllers from './controllers/Admin'
import authMiddleware from './middleware/auth';
import authenticateControllers from './controllers/Authenticate'
import { Request, Response } from 'express';
import locationControllers from './controllers/Location'
const router = Router()

router.get('/', (req: Request, res: Response) => { return res.sendStatus(200) });
router.get('/authenticate', authMiddleware, authenticateControllers.getUserInfo)
router.post('/register-user', userControllers.createUser);
router.post('/register-admin', adminControllers.createAdmin);
router.post('/register-location', locationControllers.createLocation )
router.post('/login-user', userControllers.loginUser);
router.post('/login-admin', adminControllers.loginAdmin);
router.delete('/delete-noot', adminControllers.deleteNoot);
router.delete('/delete-alert', adminControllers.deleteAlert);
router.get('/user-info/:username', authMiddleware, userControllers.getUserInfo);

export default router;