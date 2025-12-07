"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipController = void 0;
const PrismaMembershipRepository_1 = require("@infrastructure/database/PrismaMembershipRepository");
const PrismaUserRepository_1 = require("@infrastructure/database/PrismaUserRepository");
const PrismaGymRepository_1 = require("@infrastructure/database/PrismaGymRepository");
const AddMembership_1 = require("@application/use-cases/AddMembership");
const RemoveMembership_1 = require("@application/use-cases/RemoveMembership");
const AppError_1 = require("@application/errors/AppError");
// Create repo instances (infrastructure layer)
const membershipRepo = new PrismaMembershipRepository_1.PrismaMembershipRepository();
const userRepo = new PrismaUserRepository_1.PrismaUserRepository();
const gymRepo = new PrismaGymRepository_1.PrismaGymRepository();
class MembershipController {
    async add(req, res) {
        try {
            const { userId, gymId } = req.body;
            const useCase = new AddMembership_1.AddMembership(membershipRepo, userRepo, gymRepo);
            const membership = await useCase.execute({
                userId,
                gymId
            });
            return res.status(201).json(membership);
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async remove(req, res) {
        try {
            const { userId, gymId } = req.body;
            const useCase = new RemoveMembership_1.RemoveMembership(membershipRepo, userRepo, gymRepo);
            await useCase.execute(userId, gymId);
            return res.status(200).json({ message: "Membership removed" });
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.MembershipController = MembershipController;
