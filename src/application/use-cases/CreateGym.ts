import { IGymRepository } from "@domain/repositories/IGymRepository";
import { CreateGymDTO } from "@application/dtos/CreateGymDTO";
import { Gym } from "@domain/entities/Gym";
import { AppError } from "@application/errors/AppError";
import { randomUUID } from "crypto";

export class CreateGym {
    constructor(private gymRepository: IGymRepository) { }

    async execute(data: CreateGymDTO): Promise<Gym> {
        // Check if a gym with the same name already exists 
        const existing = await this.gymRepository.findByName(data.name);
        if (existing) {
            throw new AppError("Gym name already exists", 400);
        }

        // Build domain entity (no DB logic here)
        const gym = new Gym(
            randomUUID(),
            data.name,
            data.type,
            data.location ?? null,
            data.maxCapacity ?? null
        );


        return this.gymRepository.create(gym);
    }
}
