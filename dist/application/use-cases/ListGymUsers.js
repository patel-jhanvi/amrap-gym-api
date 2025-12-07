"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGymUsers = void 0;
class ListGymUsers {
    constructor(membershipRepository, userRepository) {
        this.membershipRepository = membershipRepository;
        this.userRepository = userRepository;
    }
    async execute(gymId) {
        const memberships = await this.membershipRepository.findUsersByGym(gymId);
        if (memberships.length === 0) {
            return [];
        }
        const users = await Promise.all(memberships.map(async (m) => {
            const user = await this.userRepository.findById(m.userId);
            if (!user)
                return null;
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                fitnessGoal: user.fitnessGoal,
                joinDate: m.joinDate
            };
        }));
        const result = users.filter((u) => u !== null);
        result.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
        return result;
    }
}
exports.ListGymUsers = ListGymUsers;
