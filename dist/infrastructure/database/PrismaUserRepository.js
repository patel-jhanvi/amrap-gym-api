"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const User_1 = require("@domain/entities/User");
const prisma_1 = require("./prisma");
class PrismaUserRepository {
    async create(user) {
        const created = await prisma_1.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                fitnessGoal: user.fitnessGoal,
            },
        });
        return new User_1.User(created.id, created.name, created.email, created.dateOfBirth, created.fitnessGoal);
    }
    async findByEmail(email) {
        const found = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!found)
            return null;
        return new User_1.User(found.id, found.name, found.email, found.dateOfBirth, found.fitnessGoal);
    }
    async findById(id) {
        const found = await prisma_1.prisma.user.findUnique({
            where: { id },
        });
        if (!found)
            return null;
        return new User_1.User(found.id, found.name, found.email, found.dateOfBirth, found.fitnessGoal);
    }
    async findAll() {
        const users = await prisma_1.prisma.user.findMany();
        return users.map((u) => new User_1.User(u.id, u.name, u.email, u.dateOfBirth, u.fitnessGoal));
    }
    async update(user) {
        const updated = await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                fitnessGoal: user.fitnessGoal,
            },
        });
        return new User_1.User(updated.id, updated.name, updated.email, updated.dateOfBirth, updated.fitnessGoal);
    }
    async delete(id) {
        await prisma_1.prisma.user.delete({
            where: { id },
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
