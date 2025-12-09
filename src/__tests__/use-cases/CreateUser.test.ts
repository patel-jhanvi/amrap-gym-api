import "reflect-metadata";
import { container } from "tsyringe";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { AppError } from "../../application/errors/AppError";
import { TOKENS } from "../../infrastructure/di/tokens";

describe("CreateUser Use Case", () => {
    let createUser: CreateUser;
    let mockUserRepository: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        // Create mock repository
        mockUserRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        // Register mock in container
        container.registerInstance(TOKENS.UserRepository, mockUserRepository);

        // Resolve use case with mocked dependency
        createUser = container.resolve(CreateUser);
    });

    afterEach(() => {
        container.clearInstances();
    });

    it("should create a user successfully", async () => {
        const userData = {
            name: "John Doe",
            email: "john@example.com",
            dateOfBirth: new Date("1990-01-01"),
            fitnessGoal: "strength"
        };

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.create.mockImplementation(async (user: User) => user);

        const result = await createUser.execute(userData);

        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe(userData.name);
        expect(result.email).toBe(userData.email);
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
        expect(mockUserRepository.create).toHaveBeenCalled();
    });

    it("should throw error if email already exists", async () => {
        const existingUser = new User(
            "existing-id",
            "Existing User",
            "john@example.com",
            new Date("1990-01-01"),
            "hypertrophy"
        );

        mockUserRepository.findByEmail.mockResolvedValue(existingUser);

        const userData = {
            name: "John Doe",
            email: "john@example.com",
            dateOfBirth: new Date("1990-01-01"),
            fitnessGoal: "strength"
        };

        await expect(createUser.execute(userData)).rejects.toThrow(AppError);
        await expect(createUser.execute(userData)).rejects.toThrow("Email already in use");
        expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
});
