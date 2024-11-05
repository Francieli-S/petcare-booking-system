import { Router } from "express";
import userRoutes from './user.routes.js'
import sitterRoutes from './sitter.routes.js'
import petHumanRoutes from './petHuman.routes.js'
import bookingRouter from './booking.routes.js'

const router = Router()

router.use('/users', userRoutes)
router.use('/sitters', sitterRoutes)
router.use('/pethumans', petHumanRoutes)
router.use('/bookings', bookingRouter)

export default router