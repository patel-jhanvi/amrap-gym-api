import { IGymRepository } from "@domain/repositories/IGymRepository";
import { Gym } from "@domain/entities/Gym";
import { prisma } from "./prisma";

export class PrismaGymRepository implements IGymRepository {
    async create(gym: Gym): Promise<Gym> {
        const created = await prisma.gym.create({
            data: {
                id: gym.id,
                name: gym.name,
                type: gym.type,
                location: gym.location,
                maxCapacity: gym.maxCapacity,
            },
        });

        return new Gym(
            created.id,
            created.name,
            created.type,
            created.location,
            created.maxCapacity
        );
    }

    async update(gym: Gym): Promise<Gym> {
        const updated = await prisma.gym.update({
            where: { id: gym.id },
            data: {
                name: gym.name,
                type: gym.type,
                location: gym.location,
                maxCapacity: gym.maxCapacity,
            },
        });

        return new Gym(
            updated.id,
            updated.name,
            updated.type,
            updated.location,
            updated.maxCapacity
        );
    }

    async delete(id: string): Promise<void> {
        await prisma.gym.delete({
            where: { id },
        });
    }

    async findById(id: string): Promise<Gym | null> {
        const found = await prisma.gym.findUnique({
            where: { id },
        });

        if (!found) return null;

        return new Gym(
            found.id,
            found.name,
            found.type,
            found.location,
            found.maxCapacity
        );
    }

    async findByName(name: string): Promise<Gym | null> {
        const found = await prisma.gym.findFirst({
            where: { name },
        });

        if (!found) return null;

        return new Gym(
            found.id,
            found.name,
            found.type,
            found.location,
            found.maxCapacity
        );
    }

    async findAll(): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany();

        return gyms.map(
            (g) =>
                new Gym(
                    g.id,
                    g.name,
                    g.type,
                    g.location,
                    g.maxCapacity
                )
        );
    }
}
