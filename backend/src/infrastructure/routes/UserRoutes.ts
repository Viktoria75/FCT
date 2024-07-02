import { Router } from 'express';
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
//router.get('/', auth, UserController.getAllUsers);
router.get('/', UserController.getAllUsers);
router.get('/:userId', auth, UserController.getUserById);
router.put('/:userId', auth, UserController.updateUser);
router.delete('/:userId', auth, UserController.deleteUser);

export default router;
