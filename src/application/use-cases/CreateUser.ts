import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import { TOKENS } from "../../infrastructure/di/tokens";

import { User } from "../../domain/entities/User";
import { AppError } from "../../application/errors/AppError";
import { randomUUID } from "crypto";

@injectable()
export class CreateUser {
    constructor(
        @inject(TOKENS.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(data: CreateUserDTO): Promise<User> {
        const existing = await this.userRepository.findByEmail(data.email);

        if (existing) {
            throw new AppError("Email already in use", 400);
        }

        const user = new User(
            randomUUID(),
            data.name,
            data.email,
            data.dateOfBirth,
            data.fitnessGoal
        );

        return this.userRepository.create(user);
    }
}
