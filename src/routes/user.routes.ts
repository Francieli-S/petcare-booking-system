import { Router } from 'express';
import userController from '../controllers/user.controllers.js';
import { validateRequest } from '../middlerwares/validateRequest.js';
import userValidationSchema from '../validations/user.validations.js';
import auth from '../middlerwares/auth.js';

const router = Router();

router.get('/profile', auth, userController.profile);
router.get('/:id', userController.getById);
router.get('/', userController.get);
router.post(
  '/register',
  validateRequest(userValidationSchema.register),
  userController.register
);
router.post(
  '/login',
  validateRequest(userValidationSchema.login),
  userController.login
);
router.patch(
  '/',
  validateRequest(userValidationSchema.update),
  auth,
  userController.update
);
router.delete('/', auth, userController.remove);

export default router;
