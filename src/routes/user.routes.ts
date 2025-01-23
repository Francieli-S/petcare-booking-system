import { Router } from 'express';
import userController from '../controllers/user.controllers.js';
import { validateRequest } from '../middlerwares/validateRequest.js';
import userValidationSchema from '../validations/user.validations.js'
import auth from '../middlerwares/auth.js'

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/register', validateRequest(userValidationSchema.register), userController.register);
router.post('/login', validateRequest(userValidationSchema.login), userController.login);;
router.get('/profile', auth, userController.profile);
router.patch('/update', auth, userController.update);
router.delete('/', auth, userController.remove);

export default router;
