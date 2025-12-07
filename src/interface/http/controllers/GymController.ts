import { Request, Response } from "express";

import { PrismaGymRepository } from "../../../infrastructure/database/PrismaGymRepository";
import { PrismaMembershipRepository } from "../../../infrastructure/database/PrismaMembershipRepository";
import { PrismaUserRepository } from "../../../infrastructure/database/PrismaUserRepository";

import { AppError } from "../../../application/errors/AppError";

import { ListGymUsers } from "../../../application/use-cases/ListGymUsers";
import { ListAvailableGyms } from "../../../application/use-cases/ListAvailableGyms";
import { CreateGym } from "../../../application/use-cases/CreateGym";




const gymRepo = new PrismaGymRepository();
const membershipRepo = new PrismaMembershipRepository();
const userRepo = new PrismaUserRepository();


export class GymController {

    async create(req: Request, res: Response) {
        try {
            const { name, type, location, maxCapacity } = req.body;

            const useCase = new CreateGym(gymRepo);

            const gym = await useCase.execute({
                name,
                type,
                location,
                maxCapacity: maxCapacity ? Number(maxCapacity) : null
            });

            return res.status(201).json(gym);

        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async list(req: Request, res: Response) {
        try {
            const gyms = await gymRepo.findAll();
            return res.json(gyms);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }


    async get(req: Request, res: Response) {
        try {
            const gym = await gymRepo.findById(req.params.id);

            if (!gym) {
                return res.status(404).json({ error: "Gym not found" });
            }

            return res.json(gym);

        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }


    async listUsers(req: Request, res: Response) {
        try {
            const useCase = new ListGymUsers(membershipRepo, userRepo);
            const users = await useCase.execute(req.params.id);

            return res.json(users);

        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async listAvailable(req: Request, res: Response) {
        try {
            const useCase = new ListAvailableGyms(gymRepo, membershipRepo);
            const gyms = await useCase.execute();

            return res.json(gyms);

        } catch (err: any) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}
