import { Router } from 'express';
import sitterController from '../controllers/sitters.controllers.js';
import { validateRequest } from '../middlerwares/validateRequest.js';
import sitterValidationSchema from '../validations/sitter.validations.js';
import auth from '../middlerwares/auth.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sitters
 *   description: Endpoints for managing sitters
 */

/**
 * @swagger
 * /api/sitters/all:
 *   get:
 *     summary: Get all sitters
 *     tags: [Sitters]
 *     responses:
 *       200:
 *         description: List of sitters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sitter'
 *       500:
 *         description: Internal server error
 */
router.get('/all', sitterController.getSitters);

/**
 * @swagger
 * /api/sitters/{id}:
 *   get:
 *     summary: Get a sitter by ID
 *     tags: [Sitters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The sitter ID
 *     responses:
 *       200:
 *         description: Sitter found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sitter'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sitter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSitterResponse'
 */
router.get('/:id', auth, sitterController.getSitter);

/**
 * @swagger
 * /api/sitters:
 *   post:
 *     summary: Create a new sitter profile
 *     tags: [Sitters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSitter'
 *     responses:
 *       201:
 *         description: Sitter profile created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sitter'
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
  validateRequest(sitterValidationSchema.createSitter),
  auth,
  sitterController.createSitter
);

/**
 * @swagger
 * /api/sitters:
 *   patch:
 *     summary: Update a sitter profile
 *     tags: [Sitters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSitter'
 *     responses:
 *       200:
 *         description: Sitter profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.patch(
  '/',
  validateRequest(sitterValidationSchema.updateSitter),
  auth,
  sitterController.updateSitter
);

export default router;
