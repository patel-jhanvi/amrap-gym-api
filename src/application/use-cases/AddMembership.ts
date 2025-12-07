import { AddMembershipDTO } from "@application/dtos/AddMembershipDTO";
import { IUserRepository } from "@domain/repositories/IUserRepository";
import { IGymRepository } from "@domain/repositories/IGymRepository";
import { IMembershipRepository } from "@domain/repositories/IMembershipRepository";
import { Membership } from "@domain/entities/Membership";
import { AppError } from "@application/errors/AppError";
import { randomUUID } from "crypto";

export class AddMembership {
    constructor(
        private membershipRepository: IMembershipRepository,
        private userRepository: IUserRepository,
        private gymRepository: IGymRepository
    ) { }

    async execute(data: AddMembershipDTO): Promise<Membership> {
        // check user exists
        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        // check gym exists
        const gym = await this.gymRepository.findById(data.gymId);
        if (!gym) {
            throw new AppError("Gym not found", 404);
        }

        // prevent duplicate membership
        const existing = await this.membershipRepository.findByUserAndGym(
            data.userId,
            data.gymId
        );
        if (existing) {
            throw new AppError("User is already a member of this gym", 400);
        }

        // capacity rule
        if (gym.maxCapacity !== null) {
            const count = await this.membershipRepository.countByGym(gym.id);
            if (count >= gym.maxCapacity) {
                throw new AppError("Gym is at full capacity", 400);
            }
        }

        // create membership entity
        const membership = new Membership(
            randomUUID(),
            data.userId,
            data.gymId,
            new Date()
        );

        return this.membershipRepository.create(membership);
    }
}
