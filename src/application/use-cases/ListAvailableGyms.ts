import { injectable, inject } from "tsyringe";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { TOKENS } from "../../infrastructure/di/tokens";

@injectable()
export class ListAvailableGyms {
    constructor(
        @inject(TOKENS.GymRepository) private gymRepository: IGymRepository,
        @inject(TOKENS.MembershipRepository) private membershipRepository: IMembershipRepository
    ) { }

    async execute() {
        // get all gyms
        const gyms = await this.gymRepository.findAll();

        // calculate available spots for each gym
        const gymsWithAvailability = await Promise.all(
            gyms.map(async (gym) => {
                const count = await this.membershipRepository.countByGym(gym.id);

                // if gym has no capacity limit, skip in available list
                if (gym.maxCapacity === null) {
                    return null;
                }

                const available = gym.maxCapacity - count;

                return {
                    id: gym.id,
                    name: gym.name,
                    type: gym.type,
                    location: gym.location,
                    maxCapacity: gym.maxCapacity,
                    availableSpots: available,

                };
            })
        );

        const filtered = gymsWithAvailability.filter(
            (
                g
            ): g is {
                id: string;
                name: string;
                type: string;
                location: string | null;
                maxCapacity: number;
                availableSpots: number;
            } => g !== null && g.availableSpots > 0
        );

        return filtered.sort((a, b) => b.availableSpots - a.availableSpots);
    }
}
