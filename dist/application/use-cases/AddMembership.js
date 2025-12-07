"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMembership = void 0;
const Membership_1 = require("../../domain/entities/Membership");
const AppError_1 = require("../../application/errors/AppError");
const crypto_1 = require("crypto");
class AddMembership {
    constructor(membershipRepository, userRepository, gymRepository) {
        this.membershipRepository = membershipRepository;
        this.userRepository = userRepository;
        this.gymRepository = gymRepository;
    }
    async execute(data) {
        // check user exists
        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        // check gym exists
        const gym = await this.gymRepository.findById(data.gymId);
        if (!gym) {
            throw new AppError_1.AppError("Gym not found", 404);
        }
        // prevent duplicate membership
        const existing = await this.membershipRepository.findByUserAndGym(data.userId, data.gymId);
        if (existing) {
            throw new AppError_1.AppError("User is already a member of this gym", 400);
        }
        // capacity rule
        if (gym.maxCapacity !== null) {
            const count = await this.membershipRepository.countByGym(gym.id);
            if (count >= gym.maxCapacity) {
                throw new AppError_1.AppError("Gym is at full capacity", 400);
            }
        }
        // create membership entity
        const membership = new Membership_1.Membership((0, crypto_1.randomUUID)(), data.userId, data.gymId, new Date());
        return this.membershipRepository.create(membership);
    }
}
exports.AddMembership = AddMembership;
