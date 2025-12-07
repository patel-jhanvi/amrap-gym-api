"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MembershipController_1 = require("../controllers/MembershipController");
const router = (0, express_1.Router)();
const controller = new MembershipController_1.MembershipController();
// Add user to gym
router.post("/", (req, res) => controller.add(req, res));
// Remove user from gym
router.delete("/", (req, res) => controller.remove(req, res));
exports.default = router;
