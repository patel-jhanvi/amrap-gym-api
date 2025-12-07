import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";
import { prisma } from "./prisma";

export class PrismaUserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        const created = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                fitnessGoal: user.fitnessGoal,
            },
        });

        return new User(
            created.id,
            created.name,
            created.email,
            created.dateOfBirth,
            created.fitnessGoal
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const found = await prisma.user.findUnique({
            where: { email },
        });

        if (!found) return null;

        return new User(
            found.id,
            found.name,
            found.email,
            found.dateOfBirth,
            found.fitnessGoal
        );
    }

    async findById(id: string): Promise<User | null> {
        const found = await prisma.user.findUnique({
            where: { id },
        });

        if (!found) return null;

        return new User(
            found.id,
            found.name,
            found.email,
            found.dateOfBirth,
            found.fitnessGoal
        );
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users.map(
            (u: any) =>
                new User(u.id, u.name, u.email, u.dateOfBirth, u.fitnessGoal)
        );
    }

    async update(user: User): Promise<User> {
        const updated = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                fitnessGoal: user.fitnessGoal,
            },
        });

        return new User(
            updated.id,
            updated.name,
            updated.email,
            updated.dateOfBirth,
            updated.fitnessGoal
        );
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id },
        });
    }


}
