import { IMembershipRepository } from "@domain/repositories/IMembershipRepository";
import { IGymRepository } from "@domain/repositories/IGymRepository";

export class ListUserGyms {
    constructor(
        private membershipRepository: IMembershipRepository,
        private gymRepository: IGymRepository
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
