import { injectable, inject } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { TOKENS } from "../../../infrastructure/di/tokens";

import { CreateGym } from "../../../application/use-cases/CreateGym";
import { ListGymUsers } from "../../../application/use-cases/ListGymUsers";
import { ListAvailableGyms } from "../../../application/use-cases/ListAvailableGyms";

import { IGymRepository } from "../../../domain/repositories/IGymRepository";

@injectable()
export class GymController {
    constructor(
        @inject(TOKENS.CreateGym) private createGymUseCase: CreateGym,
        @inject(TOKENS.ListGymUsers) private listGymUsersUseCase: ListGymUsers,
        @inject(TOKENS.ListAvailableGyms) private listAvailableGymsUseCase: ListAvailableGyms,
        @inject(TOKENS.GymRepository) private gymRepo: IGymRepository
    ) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, type, location, maxCapacity } = req.body;

            const gym = await this.createGymUseCase.execute({
                name,
                type,
                location,
                maxCapacity: maxCapacity ? Number(maxCapacity) : null
            });

            return res.status(201).json(gym);
        } catch (err: any) {
            next(err);
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const gyms = await this.gymRepo.findAll();
            return res.json(gyms);
        } catch (err: any) {
            next(err);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const gym = await this.gymRepo.findById(req.params.id);

            if (!gym) {
                return res.status(404).json({ error: "Gym not found" });
            }

            return res.json(gym);
        } catch (err: any) {
            next(err);
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.listGymUsersUseCase.execute(req.params.id);
            return res.json(users);
        } catch (err: any) {
            next(err);
        }
    }

    async listAvailable(req: Request, res: Response, next: NextFunction) {
        try {
            const gyms = await this.listAvailableGymsUseCase.execute();
            return res.json(gyms);
        } catch (err: any) {
            next(err);
        }
    }
}
