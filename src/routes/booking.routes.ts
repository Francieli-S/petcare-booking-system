import { Router } from 'express';
import bookingController from '../controllers/booking.controllers.js';
import { validateRequest } from '../middlerwares/validateRequest.js';
import bookingValidationSchema from '../validations/booking.validations.js'
import auth from '../middlerwares/auth.js'

const router = Router();

router.get('/', auth, bookingController.getBookings);
router.get('/:id', auth, bookingController.getBooking);
router.post('/', validateRequest(bookingValidationSchema.createBooking), auth, bookingController.createBooking
);
router.patch('/:id', validateRequest(bookingValidationSchema.updateBooking), auth, bookingController.updateBooking);
router.delete('/:id', validateRequest(bookingValidationSchema.deleteBooking), auth, bookingController.deleteBooking);

export default router;