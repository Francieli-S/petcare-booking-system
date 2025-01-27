import { Router } from 'express';
import sitterController from '../controllers/sitters.controllers.js';
import { validateRequest } from '../middlerwares/validateRequest.js';
import sitterValidationSchema from '../validations/sitter.validations.js'
import auth from '../middlerwares/auth.js'


const router = Router();

router.get('/all', sitterController.getSitters);
router.get('/:id', auth, sitterController.getSitter);
router.post('/', validateRequest(sitterValidationSchema.createSitter), auth, sitterController.createSitter);
router.patch('/', validateRequest(sitterValidationSchema.updateSitter), auth, sitterController.updateSitter);

export default router;






