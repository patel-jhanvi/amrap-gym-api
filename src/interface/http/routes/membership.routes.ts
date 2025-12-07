import { Router } from "express";
import { MembershipController } from "../controllers/MembershipController";

const router = Router();
const controller = new MembershipController();

/**
 * @swagger
 * tags:
 *   name: Memberships
 *   description: Manage user-gym memberships
 */

/**
 * @swagger
 * /memberships:
 *   post:
 *     summary: Add a user to a gym
 *     tags: [Memberships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - gymId
 *             properties:
 *               userId:
 *                 type: string
 *               gymId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User added to gym
 */
router.post("/", (req, res) => controller.add(req, res));

/**
 * @swagger
 * /memberships:
 *   delete:
 *     summary: Remove a user from a gym
 *     tags: [Memberships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - gymId
 *             properties:
 *               userId:
 *                 type: string
 *               gymId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User removed from gym
 */
router.delete("/", (req, res) => controller.remove(req, res));

export default router;
