"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMembershipRepository = void 0;
const Membership_1 = require("../../domain/entities/Membership");
const prisma_1 = require("./prisma");
class PrismaMembershipRepository {
    async create(membership) {
        const created = await prisma_1.prisma.membership.create({
            data: {
                id: membership.id,
                userId: membership.userId,
                gymId: membership.gymId,
                joinDate: membership.joinDate,
            },
        });
        return new Membership_1.Membership(created.id, created.userId, created.gymId, created.joinDate);
    }
    async findByUserAndGym(userId, gymId) {
        const found = await prisma_1.prisma.membership.findFirst({
            where: { userId, gymId },
        });
        if (!found)
            return null;
        return new Membership_1.Membership(found.id, found.userId, found.gymId, found.joinDate);
    }
    async deleteByUserAndGym(userId, gymId) {
        await prisma_1.prisma.membership.deleteMany({
            where: { userId, gymId },
        });
    }
    async findUsersByGym(gymId) {
        const memberships = await prisma_1.prisma.membership.findMany({
            where: { gymId },
            orderBy: { joinDate: "desc" },
        });
        return memberships.map((m) => new Membership_1.Membership(m.id, m.userId, m.gymId, m.joinDate));
    }
    async findGymsByUser(userId) {
        const memberships = await prisma_1.prisma.membership.findMany({
            where: { userId },
        });
        return memberships.map((m) => new Membership_1.Membership(m.id, m.userId, m.gymId, m.joinDate));
    }
    async countByGym(gymId) {
        return prisma_1.prisma.membership.count({
            where: { gymId },
        });
    }
}
exports.PrismaMembershipRepository = PrismaMembershipRepository;
