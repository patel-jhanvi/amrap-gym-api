import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../application/errors/AppError";
import { User } from "../../domain/entities/User";

export class UpdateUser {
    constructor(private userRepo: IUserRepository) { }

    async execute(id: string, data: any): Promise<User> {
        const existingUser = await this.userRepo.findById(id);

        if (!existingUser) {
            throw new AppError("User not found", 404);
        }

        // build a new User entity
        const updatedUser = new User(
            existingUser.id,
            data.name ?? existingUser.name,
            data.email ?? existingUser.email,
            data.dateOfBirth ? new Date(data.dateOfBirth) : existingUser.dateOfBirth,
            data.fitnessGoal ?? existingUser.fitnessGoal
        );

        const saved = await this.userRepo.update(updatedUser);
        return saved;
    }
}
