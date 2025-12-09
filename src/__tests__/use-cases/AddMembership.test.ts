import "reflect-metadata";
import { container } from "tsyringe";
import { AddMembership } from "../../application/use-cases/AddMembership";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IGymRepository } from "../../domain/repositories/IGymRepository";
import { IMembershipRepository } from "../../domain/repositories/IMembershipRepository";
import { User } from "../../domain/entities/User";
import { Gym } from "../../domain/entities/Gym";
import { Membership } from "../../domain/entities/Membership";
import { AppError } from "../../application/errors/AppError";
import { TOKENS } from "../../infrastructure/di/tokens";

describe("AddMembership Use Case", () => {
    let addMembership: AddMembership;
    let mockUserRepository: jest.Mocked<IUserRepository>;
    let mockGymRepository: jest.Mocked<IGymRepository>;
    let mockMembershipRepository: jest.Mocked<IMembershipRepository>;

    const mockUser = new User(
        "user-1",
        "John Doe",
        "john@example.com",
        new Date("1990-01-01"),
        "strength"
    );

    const mockGym = new Gym(
        "gym-1",
        "Iron Paradise",
        "commercial",
        "123 Main St",
        10 // max capacity of 10
    );

    beforeEach(() => {
        // Create mock repositories
        mockUserRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        mockGymRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        mockMembershipRepository = {
            create: jest.fn(),
            findByUserAndGym: jest.fn(),
            deleteByUserAndGym: jest.fn(),
            findUsersByGym: jest.fn(),
            findGymsByUser: jest.fn(),
            countByGym: jest.fn(),
        };

        // Register mocks in container
        container.registerInstance(TOKENS.UserRepository, mockUserRepository);
        container.registerInstance(TOKENS.GymRepository, mockGymRepository);
        container.registerInstance(TOKENS.MembershipRepository, mockMembershipRepository);

        // Resolve use case with mocked dependencies
        addMembership = container.resolve(AddMembership);
    });

    afterEach(() => {
        container.clearInstances();
    });

    it("should add a user to a gym successfully", async () => {
        mockUserRepository.findById.mockResolvedValue(mockUser);
        mockGymRepository.findById.mockResolvedValue(mockGym);
        mockMembershipRepository.findByUserAndGym.mockResolvedValue(null);
        mockMembershipRepository.countByGym.mockResolvedValue(5); // 5 out of 10 capacity
        mockMembershipRepository.create.mockImplementation(async (m: Membership) => m);

        const result = await addMembership.execute({
            userId: "user-1",
            gymId: "gym-1"
        });

        expect(result).toBeInstanceOf(Membership);
        expect(result.userId).toBe("user-1");
        expect(result.gymId).toBe("gym-1");
        expect(mockMembershipRepository.create).toHaveBeenCalled();
    });

    it("should throw error if user not found", async () => {
        mockUserRepository.findById.mockResolvedValue(null);

        await expect(addMembership.execute({
            userId: "non-existent",
            gymId: "gym-1"
        })).rejects.toThrow(AppError);

        await expect(addMembership.execute({
            userId: "non-existent",
            gymId: "gym-1"
        })).rejects.toThrow("User not found");
    });

    it("should throw error if gym not found", async () => {
        mockUserRepository.findById.mockResolvedValue(mockUser);
        mockGymRepository.findById.mockResolvedValue(null);

        await expect(addMembership.execute({
            userId: "user-1",
            gymId: "non-existent"
        })).rejects.toThrow(AppError);

        await expect(addMembership.execute({
            userId: "user-1",
            gymId: "non-existent"
        })).rejects.toThrow("Gym not found");
    });

    it("should throw error if user is already a member", async () => {
        const existingMembership = new Membership(
            "membership-1",
            "user-1",
            "gym-1",
            new Date()
        );

        mockUserRepository.findById.mockResolvedValue(mockUser);
        mockGymRepository.findById.mockResolvedValue(mockGym);
        mockMembershipRepository.findByUserAndGym.mockResolvedValue(existingMembership);

        await expect(addMembership.execute({
            userId: "user-1",
            gymId: "gym-1"
        })).rejects.toThrow(AppError);

        await expect(addMembership.execute({
            userId: "user-1",
            gymId: "gym-1"
        })).rejects.toThrow("User is already a member of this gym");
    });

    it("should throw error if gym is at full capacity", async () => {
        mockUserRepository.findById.mockResolvedValue(mockUser);
        mockGymRepository.findById.mockResolvedValue(mockGym);
        mockMembershipRepository.findByUserAndGym.mockResolvedValue(null);
        mockMembershipRepository.countByGym.mockResolvedValue(10); // Full capacity

        await expect(addMembership.execute({
            userId: "user-1",
            gymId: "gym-1"
        })).rejects.toThrow(AppError);

        await expect(addMembership.execute({
            userId: "user-1",
            gymId: "gym-1"
        })).rejects.toThrow("Gym is at full capacity");
    });

    it("should allow membership if gym has no capacity limit", async () => {
        const unlimitedGym = new Gym(
            "gym-2",
            "Open Gym",
            "commercial",
            "456 Oak Ave",
            null // No capacity limit
        );

        mockUserRepository.findById.mockResolvedValue(mockUser);
        mockGymRepository.findById.mockResolvedValue(unlimitedGym);
        mockMembershipRepository.findByUserAndGym.mockResolvedValue(null);
        mockMembershipRepository.create.mockImplementation(async (m: Membership) => m);

        const result = await addMembership.execute({
            userId: "user-1",
            gymId: "gym-2"
        });

        expect(result).toBeInstanceOf(Membership);
        expect(mockMembershipRepository.countByGym).not.toHaveBeenCalled();
    });
});
