"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const AppError_1 = require("../../application/errors/AppError");
const User_1 = require("../../domain/entities/User");
class UpdateUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(id, data) {
        const existingUser = await this.userRepo.findById(id);
        if (!existingUser) {
            throw new AppError_1.AppError("User not found", 404);
        }
        // build a new User entity
        const updatedUser = new User_1.User(existingUser.id, data.name ?? existingUser.name, data.email ?? existingUser.email, data.dateOfBirth ? new Date(data.dateOfBirth) : existingUser.dateOfBirth, data.fitnessGoal ?? existingUser.fitnessGoal);
        const saved = await this.userRepo.update(updatedUser);
        return saved;
    }
}
exports.UpdateUser = UpdateUser;
