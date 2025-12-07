"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymController = void 0;
const PrismaGymRepository_1 = require("@infrastructure/database/PrismaGymRepository");
const PrismaMembershipRepository_1 = require("@infrastructure/database/PrismaMembershipRepository");
const PrismaUserRepository_1 = require("@infrastructure/database/PrismaUserRepository");
const AppError_1 = require("@application/errors/AppError");
const CreateGym_1 = require("../../../application/use-cases/CreateGym");
const ListAvailableGyms_1 = require("../../../application/use-cases/ListAvailableGyms");
const ListGymUsers_1 = require("../../../application/use-cases/ListGymUsers");
const gymRepo = new PrismaGymRepository_1.PrismaGymRepository();
const membershipRepo = new PrismaMembershipRepository_1.PrismaMembershipRepository();
const userRepo = new PrismaUserRepository_1.PrismaUserRepository();
class GymController {
    async create(req, res) {
        try {
            const { name, type, location, maxCapacity } = req.body;
            const useCase = new CreateGym_1.CreateGym(gymRepo);
            const gym = await useCase.execute({
                name,
                type,
                location,
                maxCapacity: maxCapacity ? Number(maxCapacity) : null
            });
            return res.status(201).json(gym);
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
            const gyms = await gymRepo.findAll();
            return res.json(gyms);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async get(req, res) {
        try {
            const gym = await gymRepo.findById(req.params.id);
            if (!gym) {
                return res.status(404).json({ error: "Gym not found" });
            }
            return res.json(gym);
        }
        catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
    async listUsers(req, res) {
        try {
            const useCase = new ListGymUsers_1.ListGymUsers(membershipRepo, userRepo);
            const users = await useCase.execute(req.params.id);
            return res.json(users);
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async listAvailable(req, res) {
        try {
            const useCase = new ListAvailableGyms_1.ListAvailableGyms(gymRepo, membershipRepo);
            const gyms = await useCase.execute();
            return res.json(gyms);
        }
        catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.GymController = GymController;
