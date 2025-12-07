import { Router } from "express";
import { GymController } from "../controllers/GymController";

const router = Router();
const controller = new GymController();

// Create gym
router.post("/", (req, res) => controller.create(req, res));

// List all gyms
router.get("/", (req, res) => controller.list(req, res));

// Get gym by ID
router.get("/:id", (req, res) => controller.get(req, res));

// List users in a gym
router.get("/:id/users", (req, res) => controller.listUsers(req, res));

// List gyms with space
router.get("/available/spots", (req, res) => controller.listAvailable(req, res));

export default router;