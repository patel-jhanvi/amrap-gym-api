import { Router } from "express";
import { MembershipController } from "../controllers/MembershipController";

const router = Router();
const controller = new MembershipController();

// Add user to gym
router.post("/", (req, res) => controller.add(req, res));

// Remove user from gym
router.delete("/", (req, res) => controller.remove(req, res));

export default router;
