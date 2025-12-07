"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAvailableGyms = void 0;
class ListAvailableGyms {
    constructor(gymRepository, membershipRepository) {
        this.gymRepository = gymRepository;
        this.membershipRepository = membershipRepository;
    }
    async execute() {
        // get all gyms
        const gyms = await this.gymRepository.findAll();
        // calculate available spots for each gym
        const gymsWithAvailability = await Promise.all(gyms.map(async (gym) => {
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
        }));
        // filter out nulls & gyms with no available spots
        const filtered = gymsWithAvailability.filter((g) => g !== null && g.availableSpots > 0);
        return filtered.sort((a, b) => b.availableSpots - a.availableSpots);
    }
}
exports.ListAvailableGyms = ListAvailableGyms;
