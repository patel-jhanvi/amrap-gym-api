import { Router } from "express";
import { container } from "../../../infrastructure/di/container";
import { GymController } from "../controllers/GymController";

const router = Router();

// Resolve controller from DI container
const controller = container.resolve(GymController);

/**
 * @swagger
 * tags:
 *   name: Gyms
 *   description: Gym management
 */

/**
 * @swagger
 * /gyms/available/spots:
 *   get:
 *     summary: List gyms with available spots
 *     tags: [Gyms]
 *     responses:
 *       200:
 *         description: Gyms sorted by remaining capacity
 */
router.get("/available/spots", (req, res, next) => controller.listAvailable(req, res, next));

/**
 * @swagger
 * /gyms:
 *   post:
 *     summary: Create a gym
 *     tags: [Gyms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               type: { type: string }
 *               location: { type: string }
 *               maxCapacity: { type: number }
 *     responses:
 *       201:
 *         description: Gym created successfully
 */
router.post("/", (req, res, next) => controller.create(req, res, next));

/**
 * @swagger
 * /gyms:
 *   get:
 *     summary: List all gyms
 *     tags: [Gyms]
 *     responses:
 *       200:
 *         description: List of gyms
 */
router.get("/", (req, res, next) => controller.list(req, res, next));

/**
 * @swagger
 * /gyms/{id}:
 *   get:
 *     summary: Get a gym by ID
 *     tags: [Gyms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gym details
 */
router.get("/:id", (req, res, next) => controller.get(req, res, next));

/**
 * @swagger
 * /gyms/{id}/users:
 *   get:
 *     summary: List users in a gym (sorted by join date)
 *     tags: [Gyms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users in this gym
 */
router.get("/:id/users", (req, res, next) => controller.listUsers(req, res, next));

export default router;
