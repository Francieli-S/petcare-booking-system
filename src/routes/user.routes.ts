import { Router } from 'express';
import userController from '../controllers/user.controllers.js';
import validator from '../middlerwares/user.middlewares.js';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', validator(true), userController.create);
router.patch('/:id', validator(false), userController.update);
router.delete('/:id', userController.remove);

export default router;
