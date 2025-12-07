"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserGyms = void 0;
class ListUserGyms {
    constructor(membershipRepository, gymRepository) {
        this.membershipRepository = membershipRepository;
        this.gymRepository = gymRepository;
    }
    async execute(userId) {
        // find all memberships for this user
        const memberships = await this.membershipRepository.findGymsByUser(userId);
        if (memberships.length === 0) {
            return [];
        }
        // loading gym details for each membership
        const gyms = await Promise.all(memberships.map((m) => this.gymRepository.findById(m.gymId)));
        return gyms.filter((g) => g !== null);
    }
}
exports.ListUserGyms = ListUserGyms;
