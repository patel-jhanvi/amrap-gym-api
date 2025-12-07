import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

// Create or POST user
router.post("/", (req, res) => controller.create(req, res));

// List or GET  all users
router.get("/", (req, res) => controller.list(req, res));

// Get user by ID
router.get("/:id", (req, res) => controller.get(req, res));

//List all gyms a user belongs to
router.get("/:id/gyms", (req, res) => controller.listGyms(req, res));

router.put("/:id", (req, res) => controller.update(req, res));


export default router;
