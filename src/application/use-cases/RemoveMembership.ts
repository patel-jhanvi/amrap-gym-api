import { injectable, inject } from "tsyringe";
import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { AppError } from "../../application/errors/AppError";
import { TOKENS } from "../../infrastructure/di/tokens";

@injectable()
export class RemoveMembership {
    constructor(
        @inject(TOKENS.MembershipRepository) private membershipRepository: IMembershipRepository,
        @inject(TOKENS.UserRepository) private userRepository: IUserRepository,
        @inject(TOKENS.GymRepository) private gymRepository: IGymRepository
    ) { }

    async execute(userId: string, gymId: string): Promise<void> {
        // check user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        // check gym exists
        const gym = await this.gymRepository.findById(gymId);
        if (!gym) {
            throw new AppError("Gym not found", 404);
        }

        // check membership exists
        const existing = await this.membershipRepository.findByUserAndGym(
            userId,
            gymId
        );

        if (!existing) {
            throw new AppError("Membership does not exist", 404);
        }

        // deleteting it
        await this.membershipRepository.deleteByUserAndGym(userId, gymId);
    }
}

