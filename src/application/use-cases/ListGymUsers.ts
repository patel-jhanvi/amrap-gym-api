import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { AppError } from "../../application/errors/AppError";
import { TOKENS } from "../../infrastructure/di/tokens";

@injectable()
export class ListGymUsers {
    constructor(
        @inject(TOKENS.MembershipRepository) private membershipRepository: IMembershipRepository,
        @inject(TOKENS.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(gymId: string) {
        const memberships = await this.membershipRepository.findUsersByGym(gymId);

        if (memberships.length === 0) {
            return [];
        }

        const users = await Promise.all(
            memberships.map(async (m) => {
                const user = await this.userRepository.findById(m.userId);
                if (!user) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    fitnessGoal: user.fitnessGoal,
                    joinDate: m.joinDate
                };
            })
        );

        const result = users.filter((u) => u !== null);

        result.sort((a: any, b: any) =>
            new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        );

        return result;
    }

}
