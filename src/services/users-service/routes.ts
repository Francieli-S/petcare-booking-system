import { Router } from 'express';
import userController from './controllers.js';

const router = Router();

router.get('/', userController.get);
// router.get('/:id');
router.post('/', userController.create);
// router.put('/:id');
// router.delete('/');

export default router;
