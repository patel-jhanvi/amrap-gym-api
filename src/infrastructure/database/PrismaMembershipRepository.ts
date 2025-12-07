import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { Membership } from "../../domain/entities/Membership";
import { prisma } from "./prisma";

export class PrismaMembershipRepository implements IMembershipRepository {
    async create(membership: Membership): Promise<Membership> {
        const created = await prisma.membership.create({
            data: {
                id: membership.id,
                userId: membership.userId,
                gymId: membership.gymId,
                joinDate: membership.joinDate,
            },
        });

        return new Membership(
            created.id,
            created.userId,
            created.gymId,
            created.joinDate
        );
    }

    async findByUserAndGym(
        userId: string,
        gymId: string
    ): Promise<Membership | null> {
        const found = await prisma.membership.findFirst({
            where: { userId, gymId },
        });

        if (!found) return null;

        return new Membership(
            found.id,
            found.userId,
            found.gymId,
            found.joinDate
        );
    }

    async deleteByUserAndGym(userId: string, gymId: string): Promise<void> {
        await prisma.membership.deleteMany({
            where: { userId, gymId },
        });
    }

    async findUsersByGym(gymId: string): Promise<Membership[]> {
        const memberships = await prisma.membership.findMany({
            where: { gymId },
            orderBy: { joinDate: "desc" },
        });

        return memberships.map(
            (m: any) => new Membership(m.id, m.userId, m.gymId, m.joinDate)
        );
    }

    async findGymsByUser(userId: string): Promise<Membership[]> {
        const memberships = await prisma.membership.findMany({
            where: { userId },
        });


        return memberships.map(
            (m: any) => new Membership(m.id, m.userId, m.gymId, m.joinDate)
        );
    }

    async countByGym(gymId: string): Promise<number> {
        return prisma.membership.count({
            where: { gymId },
        });
    }
}
