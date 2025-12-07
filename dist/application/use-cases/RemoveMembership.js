"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveMembership = void 0;
const AppError_1 = require("@application/errors/AppError");
class RemoveMembership {
    constructor(membershipRepository, userRepository, gymRepository) {
        this.membershipRepository = membershipRepository;
        this.userRepository = userRepository;
        this.gymRepository = gymRepository;
    }
    async execute(userId, gymId) {
        // check user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        // check gym exists
        const gym = await this.gymRepository.findById(gymId);
        if (!gym) {
            throw new AppError_1.AppError("Gym not found", 404);
        }
        // check membership exists
        const existing = await this.membershipRepository.findByUserAndGym(userId, gymId);
        if (!existing) {
            throw new AppError_1.AppError("Membership does not exist", 404);
        }
        // deleteting it
        await this.membershipRepository.deleteByUserAndGym(userId, gymId);
    }
}
exports.RemoveMembership = RemoveMembership;
