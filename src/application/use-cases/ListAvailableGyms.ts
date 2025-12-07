import { IGymRepository } from "@domain/repositories/IGymRepository";
import { IMembershipRepository } from "@domain/repositories/IMembershipRepository";

export class ListAvailableGyms {
    constructor(
        private gymRepository: IGymRepository,
        private membershipRepository: IMembershipRepository
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
                    ...gym,
                    availableSpots: available,
                };
            })
        );

        // filter out nulls & gyms with no available spots
        const filtered = gymsWithAvailability.filter(
            (g): g is { id: string; name: string; type: string; location: string | null; maxCapacity: number | null; availableSpots: number } =>
                g !== null && g.availableSpots > 0
        );


        return filtered.sort((a, b) => b.availableSpots - a.availableSpots);
    }
}
