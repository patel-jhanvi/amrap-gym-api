"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const User_1 = require("@domain/entities/User");
const AppError_1 = require("@application/errors/AppError");
const crypto_1 = require("crypto");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new AppError_1.AppError("Email already in use", 400);
        }
        const user = new User_1.User((0, crypto_1.randomUUID)(), data.name, data.email, data.dateOfBirth, data.fitnessGoal);
        return this.userRepository.create(user);
    }
}
exports.CreateUser = CreateUser;
