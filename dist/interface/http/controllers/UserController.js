"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const CreateUser_1 = require("../../../application/use-cases/CreateUser");
const PrismaUserRepository_1 = require("../../../infrastructure/database/PrismaUserRepository");
const PrismaGymRepository_1 = require("../../../infrastructure/database/PrismaGymRepository");
const PrismaMembershipRepository_1 = require("../../../infrastructure/database/PrismaMembershipRepository");
const ListUserGyms_1 = require("../../../application/use-cases/ListUserGyms");
const UpdateUser_1 = require("../../../application/use-cases/UpdateUser");
const AppError_1 = require("../../../application/errors/AppError");
const userRepo = new PrismaUserRepository_1.PrismaUserRepository();
const membershipRepo = new PrismaMembershipRepository_1.PrismaMembershipRepository();
const gymRepo = new PrismaGymRepository_1.PrismaGymRepository();
class UserController {
    async create(req, res) {
        try {
            const useCase = new CreateUser_1.CreateUser(userRepo);
            const user = await useCase.execute({
                name: req.body.name,
                email: req.body.email,
                dateOfBirth: new Date(req.body.dateOfBirth),
                fitnessGoal: req.body.fitnessGoal
            });
            return res.status(201).json(user);
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async list(req, res) {
        try {
            const users = await userRepo.findAll();
            return res.json(users);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async listGyms(req, res) {
        try {
            const userId = req.params.id;
            const useCase = new ListUserGyms_1.ListUserGyms(membershipRepo, gymRepo);
            const gyms = await useCase.execute(userId);
            return res.json(gyms);
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async get(req, res) {
        try {
            const { id } = req.params;
            const user = await userRepo.findById(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json(user);
        }
        catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, dateOfBirth, fitnessGoal } = req.body;
            const useCase = new UpdateUser_1.UpdateUser(userRepo);
            const updated = await useCase.execute(id, {
                name,
                email,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                fitnessGoal
            });
            return res.json(updated);
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.UserController = UserController;
