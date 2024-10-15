import { Router } from 'express';
import userController from './controllers.js';
import validator from './middlewares.js';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', validator, userController.create);
// router.put('/:id', validator, userController.update);

router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
