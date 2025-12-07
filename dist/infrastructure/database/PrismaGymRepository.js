"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGymRepository = void 0;
const Gym_1 = require("@domain/entities/Gym");
const prisma_1 = require("./prisma");
class PrismaGymRepository {
    async create(gym) {
        const created = await prisma_1.prisma.gym.create({
            data: {
                id: gym.id,
                name: gym.name,
                type: gym.type,
                location: gym.location,
                maxCapacity: gym.maxCapacity,
            },
        });
        return new Gym_1.Gym(created.id, created.name, created.type, created.location, created.maxCapacity);
    }
    async update(gym) {
        const updated = await prisma_1.prisma.gym.update({
            where: { id: gym.id },
            data: {
                name: gym.name,
                type: gym.type,
                location: gym.location,
                maxCapacity: gym.maxCapacity,
            },
        });
        return new Gym_1.Gym(updated.id, updated.name, updated.type, updated.location, updated.maxCapacity);
    }
    async delete(id) {
        await prisma_1.prisma.gym.delete({
            where: { id },
        });
    }
    async findById(id) {
        const found = await prisma_1.prisma.gym.findUnique({
            where: { id },
        });
        if (!found)
            return null;
        return new Gym_1.Gym(found.id, found.name, found.type, found.location, found.maxCapacity);
    }
    async findByName(name) {
        const found = await prisma_1.prisma.gym.findFirst({
            where: { name },
        });
        if (!found)
            return null;
        return new Gym_1.Gym(found.id, found.name, found.type, found.location, found.maxCapacity);
    }
    async findAll() {
        const gyms = await prisma_1.prisma.gym.findMany();
        return gyms.map((g) => new Gym_1.Gym(g.id, g.name, g.type, g.location, g.maxCapacity));
    }
}
exports.PrismaGymRepository = PrismaGymRepository;
