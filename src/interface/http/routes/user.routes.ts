import { Router } from "express";
import { container } from "../../../infrastructure/di/container";
import { UserController } from "../controllers/UserController";

const router = Router();

// Resolve controller from DI container
const controller = container.resolve(UserController);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - dateOfBirth
 *               - fitnessGoal
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               fitnessGoal:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", (req, res, next) => controller.create(req, res, next));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", (req, res, next) => controller.list(req, res, next));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.get("/:id", (req, res, next) => controller.get(req, res, next));

/**
 * @swagger
 * /users/{id}/gyms:
 *   get:
 *     summary: List all gyms a user belongs to
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of gyms for this user
 */
router.get("/:id/gyms", (req, res, next) => controller.listGyms(req, res, next));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               fitnessGoal:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/:id", (req, res, next) => controller.update(req, res, next));

export default router;
