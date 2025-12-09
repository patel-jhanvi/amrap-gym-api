import { injectable, inject } from "tsyringe";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { TOKENS } from "../../infrastructure/di/tokens";

@injectable()
export class ListUserGyms {
    constructor(
        @inject(TOKENS.MembershipRepository) private membershipRepository: IMembershipRepository,
        @inject(TOKENS.GymRepository) private gymRepository: IGymRepository
    ) { }

    async execute(userId: string) {
        // find all memberships for this user
        const memberships = await this.membershipRepository.findGymsByUser(userId);

        if (memberships.length === 0) {
            return [];
        }

        // loading gym details for each membership
        const gyms = await Promise.all(
            memberships.map((m) => this.gymRepository.findById(m.gymId))
        );


        return gyms.filter((g) => g !== null);
    }
}
