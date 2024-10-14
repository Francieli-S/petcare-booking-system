import { Router } from 'express';
import userController from './controllers.js';

const router = Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
