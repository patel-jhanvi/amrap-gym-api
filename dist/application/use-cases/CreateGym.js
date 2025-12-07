"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGym = void 0;
const Gym_1 = require("@domain/entities/Gym");
const AppError_1 = require("@application/errors/AppError");
const crypto_1 = require("crypto");
class CreateGym {
    constructor(gymRepository) {
        this.gymRepository = gymRepository;
    }
    async execute(data) {
        // Check if a gym with the same name already exists 
        const existing = await this.gymRepository.findByName(data.name);
        if (existing) {
            throw new AppError_1.AppError("Gym name already exists", 400);
        }
        // Build domain entity (no DB logic here)
        const gym = new Gym_1.Gym((0, crypto_1.randomUUID)(), data.name, data.type, data.location ?? null, data.maxCapacity ?? null);
        return this.gymRepository.create(gym);
    }
}
exports.CreateGym = CreateGym;
