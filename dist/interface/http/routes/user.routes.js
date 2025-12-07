"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const controller = new UserController_1.UserController();
// Create or POST user
router.post("/", (req, res) => controller.create(req, res));
// List or GET  all users
router.get("/", (req, res) => controller.list(req, res));
// Get user by ID
router.get("/:id", (req, res) => controller.get(req, res));
//List all gyms a user belongs to
router.get("/:id/gyms", (req, res) => controller.listGyms(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
exports.default = router;
